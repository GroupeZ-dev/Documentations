---
title: bStats
---

# bStats

groupez.dev proxies [bStats](https://bstats.org) for the resources whose creator filled in a bStats id. Two endpoints are exposed:

- `GET /api/v1/bstats/url/{resource}` returns the address of the resource's bStats page.
- `GET /api/v1/bstats/{resource}/{chart}` returns the newest value of one bStats chart, for example `servers` or `players`.

Both answer **plain text, not JSON**. Plugins call them at server start-up and use the body as it is: they print the URL, and they parse the chart value as an integer. A JSON string would arrive wrapped in quotation marks.

<CalloutContainer type="warning">

<CalloutTitle>`{resource}` is a groupez.dev resource id, not a bStats id</CalloutTitle>

<CalloutDescription>
On v2, the path parameter is the **groupez.dev resource id** (the number in `https://groupez.dev/resources/...`). The platform looks up the resource's `bstats_id` itself. On the legacy platform, the legacy site's own pages called these URIs with the **bStats plugin id** directly (see [v1 bStats](../v1/bstats.md)). A caller that still sends a bStats id gets the resource that happens to have that number, or a `404`.

The v2 resource page itself calls both endpoints with the resource id (`resources/js/components/marketplace/resource-bstats.tsx`), and the tests are written against resource ids, so the new meaning is deliberate. Whether any external client relied on the old meaning is not known.
</CalloutDescription>

</CalloutContainer>

## Common behaviour

These rules come from the `/api/v1` route group and apply to both endpoints:

- **Base URL**: `https://groupez.dev/api/v1/`
- **No session, no CSRF, no cookies**: the routes use the `api` middleware group, not `web`.
- **No authentication.** The `api` group has no session, so every caller is a guest.
- **Version header**: every answer carries `X-GroupeZ-Api-Version: 1`, including `404` and `429` answers, which get the header from the exception handler in `bootstrap/app.php`.
- **Errors are JSON, successes are plain text.** A successful answer is `text/plain; charset=UTF-8`. Errors on `api/*` (`404`, `429`) are always rendered as JSON, whatever the `Accept` header says.
- **Rate limit**: `throttle:api`, 120 requests per minute, keyed on the IP for guests.

### Resource visibility

`{resource}` goes through the global `Route::bind('resource', ...)` declared in `app/Providers/AppServiceProvider.php`. For a guest, only resources whose status is `Published` or `Unlisted` resolve. Drafts, resources under review, soft-deleted resources and ids that never existed all answer the same `404`. The route group has no numeric pattern on `{resource}`. The global `Route::pattern('resource', '[0-9]+')` of `routes/web.php` does not reach the API routes. A non-numeric value is therefore matched by the route and handed to the binder, which looks it up with `whereKey()`. A value with no leading digit, such as `abc`, matches no resource and answers `404`.

<CalloutContainer type="info">

<CalloutTitle>Partially numeric ids</CalloutTitle>

<CalloutDescription>
The production database is MySQL, which compares a string such as `42abc` with an integer column by converting it to a number (`42`). Such a value would probably resolve resource `42` rather than answer `404`. No test covers this case, so treat it as unspecified and always send a plain integer.
</CalloutDescription>

</CalloutContainer>

### Where the bStats id comes from

The bStats id is the `bstats_id` column of the resource's `resource_details` row. Creators fill it in on the resource form, where it is validated as `nullable`, a numeric string of at most 20 characters (`regex:/^[0-9]+$/`). Resources imported from the legacy platform keep the value they had there.

### Upstream configuration

Everything about bStats is read from `config/groupez.php`, key `groupez.bstats`:

| Key | Value | Used for |
| --- | --- | --- |
| `api_url` | `https://bstats.org/api/v1/plugins` | bStats REST API |
| `page_url` | `https://bstats.org/plugin` | Base of the page URL returned by `bstats.url` |
| `timeout_seconds` | `5` | Timeout of every outgoing call to bStats |
| `url_cache_seconds` | `21600` (6 hours) | Cache lifetime of a resolved page URL |
| `stats_cache_seconds` | `900` (15 minutes) | Cache lifetime of a chart value |
| `software` | `1 => bukkit`, `2 => bungeecord`, `3 => sponge`, `4 => server-implementation`, `5 => other`, `6 => velocity` | bStats software id to URL segment |

---

### GET /api/v1/bstats/url/\{resource\}

Returns the address of the resource's bStats page as a bare URL in plain text.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.bstats.url` | None | `throttle:api` (120/min per IP) |

#### Path parameters

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `resource` | integer | yes | groupez.dev resource id. Must be a `Published` or `Unlisted` resource. |

#### Query / body parameters

None.

#### How the URL is built

1. The controller reads `bstats_id` from the resource's details. If it is `null` or empty, the answer is `404` and bStats is not called.
2. It calls `GET https://bstats.org/api/v1/plugins/{bstats_id}` (5-second timeout, `Accept: application/json`).
3. From the bStats plugin object, it takes `name` and `software`. The URL segment is `groupez.bstats.software[software.id]`. When the software id is not in that map, the controller falls back to the `software.url` value returned by bStats.
4. It answers `https://bstats.org/plugin/{segment}/{rawurlencode(name)}/{bstats_id}`.

If bStats answers a non-2xx status, times out, returns a body that is not a JSON object, or returns an object with no usable `name` or software segment, the answer is `404`.

#### Responses

**200 OK**: the bStats page URL, nothing else. `Content-Type: text/plain; charset=UTF-8`.

```text
https://bstats.org/plugin/bukkit/MyPlugin/1234
```

A plugin name with a space is encoded:

```text
https://bstats.org/plugin/bukkit/My%20Plugin/1234
```

**404 Not Found**: the resource does not exist or is not visible, the resource has no `bstats_id`, or bStats could not provide a page. All cases have the same body.

```json
{
    "message": "Not found."
}
```

**429 Too Many Requests**: the `api` limiter was exceeded.

```json
{
    "message": "Too many requests."
}
```

The response keeps the throttle headers `Retry-After`, `X-RateLimit-Limit`, `X-RateLimit-Remaining` and `X-RateLimit-Reset` when the throttle set them.

This endpoint never returns `401`, `403` or `422`.

#### Example

```bash
curl "https://groupez.dev/api/v1/bstats/url/42"
```

```text
https://bstats.org/plugin/bukkit/MyPlugin/1234
```

#### Notes

- **Caching.** A resolved URL is cached for 6 hours under `bstats:url:{bstats_id}`. The key is the bStats id, not the resource id, so two resources that share a bStats id share the entry. A failed resolution is **not** cached, so a bStats outage does not freeze a `404` for 6 hours: the next call asks bStats again.
- **No neutral value.** Unlike the chart endpoint, this one has no fallback value. An empty body would be printed as a link, so a missing page is a `404`.
- **Name encoding.** v2 URL-encodes the plugin name (`rawurlencode`). The legacy platform inserted it raw, which built a broken link for names with a space.
- **Unknown software.** v1 failed with a `500` on a software id missing from its map. v2 falls back to the `software.url` value from bStats.

---

### GET /api/v1/bstats/\{resource\}/\{chart\}

Returns the newest value of one bStats chart of the resource, as a bare integer in plain text. **This endpoint always answers `200` with an integer** once the resource resolves. Every upstream problem is a `0`.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.bstats.stats` | None | `throttle:api` (120/min per IP) |

#### Path parameters

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `resource` | integer | yes | groupez.dev resource id. Must be a `Published` or `Unlisted` resource. |
| `chart` | string | yes | bStats chart id, for example `servers` or `players`. Free text: any single path segment matches. A value containing `/` does not match the route. The value is URL-encoded before it is sent to bStats, so it cannot add path segments on the bStats host. |

#### Query / body parameters

None.

#### How the value is read

1. The controller reads `bstats_id` from the resource's details. If it is `null` or empty, the answer is `0` and bStats is not called.
2. If the cache holds an integer under `bstats:chart:{bstats_id}:{rawurlencode(chart)}`, it is returned.
3. Otherwise the controller calls `GET https://bstats.org/api/v1/plugins/{bstats_id}/charts/{chart}/data/?maxElements=1` (5-second timeout). bStats answers `[[timestamp, value]]`. The controller takes `[0][1]`.
4. If that value is numeric, it is cast to `int` (a decimal is truncated), cached for 15 minutes and returned. Anything else gives `0`, which is not cached.

#### Responses

**200 OK**: the newest chart value. `Content-Type: text/plain; charset=UTF-8`.

```text
4213
```

**200 OK** with body `0`: returned in all of these cases:

- the resource has no `bstats_id` (no call is made to bStats);
- bStats does not know the id or the chart (`404` upstream);
- bStats is down (`5xx` upstream) or the request times out;
- the body is not the expected shape (an object, an empty array, a point with a `null` value).

```text
0
```

**404 Not Found**: only when the **resource** does not exist or is not visible. This is decided by route-model binding, before the controller runs, and no call is made to bStats.

```json
{
    "message": "Not found."
}
```

**429 Too Many Requests**: the `api` limiter was exceeded.

```json
{
    "message": "Too many requests."
}
```

This endpoint never returns `401`, `403`, `422` or `5xx` because of bStats.

#### Example

```bash
curl "https://groupez.dev/api/v1/bstats/42/servers"
```

```text
4213
```

```bash
curl "https://groupez.dev/api/v1/bstats/42/players"
```

#### Notes

- **Caching.** Only values bStats actually returned are cached (15 minutes). A real `0`, for a plugin nobody runs, is cached like any other value. A `0` caused by an outage is not: the next call asks bStats again, so an outage costs one poll instead of 15 minutes of zeros.
- **Ambiguous zero.** A `0` can mean "no servers" or "bStats could not be read". The body does not tell them apart.
- **Negative or decimal values.** Any numeric value is accepted and cast with `(int)`: `12.7` becomes `12`, and a negative value is returned as is. The tests only cover non-negative integers.

---

## Route declaration order

Both routes are three segments long under `bstats/`, so the order of declaration in `routes/api.php` decides which controller answers:

```php
Route::get('url/{resource}', ShowUrlController::class)->name('url');
Route::get('{resource}/{chart}', ShowStatsController::class)->name('stats');
```

- `GET /api/v1/bstats/url/42` reaches `api.v1.bstats.url`. The literal `url` in the middle segment is never read as a resource id.
- `GET /api/v1/bstats/42/url` reaches `api.v1.bstats.stats` and reads the chart named `url`.
- `GET /api/v1/bstats/url/servers` reaches `api.v1.bstats.url` with `{resource} = servers`, which answers `404`. There is no way to read the chart of a resource called `url`, but resource ids are numeric anyway.

## Differences from v1

| | v1 (legacy) | v2 (current) |
| --- | --- | --- |
| Path parameter | bStats plugin id | groupez.dev resource id (bStats id read from the resource) |
| Route names | `api.v1.bstatsurl`, `api.v1.bstatsstats` | `api.v1.bstats.url`, `api.v1.bstats.stats` |
| `Content-Type` | `text/html; charset=UTF-8` | `text/plain; charset=UTF-8` |
| Upstream failure on `url` | `500` | `404` |
| Upstream failure on chart | `500` on an upstream HTTP error, `0` on an unexpected body | always `0` |
| Caching | none | 6 hours (URL), 15 minutes (chart), successes only |
| Timeout | none (Guzzle default) | 5 seconds |
| Rate limit | 60/min | 120/min |
| Version header | none | `X-GroupeZ-Api-Version: 1` |

<CalloutContainer type="info">

<CalloutTitle>Source files</CalloutTitle>

<CalloutDescription>
`routes/api.php`, `app/Http/Controllers/Api/V1/BStats/ShowUrlController.php`, `app/Http/Controllers/Api/V1/BStats/ShowStatsController.php`, `app/Providers/AppServiceProvider.php` (binding), `app/Providers/RateLimitServiceProvider.php`, `config/groupez.php` (`bstats`), `bootstrap/app.php`. Behaviour is pinned by `tests/Feature/Api/V1/BStatsTest.php`, `BStatsEndpointsTest.php`, `ApiRoutingTest.php`, `ApiRoutingOrderTest.php` and `ApiVersionHeaderTest.php`.
</CalloutDescription>

</CalloutContainer>
