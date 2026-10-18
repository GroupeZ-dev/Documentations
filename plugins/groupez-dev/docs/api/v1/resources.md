---
title: Resources
---

# Resources

<CalloutContainer type="warning">

<CalloutTitle>Legacy platform</CalloutTitle>

<CalloutDescription>
This page documents the **legacy v1 platform** of groupez.dev (Laravel 8). It is kept for reference and for plugins that were built against it. groupez.dev now runs on v2, which serves the same URIs with a cleaned-up payload: see the [v2 resources page](../v2/resources.md).
</CalloutDescription>

</CalloutContainer>

The resource endpoints expose the catalogue: a paginated listing, a single resource, its versions and its current version number. A fifth endpoint, `GET /resource/user`, sits under the same prefix but lists **user names**, not resources.

## Common behaviour

| Item | Value |
| --- | --- |
| Base URL | `https://groupez.dev/api/v1` |
| Authentication | None |
| Rate limit | `throttle:api`: 60 requests per minute, keyed by the authenticated user id or, since the API carries no session, by `$request->ip()`. |
| CORS | `api/*` open to every origin and every method (`fruitcake/laravel-cors`). |
| Version header | None. v1 does not send `X-GroupeZ-Api-Version`. |

<CalloutContainer type="warning">

<CalloutTitle>Which IP the limiter sees</CalloutTitle>

<CalloutDescription>
In the v1 `api` middleware group, `throttle:api` runs **before** `TrustCloudflare` (the group is `throttle:api`, `SubstituteBindings`, `TrustCloudflare`, and no trusted proxy is configured for the global `TrustProxies`). When the limiter computes its key, `CF-Connecting-IP` has not been applied yet, so the key is the address PHP sees as `REMOTE_ADDR`. Behind Cloudflare that is a Cloudflare edge address, shared by many callers, unless the web server rewrites `REMOTE_ADDR` itself. This is derived from the code; the production web server configuration was not checked.
</CalloutDescription>

</CalloutContainer>

### Responses are JSON strings served as `text/html`

Every controller on this page builds its body with `json_encode(...)` and returns the resulting **string**. Laravel wraps a returned string in a plain response, so:

- The `Content-Type` is `text/html; charset=UTF-8`, even though the body is JSON. Parse the body as JSON regardless of the header.
- `json_encode` is called without flags, so forward slashes are escaped: URLs arrive as `"https:\/\/groupez.dev\/storage\/images\/42.png"`. Non-ASCII characters are escaped too (`\u00e9` for `é`). Any JSON parser decodes both. The examples below show the decoded form for readability.

### Payloads are raw database rows

v1 has no API resource classes and the `Plugin` and `Version` models declare no `$hidden` attributes. The JSON is the Eloquent model serialised as is, so **every column of the row** is exposed, including internal ones (`description`, `file`, `is_display`, `deleted`, `is_pending`, `is_unique`, ...).

<CalloutContainer type="info">

<CalloutTitle>Column list derived from migrations</CalloutTitle>

<CalloutDescription>
The key lists on this page are reconstructed from the v1 migrations (`database/migrations/2020_11_28_*` to `2021_07_16_*`) in the order MySQL would hold the columns after those migrations ran. If the production schema was altered by hand, the actual key set or order may differ. Numeric types also depend on the PDO driver: some numeric values may arrive as strings (see the notes of each endpoint).
</CalloutDescription>

</CalloutContainer>

### Visibility

v1 applies **no visibility filter** on these endpoints. Deleted (`deleted = 1`), pending (`is_pending = 1`) and hidden (`is_display = 0`) plugins are returned by id and are listed by `search` exactly like approved ones.

### Common error responses

Error rendering is Laravel 8's default, and it depends on whether the request "expects JSON" (`Accept: application/json`, or an AJAX request sent with `X-Requested-With: XMLHttpRequest`):

**404 Not Found**: unknown resource id. With `Accept: application/json`, Laravel's own message, which names the model:

```json
{
  "message": "No query results for model [App\\Models\\Plugin] 999999"
}
```

Without `Accept: application/json`, the body is the site's HTML 404 page.

**429 Too Many Requests**: more than 60 requests in a minute. With `Accept: application/json`:

```json
{
  "message": "Too Many Attempts."
}
```

