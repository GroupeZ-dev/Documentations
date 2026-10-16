---
sidebar_position: 5
title: Gifts & payments
---

# Gifts & payments

Two read-only endpoints let a plugin (or any client) check a discount code and poll the state of a purchase. Both are **public and unauthenticated** by design: plugins already deployed on Minecraft servers call them without any token, so the protection lives in the payload, which is reduced to the strict minimum and carries no personal data.

:::info Same URIs as v1
The current platform keeps the `/api/v1/...` addresses of the legacy site so that deployed plugins keep working. The JSON payloads, however, are **not** identical to the legacy ones: see [the v1 page](../v1/gifts-payments.md) and the "Differences from v1" notes below.
:::

## Common behaviour

| Aspect | Value |
|--------|-------|
| Base URL | `https://groupez.dev` |
| Authentication | None. An `Authorization` header is ignored. |
| Rate limit | `throttle:api`: **120 requests per minute**, keyed on the authenticated user id or, for anonymous callers (the normal case here), the client IP. Shared with every other `/api/v1` route. |
| Response envelope | None. The object is returned bare, never wrapped in `{"data": ...}`. |
| Version header | Every response, including `404` and `429`, carries `X-GroupeZ-Api-Version: 1`. |
| Session / CSRF | None (stateless `api` middleware group). |

### Error bodies

Errors on `/api/v1/*` are normalised by the exception handler, whatever the `Accept` header:

**404 Not Found** (unknown code / unknown payment). The body never names the model or the framework:

```json
{
  "message": "Not found."
}
```

**429 Too Many Requests** (rate limit exceeded). The `Retry-After`, `X-RateLimit-Limit`, `X-RateLimit-Remaining` and `X-RateLimit-Reset` headers are kept when the throttle set them:

```json
{
  "message": "Too many requests."
}
```

:::note
The throttle runs before the route parameter is resolved, so a `404` counts against the quota like a `200`: probing for codes is bounded by the same 120/min budget. A request that is itself refused with `429` is not counted (Laravel checks the limit before recording the hit).
:::

There is no `401`, `403` or `422` on these two routes: they take no body, no query string and no credentials.

---

### GET /api/v1/gift/\{gift\}

Checks a discount (gift) code: is it currently applicable, and what discount does it give.

| Route name | Auth | Rate limit |
|------------|------|------------|
| `api.v1.gifts.check` | None (public) | `api` — 120/min per IP |

**Path parameters**

| Name | Type | Description |
|------|------|-------------|
| `gift` | string | The discount code itself (column `gifts.code`, max 32 characters, unique). The numeric primary key is **not** accepted. |

**Query / body parameters**

None.

**Responses**

`200 OK` — the code exists. Exactly three keys, in this order:

```json
{
  "code": "SUMMER",
  "percentage": 25,
  "active": true
}
```

| Key | Type | Description |
|-----|------|-------------|
| `code` | string | The code as stored in the database (not a copy of the URL segment; the two differ only if the lookup matched despite a difference in case, see the notes). |
| `percentage` | integer | The discount in percent (1–100). |
| `active` | boolean | Whether the code can be applied **right now**. |

`active` is `true` only if all of these hold: the code is enabled, its start date (if any) is in the past, its expiry date (if any) is in the future, and its usage quota (if any) is not exhausted. A disabled, expired or exhausted code still returns `200` with `"active": false`, and nothing in the payload tells these reasons apart:

```json
{
  "code": "OLD",
  "percentage": 10,
  "active": false
}
```

`404 Not Found` — no code with that value:

```json
{
  "message": "Not found."
}
```

