---
title: Discord
---

# Discord

<CalloutContainer type="warning">

<CalloutTitle>Legacy platform</CalloutTitle>

<CalloutDescription>
This page documents the **legacy v1 platform** (Laravel 8). It is kept for reference and for plugins and bots built against it. For the current platform, see [Discord (v2)](../v2/discord.md).
</CalloutDescription>

</CalloutContainer>

These endpoints were called by Discord bots and by the "link your Discord account" button of the dashboard: linking a Discord account, reading which resources a Discord member owns, granting a resource, and reading the public information of a Discord server.

All of them live under `https://groupez.dev/api/v1/discord`.

## Overview

| Method | URI | Route name | Purpose |
| --- | --- | --- | --- |
| `GET` | `/api/v1/discord/authentication` | `api.v1.discord.auth` | OAuth callback that links a Discord account |
| `POST` | `/api/v1/discord` | `api.v1.discord` | Resources owned by a Discord member |
| `POST` | `/api/v1/discord/{user}` | `api.v1.discord.id` | A Discord member and the resources they own |
| `POST` | `/api/v1/discord/{user}/apply/{plugin}` | `api.v1.discord.resource` | Grants a resource to a Discord member (shared secret) |
| `GET` | `/api/v1/discord/{serverId}` | `api.v1.discord.info` | Public information of a Discord server |

## Common behaviour

### Middleware and rate limit

The routes are mounted with the `api` middleware group: `throttle:api`, implicit model binding and Cloudflare proxy trust. There is no session and no CSRF check.

The `api` limiter allows **60 requests per minute**, keyed by user id or, for anonymous callers (always the case here), by IP address. Above the limit the framework answers `429 Too Many Requests`; with `Accept: application/json` the body is:

```json
{
  "message": "Too Many Attempts."
}
```

### Content type and errors

<CalloutContainer type="info">

<CalloutTitle>Not always JSON</CalloutTitle>

<CalloutDescription>
- `POST /discord`, `POST /discord/{user}` and `POST /discord/{user}/apply/{plugin}` return a string built with `json_encode()`. Laravel serves a returned string as `text/html; charset=UTF-8`, so the body is JSON but the `Content-Type` header is **not** `application/json`. Parse the body regardless of the header.
- `GET /discord/{serverId}` returns an array and is served as `application/json`.
- The legacy exception handler is the framework default: errors (`400`, `403`, `404`, `422`, `429`) are rendered as JSON **only** when the request sends `Accept: application/json`. Otherwise they are HTML error pages (and a validation error becomes a redirect). Always send `Accept: application/json`.
</CalloutDescription>

</CalloutContainer>

With `Accept: application/json` and `APP_DEBUG` off, an error raised by `abort($code, $message)` renders as `{"message": "<message>"}`; a `404` from a failed model binding renders as `{"message": "No query results for model [App\\Models\\<Model>] <value>"}`.

### Route declaration order

<CalloutContainer type="warning">

<CalloutTitle>Declaration order matters</CalloutTitle>

<CalloutDescription>
`GET /discord/authentication` is declared **before** `GET /discord/{serverId}`; otherwise the word `authentication` would be read as a guild id. `POST /discord/{user}` and `GET /discord/{serverId}` share a URI shape and are told apart only by the verb.
</CalloutDescription>

</CalloutContainer>

### Accesses payload

`POST /discord` and `POST /discord/{user}` return raw rows of the `plugin_accesses` table, read through the query builder:

| Key | Type | Description |
| --- | --- | --- |
| `id` | integer | Access id |
| `user_id` | integer | groupez.dev user id |
| `plugin_id` | integer | Resource id |
| `payment_id` | integer \| null | Payment id, `null` when the access was not bought |
| `created_at` | string \| null | Raw database value, e.g. `2021-10-15 12:00:00` |
| `updated_at` | string \| null | Raw database value |

No explicit ordering is applied (database order).

<CalloutContainer type="info">

<CalloutTitle>Integer or string</CalloutTitle>

<CalloutDescription>
The rows come straight from PDO. Whether `id`, `user_id`, `plugin_id` and `payment_id` are serialized as JSON numbers or as numeric strings depends on the PHP version and PDO settings of the server (PHP 8.1+ with `pdo_mysql` returns native integers, earlier versions returned strings). This could not be checked against production; accept both.
</CalloutDescription>

</CalloutContainer>

---

### GET /api/v1/discord/authentication

