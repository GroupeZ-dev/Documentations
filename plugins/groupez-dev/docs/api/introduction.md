---
title: API
---

# groupez.dev API

groupez.dev exposes a public JSON API used by GroupeZ plugins and the Discord bot. Every endpoint lives under:

```
https://groupez.dev/api/v1/
```

## Versions

The platform has been rebuilt, so two implementations of this API are documented here:

| Version | Platform | Status |
| --- | --- | --- |
| [v2](./v2/overview.md) | Current groupez.dev (Laravel 13) | **Current** — online since October 2026 |
| [v1](./v1/overview.md) | Legacy groupez.dev (Laravel 8) | Legacy — kept for reference |

<CalloutContainer type="info">

<CalloutTitle>Same URIs, different platforms</CalloutTitle>

<CalloutDescription>
The v2 platform keeps the exact `/api/v1/...` URIs, status codes and JSON keys of the legacy platform so that plugins already deployed on Minecraft servers keep working. "v1" and "v2" here refer to the **platform**, not to the URI prefix. Responses from the v2 platform carry an `X-GroupeZ-Api-Version` header.
</CalloutDescription>

</CalloutContainer>

## Endpoint groups

| Group | v2 | v1 |
| --- | --- | --- |
| Licence | [v2](./v2/licence.md) | [v1](./v1/licence.md) |
| Resources | [v2](./v2/resources.md) | [v1](./v1/resources.md) |
| Authors | [v2](./v2/authors.md) | [v1](./v1/authors.md) |
| Gifts & payments | [v2](./v2/gifts-payments.md) | [v1](./v1/gifts-payments.md) |
| Discord | [v2](./v2/discord.md) | [v1](./v1/discord.md) |
| bStats | [v2](./v2/bstats.md) | [v1](./v1/bstats.md) |
