---
sidebar_position: 7
title: bStats
---

# bStats

:::warning Legacy platform
This page documents the **legacy v1 platform** of groupez.dev (Laravel 8). It is kept for reference and for plugins built against it. The current platform keeps the same URIs but **changes the meaning of the path parameter**. See [bStats (v2)](../v2/bstats.md).
:::

The legacy platform proxied [bStats](https://bstats.org) through two endpoints:

- `GET /api/v1/bstats/url/{id}` returns the address of a plugin's bStats page.
- `GET /api/v1/bstats/{id}/{chart}` returns the newest value of one bStats chart.

On v1, `{id}` is the **bStats plugin id** itself, not a groupez.dev resource id. The controller never touches the database: it forwards the id to bStats. The legacy resource page called these URIs with `$resource->details->bstats_id` to show the `servers` and `players` counters and the "Show more on bStats" link.

Both endpoints answer the raw value in the body, not JSON.

## Common behaviour

- **Base URL**: `https://groupez.dev/api/v1/`
- **Middleware**: the `api` group of `app/Http/Kernel.php` (`throttle:api`, `SubstituteBindings`, `TrustCloudflare`). No session, no CSRF.
- **No authentication.**
- **Rate limit**: `throttle:api`, 60 requests per minute, keyed on the user id when one is authenticated, otherwise on the IP (`app/Providers/RouteServiceProvider.php`). In practice it is always the IP, since these routes have no auth guard.
- **No version header.**
- **Content type**: the controllers return a PHP `string` or `int`. Laravel wraps it in a response with its default `Content-Type: text/html; charset=UTF-8`.
- **Errors**: v1 has no custom exception rendering (`app/Exceptions/Handler.php` is the default). Errors are JSON only when the request expects JSON (`Accept: application/json`). Otherwise Laravel renders its HTML error page.
- **No caching and no timeout.** Every call makes a live request to bStats with Guzzle's default options (no timeout).

---

### GET /api/v1/bstats/url/\{id\}

Returns the address of the bStats page of a plugin.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.bstatsurl` | None | `throttle:api` (60/min per IP) |

:::note Route name
The group is declared with `->name('bstats')` (no trailing dot) and the route with `->name('url')`, so the full name is `api.v1.bstatsurl`, not `api.v1.bstats.url`.
:::

#### Path parameters

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | yes | bStats plugin id. Not validated and not bound to a model. It is inserted as is into the bStats URL. |

#### Query / body parameters

None.

#### How the URL is built

1. `BStatsController::getUrl()` calls `GET https://bstats.org/api/v1/plugins/{id}` with `Accept: application/json`.
2. It decodes the body and reads `software.id`, `name` and `id`.
3. It looks up the software segment in `config/software.php`: `1 => bukkit`, `2 => bungeecord`, `3 => sponge`, `4 => server-implementation`, `5 => other`, `6 => velocity`.
4. It returns `https://bstats.org/plugin/{software}/{name}/{id}`, where `id` is the one returned by bStats.

#### Responses

**200 OK**: the bStats page URL as the body. `Content-Type: text/html; charset=UTF-8`.

```text
https://bstats.org/plugin/bukkit/MyPlugin/1234
```

**500 Internal Server Error**: in all of these cases:

- bStats answers a `4xx` or `5xx`, for example for an unknown id. Guzzle throws on HTTP errors by default and nothing catches it.
- bStats cannot be reached.
- `software.id` is not in `config/software.php`, or the body does not have the expected keys. PHP raises a warning on the array access, which Laravel turns into an `ErrorException`.

With `Accept: application/json` and `APP_DEBUG=false`:

```json
{
    "message": "Server Error"
}
```

Without that header, the body is Laravel's HTML error page.

**404 Not Found**: only when the URI does not match a route, for example `GET /api/v1/bstats/url` with no id. With `Accept: application/json`, Laravel 8 renders the exception message, which is empty for a route miss:

```json
{
    "message": ""
}
```

**429 Too Many Requests**: the `api` limiter was exceeded. With `Accept: application/json`:

```json
{
    "message": "Too Many Attempts."
}
```

The response carries `Retry-After`, `X-RateLimit-Reset`, `X-RateLimit-Limit` and `X-RateLimit-Remaining`.

#### Example

```bash
curl "https://groupez.dev/api/v1/bstats/url/1234"
```

```text
https://bstats.org/plugin/bukkit/MyPlugin/1234
```

#### Notes

- **Name not encoded.** The plugin name is inserted raw. A name with a space gives a URL with a literal space, which is a broken link. v2 encodes it.
- **No fallback.** Any upstream problem is a `500`. v2 answers `404` instead.

---

### GET /api/v1/bstats/\{id\}/\{chart\}

Returns the newest value of one bStats chart.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.bstatsstats` | None | `throttle:api` (60/min per IP) |

#### Path parameters

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | string | yes | bStats plugin id. Not validated. |
| `chart` | string | yes | bStats chart id, for example `servers` or `players`. Not validated and **not encoded**: it is inserted raw into the bStats URL. |

#### Query / body parameters

None.

#### How the value is read

1. `BStatsController::getStats()` calls `GET https://bstats.org/api/v1/plugins/{id}/charts/{chart}/data/?maxElements=1` with `Accept: application/json`.
2. bStats answers `[[timestamp, value]]`. The controller returns `$json[0][1]`.
3. The method is declared `: int`, and the file has no `strict_types`, so an integer or an integer-like string is coerced to an integer.

:::note Decimal values
What happened to a decimal value such as `12.7` depends on the PHP version the legacy site ran on (its `composer.json` only requires `^8.0`). On PHP 8.1 and later, the implicit float-to-int conversion raises a deprecation, which Laravel 8 turns into an `ErrorException` when deprecations are reported. This was never observed. bStats chart values are normally integers.
:::

#### Responses

**200 OK**: the newest value. `Content-Type: text/html; charset=UTF-8`.

```text
4213
```

**200 OK** with body `0`: bStats answered `2xx` but the body has no `[0][1]` entry, for example an empty array, an object, or a body that is not JSON (decoded as `null`). The missing-offset warning becomes an `ErrorException`, which the `try` / `catch (\Exception)` around the access turns into `0`.

```text
0
```

**500 Internal Server Error**: in these cases:

- bStats answers a `4xx` or `5xx` (unknown plugin id, unknown chart, outage). The Guzzle exception is thrown **before** the `try` block, so it is not caught.
- bStats cannot be reached.
- `[0][1]` exists but cannot be converted to `int`, for example `null`. The return-type `TypeError` is an `Error`, not an `Exception`, so the `catch` does not handle it.

With `Accept: application/json` and `APP_DEBUG=false`:

```json
{
    "message": "Server Error"
}
```

**429 Too Many Requests**: same as the URL endpoint.

#### Example

```bash
curl "https://groupez.dev/api/v1/bstats/1234/servers"
```

```text
4213
```

#### Notes

- **Not "never an error".** The `try` / `catch` only covers an unexpected body shape. An unknown chart or a bStats outage produced a `500`, not a `0`. v2 answers `0` in every upstream case.
- **No caching.** Every call hit bStats.

---

## Route declaration order

Both routes are three segments long under `bstats/`, and they are declared in this order in `routes/api.php`:

```php
Route::prefix('/bstats')->name('bstats')->group(function () {
    Route::get('/url/{id}', [BStatsController::class, 'getUrl'])->name('url');
    Route::get('/{id}/{chart}', [BStatsController::class, 'getStats'])->name('stats');
});
```

- `GET /api/v1/bstats/url/1234` reaches `getUrl` with `id = 1234`.
- `GET /api/v1/bstats/1234/url` reaches `getStats` and asks bStats for a chart named `url`.
- A bStats plugin id equal to the literal `url` could not be used with the chart endpoint. bStats ids are numeric, so this is theoretical.

:::info Moving to v2
On the current platform the same URIs take a **groupez.dev resource id**, answer `text/plain`, return `404` (URL) or `0` (chart) instead of `500` on upstream failures, and are cached. See [bStats (v2)](../v2/bstats.md).
:::

:::note Source files
`routes/api.php`, `app/Http/Controllers/Api/BStatsController.php`, `config/software.php`, `app/Providers/RouteServiceProvider.php`, `app/Http/Kernel.php` in the legacy codebase. The legacy codebase has no tests for these endpoints, so the behaviour above is read from the code.
:::
