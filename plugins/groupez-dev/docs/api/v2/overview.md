---
sidebar_position: 1
title: Overview (v2)
---

# Public API: overview (v2)

This section documents the public HTTP API served by the **current** groupez.dev platform (the "v2" rewrite, Laravel 13). Minecraft plugins and Discord bots call it.

:::info Same URIs as v1
The v2 platform is a rewrite of the site, **not** a new API version. It keeps the URIs of the legacy platform (`/api/v1/...`), their HTTP verbs, their status codes and their JSON keys, so plugins already deployed on servers keep working without an update. Everything on this page is served under `/api/v1`.

The legacy platform is documented in [API v1 overview](../v1/overview.md). For what changed between the two, see [Changes from v1](#changes-from-v1) below.
:::

## Base URL

```
https://groupez.dev/api/v1
```

The prefix is set once, as `apiPrefix: 'api/v1'` in `bootstrap/app.php`. Route names are prefixed `api.v1.`.

## Versioning

Every response from the group carries this header:

```http
X-GroupeZ-Api-Version: 1
```

- The `AddApiVersionHeader` middleware adds it to successful responses. The group mounts it as `AddApiVersionHeader::class.':1'`.
- Error responses carry it too, including those raised before the middleware runs (router `404`/`405`s, throttle `429`s, model-binding `404`s) and those raised by controllers and form requests (`400`, `403`, `404`, `422`). The exception handler in `bootstrap/app.php` sets it on every exception response to a request matching `api/v1/*`.
- Pages of the website never carry the header.
- The header is listed in CORS `exposed_headers`, so browser scripts can read it.

The `/api/v1` contract is frozen. A breaking change would open a separate `/api/v2` group with its own header value. No such group exists today.

## Authentication

**There is no authentication layer.** No API token, no OAuth bearer, no session and no CSRF:

- The routes are mounted on the `api` middleware group, which holds only `SubstituteBindings`. There is no `web` group, so no session is started and the API never sets a cookie.
- `POST` requests do not need a CSRF token.
- Because there is no session, the caller is always anonymous. Resources therefore resolve with the public visibility rules (published and unlisted only, see [Resources](./resources.md)).

One endpoint is guarded, by a shared secret in the request body:

| Endpoint | Guard |
|----------|-------|
| `POST /api/v1/discord/{user}/apply/{resource}` | Body field `custom_password`, compared with `hash_equals` against the config key `services.discord.purchase_secret`. A missing, empty or non-string value, or an unset secret, returns `403`. |

:::note Unauthenticated by design
`GET /api/v1/gift/{gift}` and `GET /api/v1/payment/{payment}` are public on purpose: deployed plugins call them without a token. They are hardened through their payloads instead (three and four keys, no personal data) and through non-enumerable keys (a gift code, a payment ULID).
:::

## Rate limiting

All API limiters are declared in `app/Providers/RateLimitServiceProvider.php`. Three of them apply to `/api/v1`:

| Limiter | Limit | Key | Applied to |
|---------|-------|-----|------------|
| `api` | 120 requests / minute | authenticated user id, else client IP (always the IP on this API, which has no session) | **every** route of the group |
| `search` | 60 requests / minute | user id, else client IP | `GET /api/v1/resource/search` (on top of `api`) |
| `licence` | 60 requests / minute **per `{key}`** and 240 requests / minute **per IP** | the `{key}` path segment, and the client IP | `POST /api/v1/licence/{key}` (on top of `api`) |

The limiters stack. A route counts against the group's `api` limiter and also against its own limiter, if it has one. Some consequences:

- the search endpoint is capped at 60/min by `search`, and those calls also count toward your 120/min `api` budget;
- on the licence endpoint, the group's 120/min per IP is reached before the 240/min per IP of `licence`, so in practice the binding limits are 60/min per key and 120/min per IP.

A request that is refused still counts as an attempt: a call that ends in `404` uses up the budget like any other.

The client IP comes from `X-Forwarded-For`, because the application trusts every proxy (`trustProxies(at: '*')`). The origin is only reachable through the load balancer.

### 429 response

```http
HTTP/1.1 429 Too Many Requests
Content-Type: application/json
Retry-After: 42
X-RateLimit-Limit: 60
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1760620000
X-GroupeZ-Api-Version: 1
```

```json
{"message": "Too many requests."}
```

The body is fixed by `bootstrap/app.php`. It is never the framework's `Too Many Attempts.` and never includes a stack trace, even with `APP_DEBUG` on. The handler copies `Retry-After`, `X-RateLimit-Limit`, `X-RateLimit-Remaining` and `X-RateLimit-Reset` from the framework's response whenever they are present. The header values above are only examples.

## Middleware

| Layer | Middleware | Effect |
|-------|------------|--------|
| Global | framework defaults: `ValidatePathEncoding`, `InvokeDeferredCallbacks`, `PreventRequestsDuringMaintenance`, `ValidatePostSize`, `TrimStrings`, `ConvertEmptyStringsToNull` | strings are trimmed and empty strings become `null` before any controller sees them |
| Global | `HandleCors` (framework) | CORS, configured in `config/cors.php` (see below) |
| Global | `TrustProxies` (`*`) | client IP and scheme are read from the `X-Forwarded-*` headers |
| Global | `RedirectLegacyUrls` | redirects (`301`) or retires (`410`) old **website** URLs. It does not change any `/api/v1` route. The only `api/` path it touches is `api/gift/valid/*`, an old website helper, which now answers `410`. |
| `api` group | `SubstituteBindings` | route-model binding (`{resource}`, `{user}`, `{gift}`, `{payment}`) |
| Route group | `AddApiVersionHeader:1` | adds `X-GroupeZ-Api-Version: 1` |
| Route group | `throttle:api` | 120/min |
| Per route | `throttle:search`, `throttle:licence` | see above |

The table lists layers, not execution order. Laravel's middleware priority runs `ThrottleRequests` before `SubstituteBindings`, so a request is counted by the limiter before its route parameters are resolved, and `AddApiVersionHeader` only sees responses that were not aborted upstream (the exception handler stamps those).

### Route parameters and binding

| Parameter | Resolves to | Unknown or hidden value |
|-----------|-------------|-------------------------|
| `{resource}` | `Resource` by numeric id, through a custom binder (`AppServiceProvider::configureRouteBindings`) limited to `Published` and `Unlisted` resources for anonymous callers | `404` (never `403`) |
| `{user}` on `/author/{user}` | `User` by id (implicit binding, no ban or role filter; closed, soft-deleted accounts are excluded) | `404` |
| `{gift}` | `Gift` by `code` (`Gift::getRouteKeyName()`) | `404` |
| `{payment}` on `/payment/{payment}` | `Payment` by `uid`, a ULID (`Payment::getRouteKeyName()`) | `404` (anything that is not a ULID is rejected before any query runs) |
| `{user}` on `/discord/...` | **not bound**: a raw Discord snowflake, resolved in the controller through `User::linkedToDiscord()` (the `social_accounts` table) | `404` |
| `{serverId}`, `{chart}`, `{key}` | free strings | n/a |

The website's global `Route::pattern()` constraints (for example `resource` = `[0-9]+`) do **not** apply to API routes, because the API routes are registered first. So `{resource}` accepts any segment, and a non-numeric value returns `404` from the binder.

## CORS

Configured in `config/cors.php`:

| Setting | Value |
|---------|-------|
| `paths` | `api/v1/*` only |
| `allowed_methods` | `GET`, `HEAD`, `OPTIONS` |
| `allowed_origins` | `*` |
| `allowed_headers` | `*` |
| `exposed_headers` | `X-GroupeZ-Api-Version` |
| `max_age` | `86400` (one day) |
| `supports_credentials` | `false` |

A browser can read the API from any origin but cannot write to it. The `POST` endpoints are meant for server-to-server callers (plugins, bots). Those callers send no `Origin` header, so CORS does not affect them.

## Error format

Every request matching `api/*` gets a JSON error (`shouldRenderJsonWhen`), whatever its `Accept` header says. On top of that, `bootstrap/app.php` rewrites two statuses for `api/v1/*`:

| Status | Body | Notes |
|--------|------|-------|
| `404` | `{"message": "Not found."}` | **Every** 404 of the group returns this body: unknown route, unknown model, and also the controllers' own `abort(404, 'User not found')`, whose text is replaced. Model and class names never leak. |
| `429` | `{"message": "Too many requests."}` | see [Rate limiting](#rate-limiting) |
| `400` | `{"message": "Discord not found"}` | only `POST /api/v1/discord` without a usable `discord` field |
| `403` | `{"message": ""}` | `abort(403)` without a message. With `APP_DEBUG` off, the framework returns the exception's (empty) message. |
| `405` | `{"message": "The POST method is not supported for route api/v1/gift/SUMMER. Supported methods: GET, HEAD."}` | framework message, not rewritten. The exact wording comes from Laravel's router. |
| `422` | `{"message": "The name field is required.", "errors": {"name": ["The name field is required."]}}` | the framework's standard validation format. Only `GET /api/v1/resource/user` validates input. |
| `500` | `{"message": "Server Error"}` | framework default with `APP_DEBUG` off |

:::warning Not every endpoint answers JSON
Three endpoints return a **bare `text/plain` body**, as v1 did. Clients read the raw bytes:

- `GET /api/v1/resource/version/{resource}`: the version number (`1.4.2`), or `(soon)`;
- `GET /api/v1/bstats/url/{resource}`: a URL;
- `GET /api/v1/bstats/{resource}/{chart}`: an integer (`0` on any failure).

`GET /api/v1/discord/authentication` returns a `302` redirect.
:::

## All routes

16 public routes. Each `GET` also answers `HEAD`. They are listed in **declaration order**, which matters (see the next section).

| # | Method | URI | Route name | Purpose | Page |
|---|--------|-----|------------|---------|------|
| 1 | `POST` | `/api/v1/licence/{key}` | `api.v1.licence.check` | Legacy licence check. Always returns `{"status":"success","message":"The license is valid"}`. | [Licence](./licence.md) |
| 2 | `GET` | `/api/v1/resource/search` | `api.v1.resources.search` | Paginated list of published resources (`size` 1–25, default 15, optional `q`) | [Resources](./resources.md) |
| 3 | `GET` | `/api/v1/resource/user` | `api.v1.resources.user` | Usernames starting with `name` (max 10). The name is a misnomer: it lists users. | [Resources](./resources.md) |
| 4 | `GET` | `/api/v1/resource/versions/{resource}` | `api.v1.resources.versions` | Every version of a resource, oldest first | [Resources](./resources.md) |
| 5 | `GET` | `/api/v1/resource/version/{resource}` | `api.v1.resources.version.current` | Current version number as plain text, or `(soon)` | [Resources](./resources.md) |
| 6 | `GET` | `/api/v1/resource/{resource}` | `api.v1.resources.show` | One resource, with v1 keys | [Resources](./resources.md) |
| 7 | `GET` | `/api/v1/author/{user}` | `api.v1.authors.show` | `{id, discord, name}` of a user | [Authors](./authors.md) |
| 8 | `GET` | `/api/v1/gift/{gift}` | `api.v1.gifts.check` | Discount code: `{code, percentage, active}` | [Gifts and payments](./gifts-payments.md) |
| 9 | `GET` | `/api/v1/payment/{payment}` | `api.v1.payments.show` | Payment: `{uid, status, amount_cents, currency}` | [Gifts and payments](./gifts-payments.md) |
| 10 | `GET` | `/api/v1/discord/authentication` | `api.v1.discord.auth` | `302` to the Discord OAuth flow (`/auth/discord/redirect`) | [Discord](./discord.md) |
| 11 | `POST` | `/api/v1/discord` | `api.v1.discord.store` | Accesses owned by the member whose snowflake is in the `discord` body field | [Discord](./discord.md) |
| 12 | `POST` | `/api/v1/discord/{user}` | `api.v1.discord.user` | `{user: {name, id, avatar}, plugins: [...]}` for a snowflake | [Discord](./discord.md) |
| 13 | `POST` | `/api/v1/discord/{user}/apply/{resource}` | `api.v1.discord.grant` | Grants a resource to a member (shared secret). Returns `{"message":"ok"}` or `{"message":"ko"}`. | [Discord](./discord.md) |
| 14 | `GET` | `/api/v1/discord/{serverId}` | `api.v1.discord.server` | Guild widget `{id, name, invite}`, cached 10 min | [Discord](./discord.md) |
| 15 | `GET` | `/api/v1/bstats/url/{resource}` | `api.v1.bstats.url` | bStats page URL, plain text | [bStats](./bstats.md) |
| 16 | `GET` | `/api/v1/bstats/{resource}/{chart}` | `api.v1.bstats.stats` | Latest value of a bStats chart, plain-text integer | [bStats](./bstats.md) |

### Quick check

```bash
curl -i -X POST https://groupez.dev/api/v1/licence/ANY-KEY
```

```http
HTTP/1.1 200 OK
Content-Type: application/json
X-GroupeZ-Api-Version: 1
```

```json
{"status":"success","message":"The license is valid"}
```

## Declaration order traps

The order in `routes/api.php` is part of the contract. The router tries routes in declaration order, and several wildcard routes would match literal segments if they were declared first:

1. **`/resource/{resource}` is declared after `search`, `user`, `versions/{resource}` and `version/{resource}`.** Otherwise `GET /resource/search` would look up a resource with id `search` and return `404`.
2. **`GET /discord/authentication` is declared before `GET /discord/{serverId}`.** Otherwise a sign-in link would be treated as a guild id.
3. **`/bstats/url/{resource}` is declared before `/bstats/{resource}/{chart}`.** Both have three segments, so `url` would be read as a resource id.

## Changes from v1

The v2 rewrite keeps the v1 URIs, verbs and, for most endpoints, the JSON keys. The behavioural differences are listed below, grouped by area. Each group page has the details.

### Whole API

| Area | v1 (legacy) | v2 (current) |
|------|-------------|--------------|
| Version header | none | `X-GroupeZ-Api-Version: 1` on every response, errors included |
| Group limiter | `api`: 60/min per user id or IP | `api`: 120/min per user id or IP |
| Extra limiters | none | `search` 60/min, `licence` 60/min per key + 240/min per IP |
| Error rendering | JSON only when the request sent `Accept: application/json`, otherwise HTML error pages (and a `302` redirect on validation failure) | always JSON under `api/*` |
| `404` body | framework message, for example `No query results for model [App\Models\Plugin] 12` or `User not found` | always `{"message":"Not found."}` |
| `429` body | `{"message":"Too Many Attempts."}` (JSON) or an HTML page | `{"message":"Too many requests."}` |
| Content-Type of JSON payloads | most v1 controllers returned `json_encode(...)` strings, served as `text/html; charset=UTF-8` | `application/json`; the three plain-text endpoints are explicitly `text/plain; charset=UTF-8` |
| CORS | `api/*`, all origins, **all methods** | `api/v1/*`, all origins, `GET`/`HEAD`/`OPTIONS` only, `max_age` 86400, version header exposed |
| Middleware group | `throttle:api`, `SubstituteBindings`, `TrustCloudflare` | `SubstituteBindings` only (throttle is on the route group, proxies trusted globally) |
| `GET /api/user` | existed (`auth:api` token guard, unusable in practice) | **removed**. No API route exists outside `/api/v1`; the old website helper `api/gift/valid/*` answers `410`. |

### Route names

The URIs are unchanged, but **every route name except `api.v1.discord.auth` changed**. v1 names were built without a dot separator inside the `resource`, `author` and `bstats` groups, which produced names like `api.v1.resourceshow`. Only applications that build URLs from route names are affected. HTTP clients are not.

| URI | v1 name | v2 name |
|-----|---------|---------|
| `POST /licence/{key}` | `api.v1.licence` | `api.v1.licence.check` |
| `GET /resource/search` | `api.v1.resourcesearch` | `api.v1.resources.search` |
| `GET /resource/user` | `api.v1.resourceuser` | `api.v1.resources.user` |
| `GET /resource/versions/{resource}` | `api.v1.resourceversion` | `api.v1.resources.versions` |
| `GET /resource/version/{resource}` | `api.v1.resourceversion.current` | `api.v1.resources.version.current` |
| `GET /resource/{resource}` | `api.v1.resourceshow` | `api.v1.resources.show` |
| `GET /author/{id}` | `api.v1.authorshow` | `api.v1.authors.show` |
| `GET /gift/{id}` | `api.v1.gift` | `api.v1.gifts.check` |
| `GET /payment/{id}` | `api.v1.payment` | `api.v1.payments.show` |
| `GET /discord/authentication` | `api.v1.discord.auth` | `api.v1.discord.auth` (unchanged) |
| `POST /discord` | `api.v1.discord` | `api.v1.discord.store` |
| `POST /discord/{user}` | `api.v1.discord.id` | `api.v1.discord.user` |
| `POST /discord/{user}/apply/{plugin}` | `api.v1.discord.resource` | `api.v1.discord.grant` |
| `GET /discord/{serverId}` | `api.v1.discord.info` | `api.v1.discord.server` |
| `GET /bstats/url/{id}` | `api.v1.bstatsurl` | `api.v1.bstats.url` |
| `GET /bstats/{id}/{chart}` | `api.v1.bstatsstats` | `api.v1.bstats.stats` |

### Removed or neutralised endpoints

- **The licence check was neutralised.** The v1 licence system (IP-bound keys, expiry, `unique_id` matching, licence logs) was removed. `POST /api/v1/licence/{key}` now returns `200 {"status":"success","message":"The license is valid"}` for **any** key, reads no body and writes nothing. In v1, `{licence:key}` was model-bound (unknown key = `404`), and the endpoint could return `{"status":"error",...}` with the messages `The license has expired`, `Unable to find unique id`, `Unable to find plugin for this licence` or `Impossible to find the ip address`.
- **`GET /api/v1/discord/authentication` became a redirect.** v1 exchanged the OAuth `code` itself, wrote a `discord_users` row and redirected to the dashboard. v2 returns a `302` to the Socialite flow (`/auth/discord/redirect`) and drops `code` and `state`.

### Bindings and lookups

- **Resource visibility:** v1 looked plugins up with `findOrFail` (or an unscoped binding), so **any** plugin id resolved, drafts included. v2 resolves `{resource}` through a binder that only exposes `Published` and `Unlisted` resources. Every other resource returns `404`. This applies to `resource/*`, `bstats/*` and `discord/{user}/apply/{resource}`.
- **Search** lists **published** resources only (v1 paginated the whole `plugins` table), ordered by ascending id (v1 had no explicit order).
- **Payments:** v1 looked a payment up by `stripe_id` (`Payment::where('stripe_id', $id)`). v2 binds `{payment}` by `uid`, a ULID. A caller still passing a Stripe identifier gets `404`.
- **Discord members:** in v1, `POST /discord` read `users.discord`, while `/discord/{user}` and `/discord/{user}/apply/{plugin}` bound `DiscordUser` by `discord_users.discord_id`. v2 resolves all three through `social_accounts` (`User::linkedToDiscord()`). The URI keeps the `{user}` segment, but the binding field `:discord_id` is gone.
- **`POST /discord`:** v2 also returns `400` for a blank string or a non-string `discord` field. v1 only checked whether the key was present.

:::warning bStats identifier
In v1, the `{id}` of `/bstats/url/{id}` and `/bstats/{id}/{chart}` was passed **directly to bStats** as the bStats plugin id. In v2 the segment is `{resource}`, a **groupez.dev resource id**, and the bStats id is read from that resource's `resource_details.bstats_id`. A v1 caller that passed a raw bStats id now gets `404` on both endpoints (the `{resource}` binder rejects it), unless that number also happens to be the id of a published or unlisted groupez.dev resource, in which case the answer is about that resource's bStats project. `0` (stats) and `404` (url) are also returned for a visible resource with no `bstats_id`. This is what the v2 code does. The v2 code comments do not discuss the change, so whether it was intended is not documented.
:::

### Payload hardening

| Endpoint | v1 | v2 |
|----------|----|----|
| `GET /gift/{gift}` | the whole `gifts` row (`json_encode($gift)`) | `{code, percentage, active}`. `active` is the computed `is_usable` (enabled, inside its validity window, below its quota). The v1 `promotion` spelling is gone. |
| `GET /payment/{payment}` | the whole `payments` row (`response()->json($payment)`) | `{uid, status, amount_cents, currency}`. `status` is the enum value (for example `paid`). No buyer, seller, email address or provider id. |
| `GET /resource/{resource}`, search rows | `json_encode($plugin)`: every column of the `plugins` row, plus `download`, `logo`, `version`, and `purchases` (paid plugins only) | a fixed key list, in order: `id, user_id, name, tag, price, category_id, unique_id, version_id, download, purchases, logo, version, created_at, updated_at`, then the v2 additions `slug, rating_avg, reviews_count`. `purchases` is always present (non-revoked purchase accesses). `logo` may be `null`. `price` is `price_cents / 100`. |
| `GET /resource/versions/{resource}` | `$plugin->versions` (raw rows) | exactly `[{id, plugin_id, version, title, download, created_at}]`, explicitly ordered by ascending id |
| `GET /resource/user` | every matching user | max **10** names, ordered by name; `name` must be a string of at most 255 characters |
| `GET /resource/search` | `size` read raw, capped at 25 | `size` clamped to 1–25 (`size=0`, `-4` or `abc` give a valid page, never a `422`); optional `q` filter on name and tagline (truncated to 80 characters) |
| `GET /resource/version/{resource}` | the string returned by the controller, labelled `text/html` | `text/plain; charset=UTF-8`; `(soon)` when there is no released version |
| `GET /author/{user}` | `discord` read from `users.discord` | `discord` read from `social_accounts` (same flat key) |
| `POST /discord/{user}` | `avatar` always a URL (a default image when the member has none); `plugins` = raw `plugin_accesses` rows | `avatar` may be `null`; `plugins` = non-revoked accesses, ordered by id, with exactly `{id, user_id, plugin_id, payment_id, created_at, updated_at}`. Applies to `POST /discord` too. |
| `POST /discord/{user}/apply/{resource}` | `custom_password` compared with `!==` against `env('DISCORD_PURCHASE_CONFIRM')`; missing field = validation error (`422`/`302`) | compared with `hash_equals` against `services.discord.purchase_secret`; missing, wrong or unconfigured = `403`; the grant is written by `ResourceAccessGranter` with source `Manual` and logged to `activity_logs` |
| `GET /discord/{serverId}` | Discord widget fetched on every call | cached 10 minutes (only successful lookups); still `404` when the widget is closed |
| `GET /bstats/url/...` | uncaught HTTP errors from bStats | `404` when there is no bStats id or bStats does not know it; cached 6 hours; plugin name URL-encoded |
| `GET /bstats/.../{chart}` | `0` on an unexpected payload, but HTTP errors from bStats (Guzzle exceptions) were not caught and ended in a `500` | always an integer, `0` on any failure; cached 15 minutes (successful lookups only) |