OAuth2 redirect URI of the "link your Discord account" flow. Discord redirects the browser here with `code` and `state`; the endpoint exchanges the code for a token, reads the Discord profile and stores the link in `discord_users`, then redirects to the account page of the dashboard.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.discord.auth` | None (the groupez.dev user is taken from `state`) | `api` (60/min) |

**Path parameters:** none.

**Query parameters:**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `code` | string | Yes | OAuth2 authorization code issued by Discord |
| `state` | integer | Yes | groupez.dev user id the Discord account is linked to |

The authorization URL that leads here is built by `User::getDiscordAuthLink()`: `https://discord.com/api/oauth2/authorize?client_id=...&redirect_uri=<this endpoint>&response_type=code&scope=identify&state=<user id>`.

#### Responses

Every outcome is a **302** redirect to `https://groupez.dev/dashboard/account` with a flashed message (in French):

| Case | Flashed message |
| --- | --- |
| Both `code` and `state` missing | `error`: "Une erreur est survenue lors de la liaison de votre compte discord. (Url format)" |
| `state` is not an existing user id | `error`: "... (User id)" |
| The token exchange with Discord failed | `error`: "... (OAuth2)" |
| Reading the Discord profile failed | `error`: "... (Api URL)" |
| This Discord account is already linked | `error`: "Votre compte est déjà relié." |
| Success | `success`: "Vous venez d'ajouter votre compte discord sur Serveur Minecraft Vote." |

#### Example

```bash
curl -i "https://groupez.dev/api/v1/discord/authentication?code=<code>&state=7"
```

#### Notes

