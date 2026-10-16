---
sidebar_position: 2
title: Licence
---

# Licence

:::warning Legacy platform
This page documents the **legacy v1 platform** (Laravel 8). It is kept for reference and for plugins built against it. The current platform answers the same URI differently: see the [v2 licence page](../v2/licence.md).
:::

The licence endpoint is what premium GroupeZ plugins called at start-up to ask whether they were allowed to run. On v1 a licence was bound to three things:

- a **key**, generated with `Str::random(15)`, so 15 alphanumeric characters;
- a **plugin**, through `plugin_licences`. The plugin identifies itself with its `unique_id`, of the form `GROUPEZ_` followed by 15 lowercase hexadecimal characters;
- a list of **allowed IP addresses**, stored in the `ips` table. The seller or the customer added them by hand in the dashboard, up to `max_ip`.

The licence could also have an optional expiry date, `expire_at` (a `date` column).

## Common behaviour

- **Base URL**: `https://groupez.dev/api/v1/`
- **Middleware**: the `api` group, which is `throttle:api`, then `SubstituteBindings`, then `TrustCloudflare`. There is no session and no CSRF.
- **No version header**: v1 does not send `X-GroupeZ-Api-Version`.

---

### POST /api/v1/licence/\{key\}

Checks that a licence key exists, has not expired, belongs to the calling plugin, and is being used from an allowed IP address.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.licence` | None | `throttle:api`: 60/min, keyed on the user id or else the IP |

#### Path parameters

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `key` | string | yes | The licence key. It is resolved by implicit route-model binding on `licences.key` (`{licence:key}`). An unknown key returns `404` before the controller runs. |

#### Query / body parameters

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `unique_id` | string | yes | The plugin's `unique_id` (`plugins.unique_id`, for example `GROUPEZ_...`). It is read with `$request->has()` / `$request['unique_id']`, so it can be sent as a form field, a JSON body field or a query-string parameter. |

#### Required header

| Header | Description |
| --- | --- |
| `CF-Connecting-IP` | The caller's IP address, compared with the licence's allowed IPs. Cloudflare adds this header in front of groupez.dev, so a plugin does not set it itself. If the header is missing, the lookup is done with a `null` address and fails. |

#### Responses

:::warning Errors are `200`
Every outcome the controller produces, success or failure, is returned with HTTP status **200**. The controller returns a `json_encode()` string instead of a JSON response, so the `Content-Type` is Laravel's default for a string response (`text/html; charset=UTF-8`), not `application/json`. Clients must parse the body and check `status`.
:::

The checks run in the order below. The first one that fails decides the answer.

**1. Licence expired** (`expire_at` is set and in the past):

```json
{"status":"error","message":"The license has expired"}
```

**2. `unique_id` missing**:

```json
{"status":"error","message":"Unable to find unique id"}
```

**3. The key does not belong to the plugin with this `unique_id`**:

```json
{"status":"error","message":"Unable to find plugin for this licence"}
```

**4. The caller's IP is not on the licence's allowed list** (no `ips` row with `adresse` = `CF-Connecting-IP` for this licence):

```json
{"status":"error","message":"Impossible to find the ip address"}
```

**5. Success**:

```json
{"status":"success","message":"The license is valid"}
```

**404 Not Found**: no licence has this key. The binding fails before the controller runs. The body depends on the `Accept` header:

- with `Accept: application/json`, Laravel 8's default JSON, which names the model and the key (shown with `APP_DEBUG` off; the production setting is not in the repository, and with debug on `exception`, `file`, `line` and `trace` keys are added):

  ```json
  {"message":"No query results for model [App\\Models\\Licence] UNKNOWNKEY"}
  ```

- otherwise, the site's HTML 404 page (`resources/views/errors/404.blade.php`).

**429 Too Many Requests**: more than 60 requests per minute. Laravel 8's default `ThrottleRequestsException`, with `Retry-After` and `X-RateLimit-*` headers. With `Accept: application/json` the body is `{"message":"Too Many Attempts."}`. Otherwise it is an HTML error page.

**405 Method Not Allowed**: methods other than `POST`. Without `Accept: application/json` the answer is the HTML page `errors/405`. With it, Laravel 8.26's default JSON (with `APP_DEBUG` off):

```json
{"message":"The GET method is not supported for this route. Supported methods: POST."}
```


This endpoint never returns `401`, `403` or `422`. Validation failures are reported as `200` with `"status":"error"` (see above).

#### Example

```bash
curl -X POST "https://groupez.dev/api/v1/licence/aB3dE5fG7hI9jK1" \
  -d "unique_id=GROUPEZ_0123456789abcde"
```

```json
{"status":"success","message":"The license is valid"}
```

#### Notes

- **The expiry check ignores the IP.** The code reads `if (expired) if (!isset($ip)) return error`, but `$ip` is not yet defined at that point. The inner condition is therefore always true, and an expired licence is always refused, before anything else is checked.
- **Expiry granularity.** `expire_at` is a `date` column. `Carbon::parse()` turns it into midnight of that day in the app timezone (`Europe/Paris`), so a licence stops working at 00:00 on its expiry date, not at the end of that day.
- **Side effects on success.** Each successful check inserts a `licence_logs` row (`licence_id`, `ip`). Each request that gets past the `unique_id`/plugin checks also writes a warning line to the `licence` log channel (`storage/logs/licence.log`), whether or not the IP is then allowed.
- **IP registration is not part of the API.** Allowed IPs were added in the dashboard (`Resource\LicenceController::createAdresse` / `createAdresseAsAdmin`, limited to `max_ip` for the non-admin path). No API endpoint registers an IP. Both dashboard paths validate the address with `ip2long()`, so only IPv4 addresses could be registered: a server whose `CF-Connecting-IP` is an IPv6 address could never pass check 4.
- **Empty `unique_id`.** The global `ConvertEmptyStringsToNull` middleware turns `unique_id=` into `null`. The field is still "present" for `$request->has()`, so the answer is `Unable to find plugin for this licence`, not `Unable to find unique id`.
- **Rate-limit key.** `throttle:api` runs before `TrustCloudflare` in the `api` group, and the global `TrustProxies` trusts no proxy. Behind Cloudflare, the IP used as the throttle key is therefore probably the Cloudflare edge address, not the real client. This was inferred from the middleware order and not verified on production.
- **Header spoofing.** The allowed-IP check trusts the `CF-Connecting-IP` header as received. This is only safe if the origin server could not be reached directly, bypassing Cloudflare. Whether the legacy origin was firewalled cannot be determined from the code.
- Source files (legacy repository): `routes/api.php`, `app/Http/Controllers/Api/LicenceController.php`, `app/Models/Licence.php`, `app/Models/Ip.php`, `app/Models/LicenceLog.php`, `app/Http/Kernel.php`, `app/Http/Middleware/TrustCloudflare.php`, `app/Providers/RouteServiceProvider.php`. The legacy repository has no automated test for this endpoint.