Without it, an HTML error page. The `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `Retry-After` and `X-RateLimit-Reset` headers are set by the framework's throttle middleware (the first two on every response, the last two on the `429`).

### Route declaration order

Inside the `/resource` group, the literal routes (`user`, `search`, `versions/...`, `version/...`) are declared before `/resource/{resource}`, so they are reached correctly.


<CalloutContainer type="info">

<CalloutTitle>Loosely compared ids</CalloutTitle>

<CalloutDescription>
`findOrFail()` and the implicit binding pass the raw segment to `WHERE id = ?` as a string. MySQL compares it to the integer column numerically, so a segment such as `42abc` may resolve plugin `42` instead of answering `404`. Derived from the code, not tested.
</CalloutDescription>

</CalloutContainer>

## Endpoints

### GET /api/v1/resource/search

Returns one page of the catalogue, as a serialised Laravel paginator.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.resourcesearch` | None | `throttle:api` (60/min) |

<CalloutContainer type="info">

<CalloutTitle>Route names</CalloutTitle>

<CalloutDescription>
The v1 resource routes are named without a dot between the group and the route (`api.v1.resourcesearch`, `api.v1.resourceshow`, ...) because the group was declared with `->name('resource')` instead of `->name('resource.')`. v2 fixed this (`api.v1.resources.search`). Route names only matter inside the Laravel application, not to API callers.
</CalloutDescription>

</CalloutContainer>

#### Path parameters

None.

#### Query parameters

| Name | Type | Required | Default | Description |
| --- | --- | --- | --- | --- |
| `size` | integer | No | `15` | Rows per page, capped at `25`. Not validated, see the notes. |
| `page` | integer | No | `1` | Page number (standard Laravel paginator parameter). |

There is no search term: despite its name, this endpoint lists the whole `plugins` table, unfiltered.

#### Responses

