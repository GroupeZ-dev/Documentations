---
sidebar_position: 4
title: Authors
---

# Authors (legacy v1)

:::warning Legacy platform
This page documents the **legacy v1 platform** of groupez.dev (Laravel 8), which has been replaced. It is kept for reference and for plugins built against it. For the current behaviour, see [Authors (v2)](../v2/authors.md).
:::

A single endpoint returns a seller (an author of resources) by user id: their id, their Discord information and their name.

## Common behaviour

| Item | Value |
| --- | --- |
| Base URL | `https://groupez.dev/api/v1` |
| Authentication | None |
| Rate limit | `api` limiter: 60 requests per minute, keyed by user id or, for anonymous callers, by IP address (see the note on the IP below) |
| Version header | None (`X-GroupeZ-Api-Version` did not exist on v1) |
| CORS | `Access-Control-Allow-Origin: *` on `api/*` |
| Content type | `text/html; charset=UTF-8`, although the body is JSON (see the notes) |

## Endpoints

### GET /api/v1/author/\{id\}

Looks up a user by id with `User::findOrFail($id)` and returns three keys.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.authorshow` | None | `throttle:api` (60/min) |

The route name has no dot between `author` and `show`: the route group was named `author` and the route `show`, with no separator.

#### Path parameters

| Name | Type | Description |
| --- | --- | --- |
| `id` | integer | The user id of the author. No route model binding and no pattern constraint; the value is passed straight to `findOrFail`. |

#### Query / body parameters

None.

#### Responses

**200 OK**: the user exists.

The controller builds `{"id", "discord", "name"}` by hand. However, the `discord` column was dropped from the `users` table (migration `2021_10_10_203050_remove_discord_in_user`), and `$user->discord` then resolved to the `discord()` relation (`HasOne` `DiscordUser`). So `discord` is either `null` or the **whole `discord_users` row**, serialized with every column, because the `DiscordUser` model declares no `$hidden` attributes.

Author without a linked Discord account:

```json
{"id":42,"discord":null,"name":"Bobby"}
```

Author with a linked Discord account (placeholder values; keys in the column order of `discord_users`):

```json
{
  "id": 42,
  "discord": {
    "id": 7,
    "user_id": 42,
    "discord_id": "987654321098765432",
    "access_token": "<oauth access token>",
    "refresh_token": "<oauth refresh token>",
    "expired_at": "2021-10-17T19:31:03.000000Z",
    "username": "Bobby",
    "email": "bobby@example.com",
    "discriminator": "1234",
    "avatar": "<avatar hash>",
    "is_valid": 1,
    "created_at": "2021-10-10T19:31:03.000000Z",
    "updated_at": "2021-10-10T19:31:03.000000Z"
  },
  "name": "Bobby"
}
```

| Key | Type | Description |
| --- | --- | --- |
| `id` | integer | The user id. |
| `discord` | object \| null | The `discord_users` row linked to the user, or `null`. |
| `discord.discord_id` | string | The Discord user id (snowflake). This is the value plugins need to mention the seller. |
| `name` | string | The user's name. |

:::warning Data exposure on the legacy endpoint
Because the full `discord_users` row was serialized, this public, unauthenticated endpoint returned the linked Discord account's **OAuth `access_token` and `refresh_token`** and the Discord **email**. This is one of the reasons the v2 platform reduces `discord` to the snowflake string. Do not rely on, store or log these fields.
:::

**404 Not Found**: no user has this id. The `ModelNotFoundException` thrown by `findOrFail` goes through the default Laravel 8 exception handler (no customisation):

- With `Accept: application/json`:

  ```json
  {
    "message": "No query results for model [App\\Models\\User] 999"
  }
  ```

- Without it: the site's HTML 404 page (`resources/views/errors/404.blade.php`).

With `APP_DEBUG` enabled, the JSON body would also carry `exception`, `file`, `line` and `trace`.

**429 Too Many Requests**: the `api` limiter tripped. Laravel 8 default: `{"message": "Too Many Attempts."}` with `Accept: application/json`, an HTML error page otherwise, plus `Retry-After`, `X-RateLimit-Limit`, `X-RateLimit-Remaining` and `X-RateLimit-Reset` headers.

```json
{
  "message": "Too Many Attempts."
}
```

There is no validation and no authorization, so the endpoint never answers `401`, `403` or `422`.

#### Example

```bash
curl -s https://groupez.dev/api/v1/author/42 \
  -H "Accept: application/json"
```

#### Notes

- **`text/html` content type.** The controller returns `json_encode([...])`, a plain string, which Laravel sends with `Content-Type: text/html; charset=UTF-8`. Clients have to parse the body as JSON themselves. The encoding uses PHP defaults, so non-ASCII characters in `name` are escaped (`é` is sent as the six characters `\u00e9`) and slashes are escaped (`\/`).
- **Integer types.** Whether `id`, `discord.id`, `discord.user_id` and `discord.is_valid` come out as JSON numbers or strings depends on the PHP version and PDO driver the legacy server ran (strings with MySQL emulated prepares before PHP 8.1). Treat them leniently. `is_valid` has no cast, so it is `1`/`0`, not `true`/`false`.
- **Loose ids.** Because `{id}` has no constraint, a non-numeric value is passed to the database as is. A value that matches no row answers `404`. Mixed values such as `42abc` may be coerced to a number by MySQL; this was never tested.
- **No account status filter.** Banned or unverified users are returned like any other.
- **Which IP the limiter saw.** In the `api` middleware group, `throttle:api` is listed **before** `TrustCloudflare`, and the global `TrustProxies` middleware declares no trusted proxy. The limiter therefore keyed on `$request->ip()` before the `CF-Connecting-IP` header was trusted. If the legacy site sat behind Cloudflare, that IP was a Cloudflare edge address, so unrelated callers could share one 60/min bucket. How production was actually fronted is not visible in the code. The API routes carry no session or `auth` middleware, so the user-id branch of the key was never used in practice.

:::note Differences with v2
See [Authors (v2)](../v2/authors.md). On v2, `discord` is the snowflake string or `null`, the response is `application/json`, a 404 answers `{"message": "Not found."}`, a 429 answers `{"message": "Too many requests."}`, the limit is 120 requests per minute, and every response carries `X-GroupeZ-Api-Version: 1`.
:::