`429 Too Many Requests` — see [Error bodies](#error-bodies).

**Example**

```bash
curl -s https://groupez.dev/api/v1/gift/SUMMER \
  -H "Accept: application/json"
```

**Notes**

- The answer is **advisory**. Calling this endpoint does not reserve or consume the code (`uses_count` is untouched), and the discount is recomputed from the database when a checkout session is opened. A code that becomes unusable between this call and the order makes the order fail rather than charging the announced price.
- What is **never** returned: the usage quota (`max_uses`), the usage count, the start/expiry dates, the seller who issued the code and the resource it is restricted to. A client cannot know whether a code applies to a given resource from this endpoint.
- Codes imported from the legacy site were upper-cased and trimmed during migration, and duplicate legacy codes were renamed with a numeric suffix (`CODE-2`, `CODE-3`, ...) to keep `code` unique. Whether the lookup is case-sensitive depends on the production database: the MySQL/MariaDB connections are configured with the case-insensitive `utf8mb4_unicode_ci` collation, while SQLite compares case-sensitively. Which engine production runs is not pinned by the code or the tests, so send the code exactly as issued.
- **Differences from v1**: v1 returned the whole `gifts` row (`id`, `code`, `plugin_id`, `promotion`, `used`, `max_use`, `active`, timestamps). In v2 the discount key is `percentage` (not `promotion`), and `active` reflects real usability (window + quota), not the raw on/off flag.

---

### GET /api/v1/payment/\{payment\}

Returns the status and amount of a purchase. Intended for plugins that poll to find out whether an order went through.

| Route name | Auth | Rate limit |
|------------|------|------------|
| `api.v1.payments.show` | None (public) | `api` — 120/min per IP |

**Path parameters**

| Name | Type | Description |
|------|------|-------------|
| `payment` | string | The payment's public reference `uid`, a 26-character [ULID](https://github.com/ulid/spec) (e.g. `01JD7R6Q9V3X2M4K8N5P0T1W2Y`). Anything that is not a valid ULID is a `404` without even querying the database. The numeric primary key is **not** accepted. ULIDs are generated upper-case; send them as issued. |

**Query / body parameters**

None.

**Responses**

`200 OK` — exactly four keys, in this order:

```json
{
  "uid": "01JD7R6Q9V3X2M4K8N5P0T1W2Y",
  "status": "paid",
  "amount_cents": 1990,
  "currency": "EUR"
}
```

| Key | Type | Description |
|-----|------|-------------|
| `uid` | string | The payment's public reference (ULID). |
| `status` | string | One of `pending`, `paid`, `unpaid`, `refunded`, `disputed`, `cancelled` (lower-case enum value). |
| `amount_cents` | integer | Amount actually charged, in cents (after any discount). |
| `currency` | string | ISO 4217 code, 3 characters. Defaults to `EUR`; all payments imported from v1 are `EUR`. |

Status meanings:

| Value | Meaning |
|-------|---------|
| `pending` | Created, waiting for the provider's confirmation. A checkout that is simply abandoned stays `pending` until the administrators' prune moves it to `cancelled`. |
| `paid` | Settled. This is the only status that grants access to the resource. |
| `unpaid` | The charge failed or was refused. There is no `failed` status: `unpaid` is the failure state. It is not always final: a later successful payment notification can still move it to `paid`. |
| `refunded` | Refunded. |
| `disputed` | Under dispute (chargeback). |
| `cancelled` | Abandoned checkout, cancelled. Final. |

`404 Not Found` — unknown uid, a value that is not a ULID, or a numeric id:

```json
{
  "message": "Not found."
}
```

`429 Too Many Requests` — see [Error bodies](#error-bodies).

**Example**

```bash
curl -s https://groupez.dev/api/v1/payment/01JD7R6Q9V3X2M4K8N5P0T1W2Y \
  -H "Accept: application/json"
```

**Notes**

- No personal or provider data is ever returned: no buyer, seller, e-mail, billing address, resource, gift code, discount, base amount, payment date, provider name or provider transaction id (`provider_payment_id`).

:::warning Breaking difference from v1
In v1, `{id}` was the **provider transaction id** (`stripe_id`: a Stripe PaymentIntent `pi_...` or a PayPal transaction id) and the response was the full `payments` row. In v2, `{payment}` is the **ULID `uid`** and no provider identifier is accepted or returned. A client that calls this route with a Stripe or PayPal id gets a `404`.

Legacy v1 `uid` values were not carried over: payments imported from v1 received a freshly generated ULID.
:::

- `status` values changed too: v1 used upper-case strings (`PAID`, `UNPAID`, `REFUND`, `DISPUTE`, `PENDING`); v2 uses the lower-case values listed above. The amount moved from `price` (whole euros) to `amount_cents`.