**200 OK**: the paginator envelope, keys at the top level. Each row in `data` is a **raw `plugins` row**: it does **not** contain the `download`, `purchases`, `logo` and `version` keys that [`GET /api/v1/resource/{resource}`](#get-apiv1resourceresource) adds.

```json
{
  "current_page": 1,
  "data": [
    {
      "id": 42,
      "name": "zEssentials",
      "price": 5,
      "image": "png",
      "description": "Full description of the resource (Markdown)...",
      "created_at": "2021-05-09T18:39:39.000000Z",
      "updated_at": "2023-02-14T09:12:00.000000Z",
      "tag": "The essentials plugin your server deserves",
      "user_id": 7,
      "is_display": 1,
      "file": "zEssentials",
      "version_id": 318,
      "deleted": 0,
      "category_id": 3,
      "is_pending": 0,
      "unique_id": "GROUPEZ_0123456789abcde",
      "is_unique": 0
    }
  ],
  "first_page_url": "https://groupez.dev/api/v1/resource/search?page=1",
  "from": 1,
  "last_page": 4,
  "last_page_url": "https://groupez.dev/api/v1/resource/search?page=4",
  "links": [
    { "url": null, "label": "&laquo; Previous", "active": false },
    { "url": "https://groupez.dev/api/v1/resource/search?page=1", "label": 1, "active": true },
    { "url": "https://groupez.dev/api/v1/resource/search?page=2", "label": 2, "active": false },
    { "url": "https://groupez.dev/api/v1/resource/search?page=3", "label": 3, "active": false },
    { "url": "https://groupez.dev/api/v1/resource/search?page=4", "label": 4, "active": false },
    { "url": "https://groupez.dev/api/v1/resource/search?page=2", "label": "Next &raquo;", "active": false }
  ],
  "next_page_url": "https://groupez.dev/api/v1/resource/search?page=2",
  "path": "https://groupez.dev/api/v1/resource/search",
  "per_page": 15,
  "prev_page_url": null,
  "to": 15,
  "total": 52
}
```

In Laravel 8.26 (the version v1 runs), a page entry of `links` carries its `label` as an **integer** (`1`, not `"1"`), and no entry has a `page` key. The previous/next labels are the English translation strings (`&laquo; Previous`, `Next &raquo;`), as the API runs in the `en` locale.

Field meaning for a `plugins` row:

| Key | Description |
| --- | --- |
| `id` | Resource id. |
| `name` | Display name. |
| `price` | Price in whole **euros** (integer column). `0` means free. |
| `image` | **File extension** of the logo (for example `png`), not a URL. The logo URL is `https://groupez.dev/storage/images/{id}.{image}`. |
| `description` | Full resource description. |
| `created_at`, `updated_at` | ISO 8601 UTC with microseconds. |
| `tag` | Short tagline. Nullable. |
| `user_id` | Author's user id. |
| `is_display` | Visibility flag (`1` visible, `0` hidden). |
| `file` | Internal file name. Nullable. |
| `version_id` | Current version id, `-1` when no version was ever set. |
| `deleted` | Soft-delete flag. |
| `category_id` | Category id. |
| `is_pending` | Moderation flag (`1` awaiting approval). |
| `unique_id` | The `GROUPEZ_...` identifier used by premium plugins. Nullable. |
| `is_unique` | `1` if the resource can only be sold once. |

Boolean columns are `tinyint` in MySQL and are not cast by the model, so they come out as `0` / `1`, not `true` / `false`.

**429 Too Many Requests**: see [Common error responses](#common-error-responses).

#### Example

```bash
curl -H "Accept: application/json" "https://groupez.dev/api/v1/resource/search?size=25&page=2"
```

#### Notes

- **No ordering**: the query has no `ORDER BY`, so the row order is whatever the database returns (in practice usually by id, but not guaranteed).
- **No filtering**: deleted, pending and hidden plugins are included.
- **Pagination URLs drop `size`**: `next_page_url` and the `links` URLs only carry `?page=N`. Add `size` again when following them.
- **`size` handling** (derived from the code, `$size > 25 ? 25 : $size` on the raw query-string value, not verified against production):
  - missing: `15`;
  - above 25: `25`;
  - `0`: falls back to the model default, `15`;
  - a non-numeric string such as `abc`: PHP 8 compares it to `25` as a string, which is greater, so you get `25`;
  - a negative value: Laravel ignores a negative `LIMIT`, so the page may contain every row while `per_page` echoes the negative value (as a string, for example `"-4"`) and `last_page` is `1`.
  - **`per_page` type**: the paginator keeps the value it was given, so `per_page` is the integer `15` when `size` is missing or `0`, the integer `25` when it is capped, but the **string** sent by the caller otherwise (`size=10` gives `"per_page": "10"`). Parse it as a number.
- **Differences with v2**: v2 lists only published resources, orders them by id, adds an optional `q` filter, clamps `size` to `1`–`25`, and serves each row as the full resource object (same as the single-resource endpoint) instead of a raw row.

---

### GET /api/v1/resource/user

Lists the **user names** that start with a given prefix. It was the user picker of the old front end and has never returned resources.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.resourceuser` | None | `throttle:api` (60/min) |

#### Path parameters

None.

#### Query parameters

| Name | Type | Required | Description |
| --- | --- | --- | --- |
| `name` | string | **Yes** | Prefix to match. Single rule: `required`. Trimmed by the global `TrimStrings` middleware, and an empty value becomes `null` and fails validation. |

#### Responses

**200 OK**: a JSON array of objects with a single `name` key. **Every** matching user is returned, with no limit and no ordering.

```json
[
  { "name": "Bobby" },
  { "name": "Bobbie" }
]
```

No match:

```json
[]
```

**422 Unprocessable Entity**: `name` missing or empty, **only when the request sends `Accept: application/json`**:

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "name": [
      "The name field is required."
    ]
  }
}
```

Without `Accept: application/json`, a failed validation is answered with a **`302` redirect** to the previous URL (the `Referer`, or the home page), as for a web form.

**429 Too Many Requests**: see [Common error responses](#common-error-responses).

#### Example

```bash
curl -H "Accept: application/json" "https://groupez.dev/api/v1/resource/user?name=Bob"
```

#### Notes

- Prefix match: `User::select('name')->where('name', 'like', $name.'%')`. `%` and `_` keep their `LIKE` meaning, so `name=%` returns the name of every user.
- `name` is only checked with `required`: an array (`name[]=Bob`) passes validation and then hits an array-to-string conversion, which, from reading the code, ends in a `500`.
- The `User` model hides `password`, `sk_live` and `remember_token`, but only `name` is selected anyway.
- The `422` message above is Laravel 8's default top-level message (`The given data was invalid.`); v2 runs on a newer Laravel and its top-level message repeats the first error instead.
- **Differences with v2**: v2 caps the answer at 10 names sorted alphabetically, adds `string` and `max:255` rules, and always answers JSON errors.

---

### GET /api/v1/resource/versions/\{resource\}

Returns every version of a resource, as a JSON array of raw `versions` rows.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.resourceversion` | None | `throttle:api` (60/min) |

#### Path parameters

| Name | Type | Description |
| --- | --- | --- |
| `resource` | integer | Plugin id, resolved with `Plugin::findOrFail()`. Any existing plugin resolves, whatever its status. |

#### Query parameters

None.

#### Responses

**200 OK**: a JSON array. Each row is the full `versions` row:

| Key | Description |
| --- | --- |
| `id` | Version id. |
| `version` | Version number string, for example `1.4.2`. |
| `plugin_id` | The resource (plugin) id. |
| `download` | Download counter of this version. |
| `title` | Release title. |
| `extension` | File extension of the build (for example `jar`). |
| `description` | Changelog of the release. |
| `created_at`, `updated_at` | ISO 8601 UTC with microseconds. |
| `file` | Internal file name. Nullable. |

```json
[
  {
    "id": 301,
    "version": "1.0.0",
    "plugin_id": 42,
    "download": 512,
    "title": "Initial release",
    "extension": "jar",
    "description": "First public release.",
    "created_at": "2021-05-09T18:39:39.000000Z",
    "updated_at": "2021-05-09T18:39:39.000000Z",
    "file": "zEssentials"
  },
  {
    "id": 318,
    "version": "1.4.2",
    "plugin_id": 42,
    "download": 87,
    "title": "Spawner support",
    "extension": "jar",
    "description": "Adds spawner support.",
    "created_at": "2023-02-14T09:12:00.000000Z",
    "updated_at": "2023-02-14T09:12:00.000000Z",
    "file": "zEssentials"
  }
]
```

A plugin with no version answers `200` with `[]`.

**404 Not Found**: unknown id. See [Common error responses](#common-error-responses).

**429 Too Many Requests**: see [Common error responses](#common-error-responses).

#### Example

```bash
curl -H "Accept: application/json" "https://groupez.dev/api/v1/resource/versions/42"
```

#### Notes

- **No explicit ordering**: the list is `$plugin->versions` (a `hasMany` relation with no `orderBy`), so rows come back in database order, in practice usually ascending id.
- **Differences with v2**: v2 returns only six keys (`id`, `plugin_id`, `version`, `title`, `download`, `created_at`), in a different order; `extension`, `description`, `updated_at` and `file` are dropped. v2 also hides versions of draft, pending and rejected resources (`404`).

---

### GET /api/v1/resource/version/\{resource\}

Returns the **current version number** of a resource as a bare string. Plugins call it to check for updates.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.resourceversion.current` | None | `throttle:api` (60/min) |

#### Path parameters

| Name | Type | Description |
| --- | --- | --- |
| `resource` | integer | Plugin id, resolved by implicit route model binding (`Plugin $resource`). Any existing plugin resolves. |

#### Query parameters

None.

#### Responses

**200 OK**: the raw version number, no quotes, no JSON. The header is `Content-Type: text/html; charset=UTF-8`.

```text
1.4.2
```

When the plugin's `version_id` does not point to an existing version (for example the default `-1`), the body is the placeholder:

```text
(soon)
```

**404 Not Found**: unknown id. See [Common error responses](#common-error-responses): without `Accept: application/json` the body is an HTML page.

**429 Too Many Requests**: see [Common error responses](#common-error-responses).

#### Example

```bash
curl "https://groupez.dev/api/v1/resource/version/42"
# 1.4.2
```

#### Notes

- The value is the version pointed to by `plugins.version_id`, which is not necessarily the newest row of [`versions/{resource}`](#get-apiv1resourceversionsresource).
- `versions` (plural) and `version` (singular) are two different endpoints with different formats.
- **Differences with v2**: same body and same `(soon)` placeholder, but v2 sends `Content-Type: text/plain; charset=UTF-8`, answers `404` as JSON, and hides draft, pending and rejected resources.

---

### GET /api/v1/resource/\{resource\}

Returns a single resource: its `plugins` row plus four computed keys.

| Route name | Auth | Rate limit |
| --- | --- | --- |
| `api.v1.resourceshow` | None | `throttle:api` (60/min) |

#### Path parameters

| Name | Type | Description |
| --- | --- | --- |
| `resource` | integer | Plugin id, resolved with `Plugin::findOrFail()`. Any existing plugin resolves, including deleted, pending and hidden ones. |

#### Query parameters

None.

#### Responses

**200 OK**: every column of the `plugins` row (same keys as a [`search`](#get-apiv1resourcesearch) row), followed by computed keys appended in this order:

| Key | Type | Description |
| --- | --- | --- |
| `download` | string or integer | Sum of the `download` counters of all the plugin's versions (`SUM(versions.download)`). MySQL returns a `SUM` as a decimal, which PDO hands to PHP as a **string** (for example `"1234"`); a plugin with no version gets the integer `0`. Parse it as a number either way. |
| `purchases` | integer | Number of payments for this plugin with status `PAID`. **Only present when `price` is not `0`**: the key is absent for free resources. |
| `logo` | string | `https://groupez.dev/storage/images/{id}.{image}`. Always built, even if the file does not exist. |
| `version` | object or null | The full `versions` row of the current version (same keys as [`versions/{resource}`](#get-apiv1resourceversionsresource)), or `null` when `version_id` points to nothing. |

Paid resource:

```json
{
  "id": 42,
  "name": "zEssentials",
  "price": 5,
  "image": "png",
  "description": "Full description of the resource (Markdown)...",
  "created_at": "2021-05-09T18:39:39.000000Z",
  "updated_at": "2023-02-14T09:12:00.000000Z",
  "tag": "The essentials plugin your server deserves",
  "user_id": 7,
  "is_display": 1,
  "file": "zEssentials",
  "version_id": 318,
  "deleted": 0,
  "category_id": 3,
  "is_pending": 0,
  "unique_id": "GROUPEZ_0123456789abcde",
  "is_unique": 0,
  "download": "1234",
  "purchases": 56,
  "logo": "https://groupez.dev/storage/images/42.png",
  "version": {
    "id": 318,
    "version": "1.4.2",
    "plugin_id": 42,
    "download": 87,
    "title": "Spawner support",
    "extension": "jar",
    "description": "Adds spawner support.",
    "created_at": "2023-02-14T09:12:00.000000Z",
    "updated_at": "2023-02-14T09:12:00.000000Z",
    "file": "zEssentials"
  }
}
```

Free resource with no version (no `purchases` key, `version` is `null`):

```json
{
  "id": 43,
  "name": "zUpcoming",
  "price": 0,
  "image": "png",
  "description": "...",
  "created_at": "2023-03-01T12:00:00.000000Z",
  "updated_at": "2023-03-01T12:00:00.000000Z",
  "tag": null,
  "user_id": 7,
  "is_display": 1,
  "file": null,
  "version_id": -1,
  "deleted": 0,
  "category_id": 1,
  "is_pending": 0,
  "unique_id": "GROUPEZ_fedcba987654321",
  "is_unique": 0,
  "download": 0,
  "logo": "https://groupez.dev/storage/images/43.png",
  "version": null
}
```

**404 Not Found**: unknown id. See [Common error responses](#common-error-responses).

**429 Too Many Requests**: see [Common error responses](#common-error-responses).

#### Example

```bash
curl -H "Accept: application/json" "https://groupez.dev/api/v1/resource/42"
```

#### Notes

- `price` is in whole euros, as stored by v1. v2 keeps the same unit (`price_cents / 100`), so a v2 price can also be a decimal such as `4.99`.
- `purchases` counts payments, so a refunded payment that was not moved out of the `PAID` status is still counted.
- `unique_id` values generated by v1 are `GROUPEZ_` followed by 15 hexadecimal characters.
- **Differences with v2**: v2 returns a fixed list of 17 keys in this order: `id`, `user_id`, `name`, `tag`, `price`, `category_id`, `unique_id`, `version_id`, `download`, `purchases`, `logo`, `version`, `created_at`, `updated_at`, then the additions `slug`, `rating_avg`, `reviews_count`. Internal columns (`description`, `image`, `file`, `is_display`, `deleted`, `is_pending`, `is_unique`) are gone, `purchases` is always present, `download` is an integer, `logo` is `null` when there is no icon, `version` is a six-key object, and non-public resources answer `404`. See the [v2 page](../v2/resources.md#get-apiv1resourceresource).
