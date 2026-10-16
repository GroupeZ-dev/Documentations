---
sidebar_position: 3
title: Resources
---

# Resources

The resource endpoints expose the groupez.dev catalogue to plugins and tools: a paginated listing, a single resource, its released versions and its current version number. A fifth endpoint, `GET /resource/user`, sits under the same prefix for historical reasons but lists **user names**, not resources.

:::info Frozen contract
These payloads are a compatibility contract with plugins already deployed on Minecraft servers. The v2 platform renamed most of the underlying database columns, but **none of those renames reach the wire**: every key keeps its legacy (v1) spelling, even where it looks wrong (`tag` is a tagline, `download` is a counter, `logo` is an icon, `plugin_id` is a resource id). New fields are only ever **appended** after the frozen keys, never inserted among them.
:::

For the legacy behaviour of the same URIs, see the [v1 resources page](../v1/resources.md).

## Common behaviour

| Item | Value |
| --- | --- |
| Base URL | `https://groupez.dev/api/v1` |
| Authentication | None. No token, session or cookie is read, and none is ever set. |
| Rate limit | `throttle:api`: 120 requests per minute, keyed by IP address. `search` additionally carries `throttle:search` (60/min). |
| Version header | Every response, including `404`, `422` and `429`, carries `X-GroupeZ-Api-Version: 1`. |
| CORS | `Access-Control-Allow-Origin: *` for `GET`, `HEAD`, `OPTIONS`; `X-GroupeZ-Api-Version` is exposed to browsers. |
| Envelope | None. Bodies are bare JSON objects or arrays, never wrapped in `{"data": ...}` (the search paginator's own `data` key is part of the paginator, see below). |
| Errors | Always JSON on `/api/*`, whatever the `Accept` header says. |
| JSON encoding | Bodies are encoded with PHP's default `json_encode` flags: forward slashes are escaped (`"https:\/\/groupez.dev\/..."`) and non-ASCII characters arrive as `\uXXXX` escapes. Any JSON parser decodes both; the examples below show the decoded form. |

### Which resources are visible

The `{resource}` path parameter is a numeric resource id, resolved by an application-wide route binder:

- **Published** and **Unlisted** resources resolve.
- **Draft**, **Pending** and **Rejected** resources, soft-deleted resources, and ids that do not exist, answer `404`. Never `403`: the API does not reveal that a hidden resource exists.
- The API carries no session, so callers are always treated as the anonymous public. An author cannot see their own draft through the API.

The search listing is stricter: it only lists **Published** resources. Unlisted resources can be fetched by id but never appear in `search`.

### Common error responses

**404 Not Found**: unknown or non-public resource. The body is always this single neutral message, never Laravel's `No query results for model [...]`:

```json
{
  "message": "Not found."
}
```

**429 Too Many Requests**: rate limit exceeded. The body is fixed. `Retry-After`, `X-RateLimit-Limit`, `X-RateLimit-Remaining` and `X-RateLimit-Reset` headers are forwarded when the limiter sets them.

```json
{
  "message": "Too many requests."
}
```

**405 Method Not Allowed**: every route on this page is `GET` only. For example `POST /api/v1/resource/search` answers `405`.

### Route declaration order

The literal sub-routes `search`, `user`, `versions/...` and `version/...` are declared **before** `/resource/{resource}`. The router does not know that a resource id is numeric on the API (the `[0-9]+` pattern of the website routes does not apply to `routes/api.php`), so this order is the only thing that stops `/resource/search` from being treated as a lookup of a resource whose id is the word `search`. An id that is not one of those four literals and matches no resource answers `404`.

:::warning Loosely compared ids
The binder passes the raw segment to `WHERE id = ?` as a string. On MySQL (the production database), a string is compared to the integer column numerically, so a segment such as `42abc` may resolve resource `42` instead of answering `404`. This comes from reading the code, not from a test: always send a plain integer.
:::

## Endpoints

### GET /api/v1/resource/search

Returns one page of the published catalogue, as a plain Laravel paginator.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.resources.search` | None | `throttle:api` (120/min) **and** `throttle:search` (60/min), both keyed by IP |

#### Path parameters

None.

#### Query parameters

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `size` | integer | No | `15` | Rows per page. Clamped to the range `1`–`25`, **never refused**: `size=500` gives 25 rows, and `size=abc`, `size=0` or `size=-4` give 1 row (so does an empty `size=`). |
| `page` | integer | No | `1` | Page number (standard Laravel paginator parameter). |
| `q` | string | No | none | **v2 addition.** Filters on the resource `name` **or** tagline (`tag` on the wire), with a `LIKE %q%` match (case sensitivity follows the database collation). Truncated to 80 characters, never refused. Wildcards typed into it (`%`, `_`) are not escaped and only widen the match. Must be a scalar: `q[]=x` reaches a string cast and, from reading the code, ends in a `500`. |

#### Responses

**200 OK**: the paginator envelope, with every key at the **top level** (`total`, `per_page`, `current_page` are not nested under `meta`). Each row in `data` is the exact same object as [`GET /api/v1/resource/{resource}`](#get-apiv1resourceresource).

```json
{
  "current_page": 1,
  "data": [
    {
      "id": 42,
      "user_id": 7,
      "name": "zEssentials",
      "tag": "The essentials plugin your server deserves",
      "price": 4.99,
      "category_id": 3,
      "unique_id": "GROUPEZ_0123456789abcde",
      "version_id": 318,
      "download": 1234,
      "purchases": 56,
      "logo": "https://groupez.dev/storage/images/resources/icons/42.webp",
      "version": {
        "id": 318,
        "plugin_id": 42,
        "version": "1.4.2",
        "title": "Spawner support",
        "download": 87,
        "created_at": "2026-08-12T09:30:00.000000Z"
      },
      "created_at": "2021-05-09T18:39:39.000000Z",
      "updated_at": "2026-08-12T09:30:00.000000Z",
      "slug": "zessentials",
      "rating_avg": 4.5,
      "reviews_count": 12
    }
  ],
  "first_page_url": "https://groupez.dev/api/v1/resource/search?page=1",
  "from": 1,
  "last_page": 4,
  "last_page_url": "https://groupez.dev/api/v1/resource/search?page=4",
  "links": [
    { "url": null, "label": "&laquo; Previous", "page": null, "active": false },
    { "url": "https://groupez.dev/api/v1/resource/search?page=1", "label": "1", "page": 1, "active": true },
    { "url": "https://groupez.dev/api/v1/resource/search?page=2", "label": "2", "page": 2, "active": false },
    { "url": "https://groupez.dev/api/v1/resource/search?page=3", "label": "3", "page": 3, "active": false },
    { "url": "https://groupez.dev/api/v1/resource/search?page=4", "label": "4", "page": 4, "active": false },
    { "url": "https://groupez.dev/api/v1/resource/search?page=2", "label": "Next &raquo;", "page": 2, "active": false }
  ],
  "next_page_url": "https://groupez.dev/api/v1/resource/search?page=2",
  "path": "https://groupez.dev/api/v1/resource/search",
  "per_page": 15,
  "prev_page_url": null,
  "to": 15,
  "total": 52
}
```

The envelope keys (`current_page`, `data`, `first_page_url`, `from`, `last_page`, `last_page_url`, `links`, `next_page_url`, `path`, `per_page`, `prev_page_url`, `to`, `total`) are produced by Laravel's `LengthAwarePaginator::toArray()`, not by GroupeZ code. Only `data`, `total`, `per_page` and `current_page` are pinned by the test suite. Each `links` entry is built by the framework: on the Laravel release v2 runs, it carries `url`, `label` (a string), `page` (an integer, or `null` on a disabled previous/next link) and `active`. v1 entries had no `page` key. Long page ranges are shortened with a `{"url": null, "label": "...", "active": false}` separator entry.

An empty result is still `200`, with `"data": []`, `"total": 0` and `from` / `to` set to `null`.

**429 Too Many Requests**: see [Common error responses](#common-error-responses). Exhausting the `search` limiter does not block the other resource routes, which only carry `throttle:api`.

#### Example

```bash
curl "https://groupez.dev/api/v1/resource/search?size=25&page=2"

# v2 only: filter by name or tagline
curl "https://groupez.dev/api/v1/resource/search?q=economy"
```

#### Notes

- **Order**: ascending resource `id`. A newly published resource lands on the last page, so pages already walked do not shift.
- **Pagination URLs drop your query string**: `next_page_url`, `prev_page_url` and the `links` URLs only carry `?page=N`. If you sent `size` or `q`, add them again yourself when following those URLs, otherwise you fall back to the default page size and an unfiltered listing.
- **Only Published resources** are listed. Unlisted, Draft, Pending and Rejected resources never appear.
- Despite its name and its dedicated limiter, this endpoint does **not** use the Meilisearch engine of the website search: `q` is a database `LIKE` filter on two columns.
- `size` is never validated: anything that does not read as an integer in `1`–`25` is clamped, so the endpoint never answers `422`.

---

### GET /api/v1/resource/user

Lists the **user names** that start with a given prefix. The name of the route is a misnomer inherited from v1: it was the author/buyer picker of the old front end and has never returned resources.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.resources.user` | None | `throttle:api` (120/min per IP) |

#### Path parameters

None.

#### Query parameters

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | **Yes** | The prefix to match. Rules: `required`, `string`, `max:255`. Surrounding whitespace is stripped by the framework's global `TrimStrings` middleware, and an empty or blank value (`name=`) is converted to `null` and fails `required`. |

#### Responses

**200 OK**: a bare array of objects with a single `name` key. At most **10** rows, sorted by `name` ascending.

```json
[
  { "name": "Bobbie" },
  { "name": "Bobby" }
]
```

No match gives an empty array, not a `404`:

```json
[]
```

**422 Unprocessable Entity**: `name` missing, empty, not a string (for example `name[]=Bobby`) or longer than 255 characters. Standard Laravel validation body, for example:

```json
{
  "message": "The name field is required.",
  "errors": {
    "name": [
      "The name field is required."
    ]
  }
}
```

Other messages you can receive in the same shape: `The name field must be a string.` and `The name field must not be greater than 255 characters.`

**429 Too Many Requests**: see [Common error responses](#common-error-responses).

#### Example

```bash
curl "https://groupez.dev/api/v1/resource/user?name=Bob"
```

#### Notes

- It is a **prefix** match (`LIKE 'Bob%'`), not a substring match: `LittleBobby` does not match `Bob`. Case sensitivity depends on the database collation.
- The value is bound, so nothing is injected, but `%` and `_` keep their `LIKE` meaning: `name=%` matches every user, and still returns at most 10 names.
- The payload is only `name`: no id, e-mail, avatar or role. Users are not filtered by role, so any account can be returned, not only authors. Soft-deleted accounts are excluded.
- **Difference with v1**: v1 returned every match, unsorted. v2 caps the list at 10 and sorts it.

---

### GET /api/v1/resource/versions/\{resource\}

Returns every version a resource has released, as a bare array, oldest first. Deployed updaters walk this list to find the build they should download.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.resources.versions` | None | `throttle:api` (120/min per IP) |

#### Path parameters

| Name | Type | Description |
| --- | --- | --- |
| `resource` | integer | Resource id. Must be a Published or Unlisted resource, otherwise `404`. |

#### Query parameters

None.

#### Responses

**200 OK**: a bare array (no `data` wrapper). Each row has exactly these six keys, in this order:

| Key | Type | Source | Description |
| --- | --- | --- | --- |
| `id` | integer | `resource_versions.id` | Version id. |
| `plugin_id` | integer | `resource_versions.resource_id` | The **resource** id, under its v1 name. |
| `version` | string | `resource_versions.number` | Version number, for example `1.4.2` (max 32 characters). |
| `title` | string | `resource_versions.title` | Release title. |
| `download` | integer | `resource_versions.downloads_count` | Download counter of this version (singular key, but a counter). |
| `created_at` | string | `resource_versions.created_at` | ISO 8601 UTC with microseconds, for example `2026-08-12T09:30:00.000000Z`. |

```json
[
  {
    "id": 301,
    "plugin_id": 42,
    "version": "1.0.0",
    "title": "Initial release",
    "download": 512,
    "created_at": "2025-03-01T10:00:00.000000Z"
  },
  {
    "id": 318,
    "plugin_id": 42,
    "version": "1.4.2",
    "title": "Spawner support",
    "download": 87,
    "created_at": "2026-08-12T09:30:00.000000Z"
  }
]
```

A resource with no released version answers `200` with an empty array, not a `404`:

```json
[]
```

**404 Not Found**: unknown id, or a Draft, Pending or Rejected resource. Body: `{"message": "Not found."}`.

**429 Too Many Requests**: see [Common error responses](#common-error-responses).

#### Example

```bash
curl "https://groupez.dev/api/v1/resource/versions/42"
```

#### Notes

- **Order**: ascending version `id`, so the oldest release comes first and the newest last. Read the list from the end to find the latest build. This is not necessarily the same as the resource's *current* version (see [`version/{resource}`](#get-apiv1resourceversionresource)): an author can upload a build without promoting it.
- **No other keys**: `changelog`, `file_size`, `checksum`, `released_at`, the file name and the file path are deliberately absent. The list never exposes download URLs.
- **Difference with v1**: v1 serialised the whole `versions` row, including `description` (the changelog), `extension`, `file` and `updated_at`, with keys in a different order. See the [v1 page](../v1/resources.md#get-apiv1resourceversionsresource).
- `versions` (plural) and `version` (singular) are two different endpoints, one letter apart, with completely different response formats.

---

### GET /api/v1/resource/version/\{resource\}

Returns the **current version number** of a resource as a **plain-text** body. Plugins call it to check whether an update is available.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.resources.version.current` | None | `throttle:api` (120/min per IP) |

#### Path parameters

| Name | Type | Description |
| --- | --- | --- |
| `resource` | integer | Resource id. Must be a Published or Unlisted resource, otherwise `404`. |

#### Query parameters

None.

#### Responses

**200 OK**: `Content-Type: text/plain; charset=UTF-8`. The body is the raw version number, with no quotes, no JSON and no trailing newline:

```text
1.4.2
```

A resource that has not released any version yet answers `200` with the literal placeholder, parentheses included:

```text
(soon)
```

**404 Not Found**: unknown id, or a Draft, Pending or Rejected resource. Unlike the success case, this answer **is JSON**: `{"message": "Not found."}`.

**429 Too Many Requests**: JSON, see [Common error responses](#common-error-responses).

#### Example

```bash
curl "https://groupez.dev/api/v1/resource/version/42"
# 1.4.2
```

#### Notes

- **Not JSON.** Read the body as a string and compare it directly. Do not JSON-decode it: `1.4.2` is not valid JSON, and a JSON-encoded `"1.4.2"` would never match a version string.
- The number is the resource's **current version pointer** (`resources.current_version_id`), not the newest row of `versions/{resource}`. An uploaded but unpromoted build is not returned here.
- Treat `(soon)` as "nothing to download yet", not as an error.
- Errors are JSON while success is plain text: check the status code before using the body.
- **Difference with v1**: v1 returned the same body but labelled it `text/html`. v2 explicitly sends `text/plain; charset=UTF-8`.

---

### GET /api/v1/resource/\{resource\}

Returns a single resource, with its current version nested.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.resources.show` | None | `throttle:api` (120/min per IP) |

#### Path parameters

| Name | Type | Description |
| --- | --- | --- |
| `resource` | integer | Resource id. Published and Unlisted resources resolve, everything else answers `404`. |

#### Query parameters

None.

#### Responses

**200 OK**: a bare JSON object (no `data` wrapper). The keys always appear in this order and are always present (nullable ones are `null`, never missing):

| Key | Type | Source (v2) | Description |
| --- | --- | --- | --- |
| `id` | integer | `resources.id` | Resource id. |
| `user_id` | integer | `resources.user_id` | Author's user id (usable with the [authors endpoint](./authors.md)). |
| `name` | string | `resources.name` | Display name. |
| `tag` | string | `resources.tagline` | Short tagline (max 160 characters). |
| `price` | integer or float | `resources.price_cents / 100` | Price in **euros** (major units). An exact amount is an integer (`5`), otherwise a float (`4.99`). `0` for a free resource. |
| `category_id` | integer | `resources.category_id` | Category id. |
| `unique_id` | string or null | `resources.legacy_unique_id` | The legacy `GROUPEZ_...` identifier that premium plugins embed (`GROUPEZ_` followed by 15 hexadecimal characters on v1). Only resources imported from v1 carry one: v2 never generates it, so it is `null` for every resource created on v2. |
| `version_id` | integer or null | `resources.current_version_id` | Id of the current version, `null` if none. |
| `download` | integer | `resources.downloads_count` | Total download counter of the resource. |
| `purchases` | integer | resource accesses | Number of **purchases that still stand**: accesses whose source is a purchase and that were not revoked (refunds revoke the access). Manual grants and gift-code grants are not counted. Always present, `0` for a free resource. |
| `logo` | string or null | `resources.icon_path` | Absolute URL of the resource icon, under `https://groupez.dev/storage/images/...`. `null` when the resource has no icon. |
| `version` | object or null | current version | The current version, with the same six keys as [`versions/{resource}`](#get-apiv1resourceversionsresource). `null` when nothing has been released. |
| `created_at` | string | `resources.created_at` | ISO 8601 UTC, for example `2021-05-09T18:39:39.000000Z`. |
| `updated_at` | string | `resources.updated_at` | ISO 8601 UTC. |
| `slug` | string | `resources.slug` | **v2 addition.** URL slug of the resource page. |
| `rating_avg` | number | `resources.rating_avg` | **v2 addition.** Average review rating, from published reviews only (`0` when there are none). |
| `reviews_count` | integer | `resources.reviews_count` | **v2 addition.** Number of **published** reviews (the same set `rating_avg` averages). |

```json
{
  "id": 42,
  "user_id": 7,
  "name": "zEssentials",
  "tag": "The essentials plugin your server deserves",
  "price": 4.99,
  "category_id": 3,
  "unique_id": "GROUPEZ_0123456789abcde",
  "version_id": 318,
  "download": 1234,
  "purchases": 56,
  "logo": "https://groupez.dev/storage/images/resources/icons/42.webp",
  "version": {
    "id": 318,
    "plugin_id": 42,
    "version": "1.4.2",
    "title": "Spawner support",
    "download": 87,
    "created_at": "2026-08-12T09:30:00.000000Z"
  },
  "created_at": "2021-05-09T18:39:39.000000Z",
  "updated_at": "2026-08-12T09:30:00.000000Z",
  "slug": "zessentials",
  "rating_avg": 4.5,
  "reviews_count": 12
}
```

A resource with no released version:

```json
{
  "id": 43,
  "user_id": 7,
  "name": "zUpcoming",
  "tag": "Coming soon",
  "price": 0,
  "category_id": 3,
  "unique_id": null,
  "version_id": null,
  "download": 0,
  "purchases": 0,
  "logo": null,
  "version": null,
  "created_at": "2026-10-01T12:00:00.000000Z",
  "updated_at": "2026-10-01T12:00:00.000000Z",
  "slug": "zupcoming",
  "rating_avg": 0,
  "reviews_count": 0
}
```

**404 Not Found**: unknown id, a non-numeric id that is not one of the literal sub-routes, or a Draft, Pending or Rejected resource. Body: `{"message": "Not found."}`.

**429 Too Many Requests**: see [Common error responses](#common-error-responses).

#### Example

```bash
curl "https://groupez.dev/api/v1/resource/42"
```

#### Notes

- Icons uploaded on v2 are stored as `resources/icons/{id}.webp` (128x128 WebP), but icons imported from v1 may use another path. The path layout is not part of the contract: use `logo` as an opaque URL.
- `price` is the only amount on the whole platform expressed in major units rather than cents, because v1 stored whole euros and deployed clients do not divide.
- `rating_avg` is stored as a decimal and cast to a number, so it can be an integer-looking value such as `0` or `4` as well as `4.5`. Do not rely on it always being a float literal.
- **Differences with v1**:
  - v1 serialised the whole `plugins` row: `description`, `image`, `file`, `is_display`, `deleted`, `is_pending`, `is_unique` and other internal columns are gone in v2.
  - v1 only included `purchases` for paid resources (and counted paid payments). v2 always includes it.
  - v1's `download` was the sum of the version counters; v2 uses the resource's own counter.
  - v1 always built a `logo` URL, even when no image existed. v2 sends `null` instead.
  - v1's nested `version` was the full `versions` row; v2 sends the six-key version object.
  - `slug`, `rating_avg` and `reviews_count` do not exist in v1.
