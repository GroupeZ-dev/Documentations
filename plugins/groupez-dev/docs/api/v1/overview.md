---
title: Overview (v1, legacy)
---

# Public API: overview (v1, legacy)

<CalloutContainer type="warning">

<CalloutTitle>Legacy platform</CalloutTitle>

<CalloutDescription>
This section documents the API of the **legacy v1 platform** of groupez.dev (Laravel 8). It no longer runs in production. It is kept as a reference for plugins and bots built against it, and for comparison with the current platform.

The current platform serves the **same URIs** (`/api/v1/...`) with some behavioural changes. See [API v2 overview](../v2/overview.md), and in particular its "Changes from v1" section.
</CalloutDescription>

</CalloutContainer>

## Base URL

```
https://groupez.dev/api/v1
```

`RouteServiceProvider` loads `routes/api.php` with the `api` prefix, the `api` middleware group and the name prefix `api.`. Inside the file, every public route is wrapped in `Route::prefix('/v1')->name('v1.')`.

One route sits outside the `/v1` group: `GET /api/user` (see [Authentication](#authentication)).

## Versioning

There is no versioning mechanism beyond the `/v1` path segment. The API sends no version header.

## Authentication

The `/api/v1` routes have **no authentication middleware**. No token, no session and no CSRF are involved, because the `api` group does not include the `web` group.

Only two checks resemble authentication, and both are in controller code:

| Endpoint | Check |
|----------|-------|
| `POST /api/v1/discord/{user}/apply/{plugin}` | The body field `custom_password` is required (validated). It is compared with `!==` against `env('DISCORD_PURCHASE_CONFIRM')`, and a mismatch returns `403`. |
| `POST /api/v1/licence/{licence}` | The licence key in the URL, plus the `unique_id` body field and the caller's IP (`CF-Connecting-IP` header), are checked against the licence tables. See [Licence](./licence.md). |

<CalloutContainer type="info">

<CalloutTitle>`env()` outside config</CalloutTitle>

<CalloutDescription>
The Discord secret was read with `env()` from a controller. With a cached configuration (`php artisan config:cache`), `env()` returns `null` for keys that are not referenced from config files. The code did not guard against that case. Whether production ran with a cached config is unknown.
</CalloutDescription>

</CalloutContainer>

### `GET /api/user`

```php
Route::middleware('auth:api')->get('/user', fn (Request $request) => $request->user());
```

This is Laravel's default scaffold route. It is unnamed (no `->name()`), and it uses the `api` guard, which is configured with the `token` driver (`config/auth.php`). No migration creates an `api_token` column, so no token could ever match. The route is effectively unusable. Without a token it returns `401` (`{"message":"Unauthenticated."}` for JSON requests). With a token (`api_token` query or body field, or a bearer token), the guard queries the missing `api_token` column, which most likely ends in a `500`. That last case is deduced from the code and was not tested. The route is not listed with the public endpoints below.

<CalloutContainer type="info">

<CalloutTitle>Another URI under `/api`</CalloutTitle>

<CalloutDescription>
`routes/web.php` declares `GET /api/gift/valid/{id}/{plugin}` (name `gift.check`, `web` and `auth` middleware). It is a session-authenticated AJAX helper of the website's checkout, not part of the public API, so it is not documented in this section. The current platform answers `410 Gone` on that path.
</CalloutDescription>

</CalloutContainer>

## Rate limiting

There is a single limiter, declared in `RouteServiceProvider::configureRateLimiting()`:

| Limiter | Limit | Key | Applied to |
|---------|-------|-----|------------|
| `api` | 60 requests / minute | authenticated user id, else `$request->ip()` | every route loaded from `routes/api.php` (it is the first entry of the `api` middleware group) |

No route declares a limiter of its own.

<CalloutContainer type="info">

<CalloutTitle>Which IP?</CalloutTitle>

<CalloutDescription>
The `api` middleware group is `throttle:api`, `SubstituteBindings`, `TrustCloudflare`, in that order, so `ThrottleRequests` runs before the other two. `TrustCloudflare`, which copies `CF-Connecting-IP` into `X-Forwarded-For` and trusts Cloudflare's ranges, therefore probably runs **after** the throttle. The global `TrustProxies` middleware declares no proxy (`$proxies` is unset). If the site sat behind Cloudflare, the limiter key was probably the Cloudflare edge IP rather than the real client IP. This is deduced from the code and was not verified in production.
</CalloutDescription>

</CalloutContainer>

A refused request returns `429` with Laravel 8's default body: `{"message":"Too Many Attempts."}` when the request expects JSON, otherwise an HTML error page (there is no custom `429` view). The framework sets the `Retry-After`, `X-RateLimit-Limit` and `X-RateLimit-Remaining` headers.

## Middleware

| Layer | Middleware |
|-------|------------|
| Global | `TrustProxies` (no proxy configured), `Fruitcake\Cors\HandleCors`, `PreventRequestsDuringMaintenance`, `ValidatePostSize`, `TrimStrings`, `ConvertEmptyStringsToNull` |
| `api` group | `throttle:api`, `SubstituteBindings`, `App\Http\Middleware\TrustCloudflare` |
| Per route | none, except `auth:api` on `GET /api/user` |

`TrimStrings` and `ConvertEmptyStringsToNull` are global, so a body field sent as `"   "` reaches the controllers as `null`.

### Route parameters and binding

| Route | Parameter | Resolution | Unknown value |
|-------|-----------|------------|---------------|
| `gift/{id}` | `{id}` | `Gift::where('code', $id)->first()` in the controller | `404` (empty message) |
| `payment/{id}` | `{id}` | `Payment::where('stripe_id', $id)->firstOrFail()`, so the segment is the **provider's** identifier | `404` |
| `discord/{user:discord_id}` and `discord/{user:discord_id}/apply/{plugin}` | `{user}` | implicit binding of **`DiscordUser`** on `discord_users.discord_id` | `404` |
| `discord/{user:discord_id}/apply/{plugin}` | `{plugin}` | implicit binding of `Plugin` by id, **no visibility filter** | `404` |
| `resource/versions/{resource}`, `resource/{resource}` | `{resource}` | `Plugin::findOrFail($resource)`, **no visibility filter** (drafts resolve too) | `404` |
| `resource/version/{resource}` | `{resource}` | implicit binding of `Plugin` by id, no visibility filter | `404` |
| `author/{id}` | `{id}` | `User::findOrFail($id)` | `404` |
| `bstats/url/{id}`, `bstats/{id}/{chart}` | `{id}` | **passed straight to bStats** as the bStats plugin id. It is not a groupez.dev id. | see [bStats](./bstats.md) |
| `licence/{licence:key}` | `{licence}` | implicit binding of `Licence` on `licences.key` | `404` |

`POST /discord` (no segment) does **not** use `discord_users`. It reads the legacy `users.discord` column with the query builder. The Discord endpoints therefore resolved members from two different tables.

## CORS

`config/cors.php` (package `fruitcake/laravel-cors`), Laravel's default values:

| Setting | Value |
|---------|-------|
| `paths` | `api/*`, `sanctum/csrf-cookie` |
| `allowed_methods` | `*` |
| `allowed_origins` | `*` |
| `allowed_headers` | `*` |
| `exposed_headers` | none |
| `max_age` | `0` |
| `supports_credentials` | `false` |

## Error format

v1 has **no custom exception rendering**: `App\Exceptions\Handler` only declares the default `dontFlash` list. Laravel 8's defaults therefore apply:

- **JSON errors only when the request expects JSON** (`Accept: application/json`, or an AJAX request). Any other request gets the HTML error views in `resources/views/errors` (`403`, `404`, `405`, `500`, `503`).
- With `APP_DEBUG` off, a JSON error is `{"message": "<exception message>"}`. Non-HTTP exceptions become `{"message": "Server Error"}`.
- A **`404` from `findOrFail` or a binding leaks the model class**, for example `{"message": "No query results for model [App\\Models\\Plugin] 999"}`.
- `abort(404)` without a message (for example on an unknown gift) returns `{"message": ""}`.
- A **validation failure** (`resource/user` without `name`, `discord/.../apply/...` without `custom_password`) returns `422` `{"message": "The given data was invalid.", "errors": {...}}` for JSON requests. For other requests, Laravel 8's default handler answers a **`302` redirect** to the previous URL.

Controller messages that reach the caller:

| Status | Message | Endpoint |
|--------|---------|----------|
| `400` | `Discord not found` | `POST /discord` without a `discord` key |
| `404` | `User not found` | `POST /discord` when no `users.discord` matches |
| `403` | (empty) | `POST /discord/{user}/apply/{plugin}`, wrong `custom_password` |

<CalloutContainer type="warning">

<CalloutTitle>Content-Type</CalloutTitle>

<CalloutDescription>
Most v1 controllers return `json_encode(...)` as a **string**, which Laravel serves as `text/html; charset=UTF-8` even though the body is JSON. Only `payment/{id}` (`response()->json()`) and `discord/{serverId}` (an array, converted by Laravel) are labelled `application/json`. `resource/version/{resource}`, `bstats/url/{id}` and `bstats/{id}/{chart}` return bare strings or integers, also labelled `text/html`. Clients must parse the body regardless of the header.
</CalloutDescription>

</CalloutContainer>

## All routes

16 public routes under `/api/v1` (plus `GET /api/user`, see above). Each `GET` also answers `HEAD`. They are listed in **declaration order**.

| # | Method | URI | Route name | Purpose | Page |
|---|--------|-----|------------|---------|------|
| 1 | `GET` | `/api/v1/gift/{id}` | `api.v1.gift` | Discount code lookup by `code`; returns the whole `gifts` row | [Gifts and payments](./gifts-payments.md) |
| 2 | `GET` | `/api/v1/payment/{id}` | `api.v1.payment` | Payment lookup by `stripe_id`; returns the whole `payments` row | [Gifts and payments](./gifts-payments.md) |
| 3 | `GET` | `/api/v1/discord/authentication` | `api.v1.discord.auth` | Discord OAuth callback: exchanges `code`, links the account (`state` = user id), redirects to the dashboard | [Discord](./discord.md) |
| 4 | `POST` | `/api/v1/discord` | `api.v1.discord` | `plugin_accesses` rows of the user whose `users.discord` equals the `discord` body field | [Discord](./discord.md) |
| 5 | `POST` | `/api/v1/discord/{user:discord_id}` | `api.v1.discord.id` | `{user: {name, id, avatar}, plugins: [...]}` for a linked Discord account | [Discord](./discord.md) |
| 6 | `POST` | `/api/v1/discord/{user:discord_id}/apply/{plugin}` | `api.v1.discord.resource` | Grants a plugin to a member (`custom_password`); returns `{"message":"ok"}` or `{"message":"ko"}` | [Discord](./discord.md) |
| 7 | `GET` | `/api/v1/discord/{serverId}` | `api.v1.discord.info` | Guild widget: `{id, name, invite}` | [Discord](./discord.md) |
| 10 | `GET` | `/api/v1/resource/user` | `api.v1.resourceuser` | Users whose name starts with `name` (`[{name}]`, no limit) | [Resources](./resources.md) |
| 11 | `GET` | `/api/v1/resource/search` | `api.v1.resourcesearch` | Paginated plugin list (`size`, default 15, max 25) | [Resources](./resources.md) |
| 12 | `GET` | `/api/v1/resource/versions/{resource}` | `api.v1.resourceversion` | All versions of a plugin | [Resources](./resources.md) |
| 13 | `GET` | `/api/v1/resource/version/{resource}` | `api.v1.resourceversion.current` | Current version as a bare string | [Resources](./resources.md) |
| 14 | `GET` | `/api/v1/resource/{resource}` | `api.v1.resourceshow` | One plugin (full row plus `download`, `logo`, `version`, and `purchases` for paid plugins only) | [Resources](./resources.md) |
| 15 | `GET` | `/api/v1/author/{id}` | `api.v1.authorshow` | `{id, discord, name}` of a user | [Authors](./authors.md) |
| 16 | `GET` | `/api/v1/bstats/url/{id}` | `api.v1.bstatsurl` | bStats page URL for a **bStats** plugin id | [bStats](./bstats.md) |
| 17 | `GET` | `/api/v1/bstats/{id}/{chart}` | `api.v1.bstatsstats` | Latest value of a bStats chart (integer) | [bStats](./bstats.md) |
| 18 | `POST` | `/api/v1/licence/{licence:key}` | `api.v1.licence` | Licence check (key + `unique_id` + IP) | [Licence](./licence.md) |

<CalloutContainer type="info">

<CalloutTitle>Route names</CalloutTitle>

<CalloutDescription>
The names inside the `resource`, `author` and `bstats` groups have **no dot** between the group name and the route name (`->name('resource')` followed by `->name('show')` gives `api.v1.resourceshow`). These are the real v1 names, not typos in this page.
</CalloutDescription>

</CalloutContainer>

### Quick check

```bash
curl -i -H "Accept: application/json" https://groupez.dev/api/v1/author/1
```

```json
{"id":1,"discord":"123456789012345678","name":"Ada"}
```

The values above are illustrative. The keys and their order come from `AuthorController::getAuthor()`. On the legacy platform the `Content-Type` of this response is `text/html; charset=UTF-8`.

## Declaration order traps

The v1 file does not follow a "literals before wildcards" rule, but most conflicts are avoided by segment count or by verb:

1. **`GET /discord/authentication` is declared before `GET /discord/{serverId}`.** This order is correct. Reversed, a sign-in callback would be read as a guild id.
2. **Within `/resource`, the literals `user`, `search`, `versions/…` and `version/…` are declared before `/{resource}`.** This order is correct.
3. **`/bstats/url/{id}` is declared before `/bstats/{id}/{chart}`.** This order is correct. Both have three segments.
