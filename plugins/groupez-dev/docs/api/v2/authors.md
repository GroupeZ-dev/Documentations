---
title: Authors
---

# Authors

A single endpoint returns the public identity of a seller (an author of resources): their id, their Discord identifier and their display name. Plugins use it to show who wrote a resource or to mention the seller in a Discord channel.

<CalloutContainer type="info">

<CalloutTitle>Frozen contract</CalloutTitle>

<CalloutDescription>
This payload is a compatibility contract with plugins already deployed on Minecraft servers. It has exactly three keys, in this order, and will not gain new ones. The richer author data shown on the website (slug, avatar, bio, role) is **not** exposed here.
</CalloutDescription>

</CalloutContainer>

## Common behaviour

| Item | Value |
| --- | --- |
| Base URL | `https://groupez.dev/api/v1` |
| Authentication | None |
| Rate limit | `api` limiter: 120 requests per minute, keyed by the authenticated user id or else the IP address. The API carries no session or token, so in practice it is the IP (proxies are trusted, so this is the client IP from `X-Forwarded-For`) |
| Version header | Every response, including `404` and `429`, carries `X-GroupeZ-Api-Version: 1` |
| CORS | Paths `api/v1/*`, any origin (`*`), allowed methods `GET`, `HEAD`, `OPTIONS`, no credentials; `X-GroupeZ-Api-Version` is exposed to browsers |
| Envelope | None: the body is a bare JSON object, never wrapped in `{"data": ...}` |

## Endpoints

### GET /api/v1/author/\{user\}

Returns the author identified by their numeric user id.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.authors.show` | None | `throttle:api` (120/min) |

#### Path parameters

| Name | Type | Description |
| --- | --- | --- |
| `user` | integer | The user id of the author. Resolved by primary key (`id`), not by slug or Discord id. |

#### Query / body parameters

None.

#### Responses

**200 OK**: the author exists.

```json
{
  "id": 42,
  "discord": "987654321098765432",
  "name": "Bobby"
}
```

| Key | Type | Description |
| --- | --- | --- |
| `id` | integer | The user id (same value as the path parameter). |
| `discord` | string \| null | The Discord user id (snowflake) of the linked Discord account, as a string. `null` when the author never linked Discord. The key is always present. |
| `name` | string | The author's display name. |

An author without a linked Discord account:

```json
{
  "id": 42,
  "discord": null,
  "name": "Bobby"
}
```

**404 Not Found**: no user has this id (or the account was deleted).

```json
{
  "message": "Not found."
}
```

**429 Too Many Requests**: the `api` limiter tripped. The `Retry-After`, `X-RateLimit-Limit`, `X-RateLimit-Remaining` and `X-RateLimit-Reset` headers are forwarded when present.

```json
{
  "message": "Too many requests."
}
```

The endpoint has no validation and no authorization, so it never answers `401`, `403` or `422`.

#### Example

```bash
curl -s https://groupez.dev/api/v1/author/42 \
  -H "Accept: application/json"
```

#### Notes

- **Where `discord` comes from.** The legacy platform stored the Discord identifier on the user row. The current platform stores every linked identity (Discord, Google, etc.) in a separate social accounts table. The endpoint reads the account whose provider is `discord` and returns its provider id. A linked Google account never fills `discord`.
- **No personal or commercial data.** Email address, ban state, slug, avatar, role and payment (Stripe/PayPal) settings are never part of this payload.
- **Suspended sellers are still returned.** No account status is filtered: a banned author still answers `200`, because they still own the resources a plugin may ask about.
- **Deleted accounts answer `404`.** User accounts are soft-deleted. The route binding excludes deleted rows, so a deleted author is "not found".
- **Neutral 404.** The `404` body is always `{"message": "Not found."}`. It never names the internal model, so existence is the only thing a caller learns.
- **Non-numeric ids.** `{user}` has no pattern constraint, so any single segment reaches the lookup. A value that matches no id answers `404`. Mixed values such as `42abc` are compared by the database (MySQL in production), which may coerce them to a number. This case is not covered by tests, so always send a plain integer.

<CalloutContainer type="info">

<CalloutTitle>Differences from the legacy platform</CalloutTitle>

<CalloutDescription>
- Legacy `discord` was not this string in practice: once the Discord column was moved to its own table on the legacy platform, the endpoint returned a whole Discord account object (or `null`). See [v1 Authors](../v1/authors.md).
- Legacy responses were sent with a `text/html` content type. The current platform answers `application/json`.
- Legacy 404s exposed the internal model name. The current platform answers `{"message": "Not found."}`.
- The rate limit went from 60 to 120 requests per minute.
- The route name changed from `api.v1.authorshow` to `api.v1.authors.show`. The URI did not change.
</CalloutDescription>

</CalloutContainer>