- Meant to be reached by a **browser** coming back from Discord, not called by a bot.
- The check is `missing('code') && missing('state')`: only a request missing **both** is rejected as malformed. A request with only one of them goes on and fails at a later step.
- The groupez.dev account is identified by `state` alone, which is the plain user id. The request is not tied to the logged-in session.
- The flashed messages are written from the `api` route group, which has no `StartSession` middleware: the redirect flashes them into a session store that is never started nor saved, so read from the code they are most likely lost and never shown on the dashboard. This was not observed in production.
- On success, a user log entry ("Création de la liaison discord pour ...") is also written.
- On the current platform this address only redirects to the standard Discord sign-in flow (see [v2](../v2/discord.md#get-apiv1discordauthentication)).

---

### POST /api/v1/discord

Intended to return the accesses of a Discord member identified by the `discord` body field.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.discord` | None | `api` (60/min) |

**Path parameters:** none.

**Body parameters:**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `discord` | string | Yes | Discord user id (snowflake) |

#### Responses

**200 OK** — a bare array of [accesses](#accesses-payload):

```json
[
  {
    "id": 42,
    "user_id": 7,
    "plugin_id": 12,
    "payment_id": 1534,
    "created_at": "2021-10-15 12:00:00",
    "updated_at": "2021-10-15 12:00:00"
  }
]
```

**400 Bad Request** — the `discord` field is absent:

```json
{
  "message": "Discord not found"
}
```

**404 Not Found** — no user has that Discord id:

```json
{
  "message": "User not found"
}
```

#### Example

```bash
curl -X POST https://groupez.dev/api/v1/discord \
  -H "Accept: application/json" \
  -d "discord=123456789012345678"
```

#### Notes

<CalloutContainer type="warning">

<CalloutTitle>Probably broken on the legacy platform</CalloutTitle>

<CalloutDescription>
The controller looks the member up in the `users.discord` column, but the migration `2021_10_10_203050_remove_discord_in_user` dropped that column when Discord links moved to the `discord_users` table. Read from the code, any request that passes the `400` check runs a query on a column that no longer exists, which would answer `500 Server Error` rather than `200` or `404`. This could not be verified against the production database.
</CalloutDescription>

</CalloutContainer>

- The check is `has('discord')`: an empty value is not rejected by the `400` (empty strings are converted to `null` by the global middleware).
- Revoked accesses do not exist on the legacy platform: every row of `plugin_accesses` for the user is returned.

---

### POST /api/v1/discord/\{user\}

Returns a Discord member (name, groupez.dev id, avatar) with all their accesses.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.discord.id` | None | `api` (60/min) |

**Path parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `user` | string | Discord user id (snowflake), bound to `DiscordUser` by its `discord_id` column (`{user:discord_id}`) |

**Body parameters:** none.

#### Responses

**200 OK**

```json
{
  "user": {
    "name": "Bobby",
    "id": 7,
    "avatar": "https://groupez.dev/storage/images/users/0/0/0/7.png"
  },
  "plugins": [
    {
      "id": 42,
      "user_id": 7,
      "plugin_id": 12,
      "payment_id": 1534,
      "created_at": "2021-10-15 12:00:00",
      "updated_at": "2021-10-15 12:00:00"
    }
  ]
}
```

| Key | Type | Description |
| --- | --- | --- |
| `user.name` | string | groupez.dev display name |
| `user.id` | integer | groupez.dev user id |
| `user.avatar` | string | Always a URL: the uploaded avatar (`/storage/images/users/...`) or `https://groupez.dev/images/users/default_user.png` |
| `plugins` | array | All [accesses](#accesses-payload) of the user |

**404 Not Found** — no `discord_users` row has that `discord_id`. With `Accept: application/json`, the body is the framework's model-not-found message:

```json
{
  "message": "No query results for model [App\\Models\\DiscordUser] 123456789012345678"
}
```

#### Example

```bash
curl -X POST https://groupez.dev/api/v1/discord/123456789012345678 \
  -H "Accept: application/json"
```

#### Notes

- Served as `text/html` (see [Content type and errors](#content-type-and-errors)).
- The `404` message names the internal model class and echoes the requested id; rely on the status code.

---

### POST /api/v1/discord/\{user\}/apply/\{plugin\}

Grants a resource to a Discord member, protected by a shared secret.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.discord.resource` | Shared secret in the body (`custom_password`) | `api` (60/min) |

**Path parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `user` | string | Discord user id (snowflake), bound to `DiscordUser` by `discord_id` |
| `plugin` | integer | Resource id, bound to `Plugin` by primary key. No status filter: any existing resource, published or not, resolves |

**Body parameters:**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `custom_password` | string | Yes | Shared secret, compared to the `DISCORD_PURCHASE_CONFIRM` environment variable |

#### Responses

**200 OK** — the access was created:

```json
{
  "message": "ok"
}
```

**200 OK** — the user already had this resource:

```json
{
  "message": "ko"
}
```

**403 Forbidden** — `custom_password` does not match:

```json
{
  "message": ""
}
```

**404 Not Found** — unknown Discord id or unknown resource (model binding). The `{user}` binding is resolved first, so an unknown Discord id names `DiscordUser`; with a known member and an unknown resource id the body names `Plugin`:

```json
{
  "message": "No query results for model [App\\Models\\Plugin] 12"
}
```

**422 Unprocessable Entity** — `custom_password` missing (only with `Accept: application/json`; otherwise a `302` redirect back):

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "custom_password": [
      "The custom password field is required."
    ]
  }
}
```

#### Example

```bash
curl -X POST https://groupez.dev/api/v1/discord/123456789012345678/apply/12 \
  -H "Accept: application/json" \
  -d "custom_password=<shared secret>"
```

#### Notes

- Evaluation order: model bindings (`404`), then validation (`422`), then the secret (`403`), then the grant.
- The secret is compared with `!==` against `env('DISCORD_PURCHASE_CONFIRM')`, read directly from the environment. If the configuration is cached (`config:cache`), `env()` returns `null` outside config files and every call is refused with `403`.
- The created row has no `payment_id`.
- Nothing is logged for a grant.
- Served as `text/html` (see [Content type and errors](#content-type-and-errors)).

---

### GET /api/v1/discord/\{serverId\}

Returns the public information of a Discord server (guild), read from its public widget.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.discord.info` | None | `api` (60/min) |

**Path parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `serverId` | string | Discord guild id |

**Query parameters:** none.

#### Responses

**200 OK** (`application/json`)

```json
{
  "id": "987654321098765432",
  "name": "GroupeZ",
  "invite": "https://discord.gg/groupez"
}
```

`id`, `name` and `invite` are copied as-is from the widget's `id`, `name` and `instant_invite`.

**404 Not Found** — any failure: widget disabled, unknown guild, network error, or a widget without one of the three fields. The controller calls `abort(404)` without a message, so with `Accept: application/json` (and `APP_DEBUG` off) the body is:

```json
{
  "message": ""
}
```

#### Example

```bash
curl https://groupez.dev/api/v1/discord/987654321098765432 \
  -H "Accept: application/json"
```

#### Notes

- The data comes from `https://discord.com/api/guilds/{serverId}/widget.json`; the guild **widget must be enabled**.
- Every call reaches Discord: there is no cache, and the Guzzle client is created without a timeout.
- `serverId` is not validated before being inserted into the Discord URL.
- `invite` can be `null` if Discord returns `instant_invite: null`; if the key is absent altogether, the endpoint answers `404`.
