---
sidebar_position: 5
title: Gifts & payments
---

# Gifts & payments

:::warning Legacy platform
This page documents the **legacy v1 platform** of groupez.dev (the former Laravel 8 site). It is kept for reference and for plugins that were built against it. The current platform answers the same URIs with different payloads: see [Gifts & payments (v2)](../v2/gifts-payments.md).
:::

Two read-only endpoints exposed a discount code and a purchase. Both were **public and unauthenticated**, and both returned the **raw database row**.

## Common behaviour

| Aspect | Value |
|--------|-------|
| Base URL | `https://groupez.dev` |
| Authentication | None. |
| Rate limit | `throttle:api`: **60 requests per minute**, keyed on the authenticated user id or the client IP. Shared with every other `/api/v1` route. |
| Middleware group | `api` (`throttle:api`, `SubstituteBindings`, `TrustCloudflare`). |
| Response envelope | None. The row is returned bare. |

### Error bodies

The legacy site used Laravel 8's default exception handler, with no customisation:

- With an `Accept: application/json` header, errors are JSON (`{"message": "..."}`).
- **Without it, errors are rendered as the site's HTML error page**, even on `/api/*`.

**429 Too Many Requests** (JSON variant), with the `Retry-After`, `X-RateLimit-Limit`, `X-RateLimit-Remaining` and `X-RateLimit-Reset` headers:

```json
{
  "message": "Too Many Attempts."
}
```

There is no `401`, `403` or `422` on these two routes: they take no body, no query string and no credentials.

---

### GET /api/v1/gift/\{id\}

Returns a discount (gift) code.

| Route name | Auth | Rate limit |
|------------|------|------------|
| `api.v1.gift` | None (public) | `api` — 60/min per IP |

Controller: `App\Http\Controllers\Admin\GiftController@check`.

**Path parameters**

| Name | Type | Description |
|------|------|-------------|
| `id` | string | Despite its name, the **code** (`gifts.code`), not the numeric id. Looked up with `Gift::where('code', $id)->first()`. |

**Query / body parameters**

None.

**Responses**

`200 OK` — the whole `gifts` row, serialised with `json_encode($gift)`:

```json
{
  "id": 12,
  "code": "SUMMER",
  "plugin_id": 42,
  "promotion": 25,
  "used": 3,
  "max_use": 100,
  "active": 1,
  "created_at": "2021-03-01T10:15:00.000000Z",
  "updated_at": "2021-03-04T18:02:11.000000Z"
}
```

| Key | Type | Description |
|-----|------|-------------|
| `id` | integer | Primary key. |
| `code` | string | The code. |
| `plugin_id` | integer | The resource the code applies to; `-1` was shown as "all plugins" by the legacy back office (v1 gifts had no owner column). |
| `promotion` | integer | Discount in percent. |
| `used` | integer | How many times the code has been used. |
| `max_use` | integer | Usage quota (column default `0`). |
| `active` | boolean as integer | On/off flag (`1` / `0`), stored as a MySQL `tinyint`. The model has no cast, so it is **not** a JSON boolean. |
| `created_at` / `updated_at` | string | ISO-8601 timestamps (Laravel 8 serialisation). |

`404 Not Found` — no code with that value (`abort(404)`, empty message). With `Accept: application/json`:

```json
{
  "message": ""
}
```

Without that header, the HTML 404 page.

