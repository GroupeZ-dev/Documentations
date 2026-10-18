---
title: Discord
---

# Discord

These endpoints are called by Discord bots: to sign a member in with Discord, to read which resources a Discord member owns (for example to hand out roles), to grant a resource to a member, and to read the public information of a Discord server.

All of them live under `https://groupez.dev/api/v1/discord`.

<CalloutContainer type="info">

<CalloutTitle>Same URIs as the legacy platform</CalloutTitle>

<CalloutDescription>
The current platform keeps the `/api/v1/discord/...` URIs, verbs, body fields and JSON keys of the [legacy platform](../v1/discord.md) so that bots already deployed keep working. The differences are listed in the notes of each endpoint.
</CalloutDescription>

</CalloutContainer>

## Overview

| Method | URI | Route name | Purpose |
| --- | --- | --- | --- |
| `GET` | `/api/v1/discord/authentication` | `api.v1.discord.auth` | Redirects to the Discord sign-in flow |
| `POST` | `/api/v1/discord` | `api.v1.discord.store` | Resources owned by a Discord member |
| `POST` | `/api/v1/discord/{user}` | `api.v1.discord.user` | A Discord member and the resources they own |
| `POST` | `/api/v1/discord/{user}/apply/{resource}` | `api.v1.discord.grant` | Grants a resource to a Discord member (shared secret) |
| `GET` | `/api/v1/discord/{serverId}` | `api.v1.discord.server` | Public information of a Discord server |

## Common behaviour

### Identifying a member

`{user}` (and the `discord` body field) is a Discord **user id** (a snowflake, e.g. `123456789012345678`), never a groupez.dev user id. It is resolved through the Discord account the member linked on groupez.dev (the `social_accounts` table, provider `discord`). A snowflake that nobody linked, or that belongs to a deleted account, answers `404`.

### Headers

Every response of the API, errors included, carries:

```
X-GroupeZ-Api-Version: 1
```

The API is sessionless: no cookie and no CSRF token are needed. Sending `Accept: application/json` is recommended, although every error under `/api/v1/` is rendered as JSON regardless.

### Rate limit

All Discord endpoints use the `api` limiter: **120 requests per minute**, keyed by IP address (the API carries no session, so there is no authenticated user to key on). Above the limit:

**429 Too Many Requests**

```json
{
  "message": "Too many requests."
}
```

The `Retry-After`, `X-RateLimit-Limit`, `X-RateLimit-Remaining` and `X-RateLimit-Reset` headers are forwarded when the limiter sets them.

### Errors

Every `404` under `/api/v1/` is rewritten to the same neutral body, whatever the cause (unknown member, unknown resource, closed widget):

```json
{
  "message": "Not found."
}
```

### Route declaration order

<CalloutContainer type="warning">

<CalloutTitle>Declaration order matters</CalloutTitle>

<CalloutDescription>
`authentication` and `{serverId}` are both a single segment answered by `GET`. `GET /discord/authentication` is declared **before** `GET /discord/{serverId}`, otherwise every sign-in would be read as a lookup of a guild called `authentication`. In the same way, `POST /discord/{user}` and `GET /discord/{serverId}` share a URI shape and are told apart only by the verb.
</CalloutDescription>

</CalloutContainer>

### Accesses payload

`POST /discord` and `POST /discord/{user}` return the same list of accesses. Each item is spelled the way the legacy platform spelled a `plugin_accesses` row:

| Key | Type | Description |
| --- | --- | --- |
| `id` | integer | Access id |
| `user_id` | integer | groupez.dev user id of the member |
| `plugin_id` | integer | Id of the resource (the legacy platform called resources *plugins*) |
| `payment_id` | integer \| null | Internal id of the payment behind the access, `null` when no payment backs it (gift, manual grant...) |
| `created_at` | string \| null | ISO 8601 timestamp (e.g. `2026-10-15T12:00:00.000000Z`) |
| `updated_at` | string \| null | ISO 8601 timestamp |

Only **active** accesses are listed: an access that was revoked (refund, manual revocation) is never returned. Items are ordered by `id`, ascending. The list is a bare JSON array, never wrapped in a `data` key.

---

### GET /api/v1/discord/authentication

