---
title: Licence
---

# Licence

The licence endpoint is what premium GroupeZ plugins call at start-up to ask whether they are allowed to run.

On the current platform (v2), IP-bound licences no longer exist. There is no licence table, no licence model and no licence management screen. The route is kept only because plugins already installed on servers call it when they start and refuse to boot without a positive answer.

<CalloutContainer type="info">

<CalloutTitle>Always valid</CalloutTitle>

<CalloutDescription>
On v2 this endpoint **always** answers `200` with `{"status":"success","message":"The license is valid"}`, whatever key you send: unknown, issued by the legacy platform, expired on the legacy platform, or nonsense. The controller reads nothing from the request (only the rate limiters look at the key and the caller's IP). It runs no database query, writes no log and uses no cache.
</CalloutDescription>

</CalloutContainer>

For the legacy behaviour, with key lookup, `unique_id` check and IP allow-list, see the [v1 licence page](../v1/licence.md).

## Common behaviour

These rules come from the `/api/v1` route group and apply to this endpoint:

- **Base URL**: `https://groupez.dev/api/v1/`
- **No session, no CSRF, no cookies**: the route uses the `api` middleware group, not `web`. A `X-CSRF-TOKEN` / `X-XSRF-TOKEN` header or a session cookie is ignored, and no `Set-Cookie` is ever returned.
- **Version header**: every answer carries `X-GroupeZ-Api-Version: 1`. This includes `404`, `405` and `429` answers, which get the header from the exception handler in `bootstrap/app.php`.
- **JSON errors**: errors on `api/*` are always rendered as JSON. The `Accept` header does not change this.

---

### POST /api/v1/licence/\{key\}

Checks a licence key. On v2 the answer is a constant.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.licence.check` | None | `throttle:api` (120/min per IP) **and** `throttle:licence` (60/min per key, 240/min per IP) |

#### Path parameters

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `key` | string | yes | The licence key. This is a free string with no route-model binding and no pattern constraint, so any single path segment matches, including spaces, accents and punctuation. URL-encode it. A key that contains `/` does not match the route, even encoded as `%2F`: the router URL-decodes the path before matching it. |

#### Query / body parameters

None are read. On v1 the plugin sent a `unique_id` body field. You can still send it, but v2 ignores it, along with any other body field and any query string.

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `unique_id` | string | no | Legacy field (for example `GROUPEZ_...`). Accepted but **ignored** on v2. |

#### Responses

**200 OK**: returned for every key.

```json
{
    "status": "success",
    "message": "The license is valid"
}
```

Headers include `Content-Type: application/json` and `X-GroupeZ-Api-Version: 1`.

<CalloutContainer type="info">

<CalloutTitle>Frozen strings</CalloutTitle>

<CalloutDescription>
Deployed plugins compare both strings literally, so they are frozen to the character. The route says `licence` (British spelling) and the message says `license` (American spelling). This mismatch comes from v1 and is kept on purpose.
</CalloutDescription>

</CalloutContainer>

**429 Too Many Requests**: one of the limiters was exceeded.

```json
{
    "message": "Too many requests."
}
```

The body is fixed by `bootstrap/app.php`. It replaces the framework's `Too Many Attempts.` and never includes a stack trace. The response keeps the throttle headers `Retry-After`, `X-RateLimit-Limit`, `X-RateLimit-Remaining` and `X-RateLimit-Reset` when the throttle set them. When the per-key window (60/min) is exhausted, `X-RateLimit-Limit` is `60`.

**404 Not Found**: the URI does not match the route, for example `POST /api/v1/licence` with no key, or a key that contains a `/`.

```json
{
    "message": "Not found."
}
```

**405 Method Not Allowed**: any method other than `POST`, for example `GET /api/v1/licence/ABC`. The body is the framework's default JSON for a `MethodNotAllowedHttpException`, built by the router from the request path:

```json
{
    "message": "The GET method is not supported for route api/v1/licence/ABC. Supported methods: POST."
}
```

Unlike `404` and `429`, the platform does not normalise this body, so do not depend on its exact text. With `APP_DEBUG` on, the framework would also add `exception`, `file`, `line` and `trace` keys. The `X-GroupeZ-Api-Version: 1` header is still set.

This endpoint never returns `401`, `403` or `422`. It has no authentication, no authorisation and no validation.

#### Example

```bash
curl -X POST "https://groupez.dev/api/v1/licence/aB3dE5fG7hI9jK1" \
  -H "Accept: application/json" \
  -d "unique_id=GROUPEZ_0123456789abcde"
```

```json
{"status":"success","message":"The license is valid"}
```

#### Notes

- **Rate limiting.** Two limiters apply in sequence: the group-wide `api` limiter (120/min, keyed on the IP since no user is authenticated) and the route's own `licence` limiter (60/min keyed on `{key}`, and 240/min keyed on the IP). In practice the `api` limiter caps a single IP at 120/min before the 240/min ceiling of `licence` is reached. Because one limit is keyed per key, a plugin retrying in a loop with one key cannot exhaust the endpoint for other keys behind other IPs. The limiters protect the web server, not a database.
- **Migrating plugins.** A plugin that treats `status == "success"` as "allowed" keeps booting on v2. A plugin that previously handled `status == "error"` answers will never see one from v2.
- Source files: `routes/api.php`, `app/Http/Controllers/Api/V1/CheckLicenceController.php`, `app/Providers/RateLimitServiceProvider.php`, `bootstrap/app.php`. Behaviour is pinned by `tests/Feature/Api/V1/LicenceCheckTest.php`, `ApiRateLimitTest.php`, `ApiRoutingTest.php`, `ApiRoutingOrderTest.php` and `ApiSessionlessTest.php`.