`429 Too Many Requests` — see [Error bodies](#error-bodies).

**Example**

```bash
curl -s https://groupez.dev/api/v1/gift/SUMMER \
  -H "Accept: application/json"
```

**Notes**

- **Content type quirk**: the controller returns the result of `json_encode()` as a plain string, so the `200` response is sent with `Content-Type: text/html; charset=UTF-8`, not `application/json`. Parse the body as JSON regardless of the header.
- `active` is the raw flag only. The site itself considered a code usable when `active && used < max_use` (`Gift::canBeUsed()`); the endpoint does not compute this for you.
- The response exposes the seller's campaign data (quota, usage count, target plugin). This was removed in v2.
- Field ordering above follows the table's column order. Whether integer columns come back as JSON numbers or numeric strings depends on the PHP/PDO version the legacy server ran, which is not recorded in the code.

---

### GET /api/v1/payment/\{id\}

Returns a purchase.

| Route name | Auth | Rate limit |
|------------|------|------------|
| `api.v1.payment` | None (public) | `api` — 60/min per IP |

Controller: `App\Http\Controllers\Admin\PaymentController@getPayment`.

**Path parameters**

| Name | Type | Description |
|------|------|-------------|
| `id` | string | The **provider transaction id** stored in `payments.stripe_id`: a Stripe PaymentIntent id (`pi_...`) for Stripe purchases, or the PayPal transaction id (`txn_id` of the IPN) for PayPal purchases. Not the numeric id, not the `uid`. Looked up with `Payment::where('stripe_id', $id)->firstOrFail()`. |

**Query / body parameters**

None.

**Responses**

`200 OK` — the whole `payments` row, via `response()->json($payment)` (`Content-Type: application/json`):

```json
{
  "id": 2546,
  "user_id": 318,
  "stripe_id": "pi_3Abc...",
  "uid": "TO DELETE",
  "status": "PAID",
  "price": 10,
  "created_at": "2021-03-01T10:15:00.000000Z",
  "updated_at": "2021-03-01T10:16:42.000000Z",
  "gift_id": null,
  "type": 0,
  "content_id": 42
}
```

| Key | Type | Description |
|-----|------|-------------|
| `id` | integer | Primary key. |
| `user_id` | integer | The buyer's user id. |
| `stripe_id` | string or null | Provider transaction id (Stripe or PayPal, despite the name). For Stripe it is set to the PaymentIntent id as soon as the checkout session is created, i.e. before the buyer pays. For PayPal it holds the literal string `"empty"` until the IPN notification brings the `txn_id`. Invoices (`type` `1`) keep `"empty"`; payments created by hand in the back office hold whatever transaction id the administrator typed. |
| `uid` | string | Legacy reference. Purchases created by the checkout flow carry the literal string `"TO DELETE"`; payments created by hand in the back office and invoice payments carry a random 64-character string. Not a usable reference. |
| `status` | string | One of `PAID`, `UNPAID`, `REFUND`, `DISPUTE`, `PENDING` (upper-case). |
| `price` | integer | Amount paid, in **whole euros** (not cents). |
| `created_at` / `updated_at` | string | ISO-8601 timestamps. |
| `gift_id` | integer or null | The discount code used, if any. |
| `type` | integer | `0` = plugin purchase, `1` = invoice. |
| `content_id` | integer or null | The purchased plugin id (for `type` `0`). |

`404 Not Found` — no payment with that provider id (`firstOrFail`). With `Accept: application/json`, the message names the model:

```json
{
  "message": "No query results for model [App\\Models\\Payment]."
}
```

Without that header, the HTML 404 page.

`429 Too Many Requests` — see [Error bodies](#error-bodies).

**Example**

```bash
curl -s https://groupez.dev/api/v1/payment/pi_3Abc... \
  -H "Accept: application/json"
```

**Notes**

- The response exposes the buyer's user id and the provider transaction id to anyone who knows that id. This was removed in v2.
- `stripe_id` is not unique and the lookup takes the first match: `GET /api/v1/payment/empty` returned the first payment whose provider id was still the placeholder `"empty"` (an unfinished PayPal checkout or an invoice).
- Field ordering above follows the table's physical column order after the legacy migrations (`gift_id`, `type` and `content_id` were added later; `plugin_id` and `spigot` were dropped). It is indicative, not a contract.

:::warning Not compatible with v2
v2 keeps the URI `/api/v1/payment/{...}` but looks the payment up by its new ULID `uid` and returns only `uid`, `status` (lower-case), `amount_cents` and `currency`. A call with a Stripe/PayPal id returns `404` on the current platform. See [v2](../v2/gifts-payments.md#get-apiv1paymentpayment).
:::