Legacy entry point of the "link your Discord account" flow. On the current platform it no longer performs the OAuth exchange: it redirects the visitor to the standard Discord sign-in flow of groupez.dev.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.discord.auth` | None | `api` (120/min) |

**Path parameters:** none.

**Query parameters:** none are read. `code` and `state` sent by the legacy OAuth callback are deliberately ignored and dropped from the redirect.

#### Responses

**302 Found**

```
Location: https://groupez.dev/auth/discord/redirect
```

The target (`oauth.redirect`) then sends the visitor to Discord. That route belongs to the website, not to the API, and has its own rate limit (`auth`, 5 per minute).

#### Example

```bash
curl -i https://groupez.dev/api/v1/discord/authentication
```

#### Notes

- This endpoint is meant to be opened in a **browser**, not called by a bot.
- The redirect is a `302`, not a `301`, so browsers do not cache it permanently.
- An authorization code issued for the legacy callback cannot be reused: the visitor has to go through the Discord consent screen again.

---

### POST /api/v1/discord

Returns the active accesses of a Discord member, identified by the `discord` body field. Despite the verb, nothing is written.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.discord.store` | None | `api` (120/min) |

**Path parameters:** none.

**Body parameters** (JSON or form-encoded):

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `discord` | string | Yes | Discord user id (snowflake) of the member |

#### Responses

**200 OK** — a bare array of [accesses](#accesses-payload) (possibly empty):

```json
[
  {
    "id": 42,
    "user_id": 7,
    "plugin_id": 12,
    "payment_id": 1534,
    "created_at": "2026-10-15T12:00:00.000000Z",
    "updated_at": "2026-10-15T12:00:00.000000Z"
  }
]
```

**400 Bad Request** — `discord` is missing, blank (only whitespace) or not a string:

```json
{
  "message": "Discord not found"
}
```

**404 Not Found** — no account linked that snowflake (or the account was deleted):

```json
{
  "message": "Not found."
}
```

**429 Too Many Requests** — see [Rate limit](#rate-limit).

#### Example

```bash
curl -X POST https://groupez.dev/api/v1/discord \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"discord": "123456789012345678"}'
```

#### Notes

- The controller aborts with the message `User not found`, but every `404` under `/api/v1/` is rewritten to `{"message": "Not found."}`. Branch on the status code, not on the message.
- Send the snowflake as a JSON **string**. A JSON number (`{"discord": 123456789012345678}`) is not a string and answers `400`; snowflakes also exceed the safe integer range of most JSON parsers.
- A member who exists but owns nothing gets `200` with `[]`, not a `404`.
- Revoked accesses are filtered out, so a refunded purchase disappears from the list.

---

### POST /api/v1/discord/\{user\}

Returns a Discord member (name, groupez.dev id, avatar) together with their active accesses. Despite the verb, nothing is written.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.discord.user` | None | `api` (120/min) |

**Path parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `user` | string | Discord user id (snowflake) of the member |

**Body parameters:** none.

#### Responses

**200 OK**

```json
{
  "user": {
    "name": "Bobby",
    "id": 7,
    "avatar": null
  },
  "plugins": [
    {
      "id": 42,
      "user_id": 7,
      "plugin_id": 12,
      "payment_id": 1534,
      "created_at": "2026-10-15T12:00:00.000000Z",
      "updated_at": "2026-10-15T12:00:00.000000Z"
    }
  ]
}
```

| Key | Type | Description |
| --- | --- | --- |
| `user.name` | string | groupez.dev display name |
| `user.id` | integer | groupez.dev user id |
| `user.avatar` | string \| null | Absolute URL of the uploaded avatar, or `null` when the member has none |
| `plugins` | array | Active [accesses](#accesses-payload), ordered by `id` |

**404 Not Found** — no account linked that snowflake (or the account was deleted):

```json
{
  "message": "Not found."
}
```

**429 Too Many Requests** — see [Rate limit](#rate-limit).

#### Example

```bash
curl -X POST https://groupez.dev/api/v1/discord/123456789012345678 \
  -H "Accept: application/json"
```

#### Notes

- `avatar` can be `null`. The legacy platform always returned a URL, falling back to a default image; clients must handle `null`.
- No other member data is exposed (no email, role or ban state).
- `GET /api/v1/discord/{id}` hits a different endpoint ([server information](#get-apiv1discordserverid)): the verb matters.

---

### POST /api/v1/discord/\{user\}/apply/\{resource\}

Grants a resource to a Discord member. This is the only endpoint of the Discord group that writes, and it is protected by a shared secret.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.discord.grant` | Shared secret in the body (`custom_password`) | `api` (120/min) |

**Path parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `user` | string | Discord user id (snowflake) of the member |
| `resource` | integer | groupez.dev resource id. Only `Published` and `Unlisted` resources resolve; any other id answers `404` |

**Body parameters:**

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `custom_password` | string | Yes | The shared secret configured on the server under `services.discord.purchase_secret` (environment variable `DISCORD_PURCHASE_SECRET`) |

#### Responses

**200 OK** — the access was granted (or a revoked access was restored):

```json
{
  "message": "ok"
}
```

**200 OK** — the member already had an active access to this resource, nothing changed:

```json
{
  "message": "ko"
}
```

**403 Forbidden** — the secret is missing, wrong, not a string, or no secret is configured on the server. The body never says which:

```json
{
  "message": ""
}
```

**404 Not Found** — unknown or non-public resource, or no account linked that snowflake:

```json
{
  "message": "Not found."
}
```

**429 Too Many Requests** — see [Rate limit](#rate-limit).

#### Example

```bash
curl -X POST https://groupez.dev/api/v1/discord/123456789012345678/apply/12 \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"custom_password": "<shared secret>"}'
```

#### Notes

<CalloutContainer type="warning">

<CalloutTitle>Evaluation order</CalloutTitle>

<CalloutDescription>
1. The `{resource}` binding runs first: an unknown or non-public resource answers `404` **before** the secret is checked.
2. The secret is checked next: a wrong secret answers `403`, even for an unknown member.
3. The member is looked up last: an unknown snowflake answers `404`.
</CalloutDescription>

</CalloutContainer>

- The secret is compared in constant time (`hash_equals`). When `services.discord.purchase_secret` is not set or is empty, **every** call is refused with `403`.
- `ko` is not an error: it means "already owned", and the status is still `200`. A bot can use it to decide whether to announce the grant.
- Calling the endpoint again is idempotent: at most one access row exists per member and resource. A previously revoked access is reactivated rather than duplicated (`ok` is returned in that case).
- The access is recorded with the source `manual` and no payment (`payment_id` is `null` in the [accesses payload](#accesses-payload)), so it is not counted as a sale.
- Each successful grant is written to the activity log (`access.granted`, `via: api.v1.discord.grant`) with a hashed IP address.
- The `403` body is the framework's default JSON rendering of an `abort(403)` without a message: with `APP_DEBUG` off it is `{"message": ""}` (the tests only assert the status and that the body leaks nothing about the secret). Rely on the status code only.

---

### GET /api/v1/discord/\{serverId\}

Returns the public information of a Discord server (guild), read from its public widget.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.discord.server` | None | `api` (120/min) |

**Path parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `serverId` | string | Discord guild id (digits only) |

**Query parameters:** none.

#### Responses

**200 OK**

```json
{
  "id": "987654321098765432",
  "name": "GroupeZ",
  "invite": "https://discord.gg/groupez"
}
```

| Key | Type | Description |
| --- | --- | --- |
| `id` | string | Guild id |
| `name` | string | Guild name |
| `invite` | string \| null | Instant invite exposed by the widget, `null` when the widget has none |

**404 Not Found** — the widget is disabled, the guild does not exist, `serverId` is not made of digits only, or Discord could not be reached:

```json
{
  "message": "Not found."
}
```

**429 Too Many Requests** — see [Rate limit](#rate-limit).

#### Example

```bash
curl https://groupez.dev/api/v1/discord/987654321098765432 \
  -H "Accept: application/json"
```

#### Notes

- The data comes from `https://discord.com/api/guilds/{serverId}/widget.json`. The server **widget must be enabled** in the guild settings, otherwise the answer is `404`. No bot token is used.
- Only `id`, `name` and `invite` are returned; the member list of the widget is never forwarded.
- Successful answers are cached for 10 minutes (`groupez.discord.widget_cache_seconds`). Failures are **not** cached: enabling the widget takes effect on the next call.
- The call to Discord times out after 5 seconds (`groupez.discord.timeout_seconds`); a timeout answers `404`.
- A `serverId` that is not purely numeric is rejected without calling Discord.
- `GET /api/v1/discord/authentication` is declared before this route and is never treated as a guild id (see [Route declaration order](#route-declaration-order)).
