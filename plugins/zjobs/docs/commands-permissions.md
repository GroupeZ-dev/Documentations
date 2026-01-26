---
sidebar_position: 5
title: Commands & Permissions
description: zJobs commands and permissions reference
---

# Commands & Permissions

Complete reference for all zJobs commands and permissions.

## Commands

### /jobs

Opens the main jobs menu.

```
/jobs
```

**Permission:** `zjobs.use`

---

### /jobs list

Lists all available jobs.

```
/jobs list
```

**Permission:** `zjobs.list`

---

### /jobs join

Join a job.

```
/jobs join <job>
```

| Argument | Required | Description |
|----------|----------|-------------|
| `job` | Yes | The job ID to join |

**Examples:**
```
/jobs join miner
/jobs join farmer
/jobs join hunter
```

**Permission:** `zjobs.join`

---

### /jobs leave

Leave a job.

```
/jobs leave <job>
```

| Argument | Required | Description |
|----------|----------|-------------|
| `job` | Yes | The job ID to leave |

**Examples:**
```
/jobs leave miner
```

**Permission:** `zjobs.leave`

---

### /jobs info

View information about a job.

```
/jobs info <job>
```

| Argument | Required | Description |
|----------|----------|-------------|
| `job` | Yes | The job ID to view |

**Examples:**
```
/jobs info miner
/jobs info farmer
```

**Permission:** `zjobs.info`

---

### /jobs stats

View your job statistics.

```
/jobs stats [player]
```

| Argument | Required | Description |
|----------|----------|-------------|
| `player` | No | Target player (requires permission) |

**Examples:**
```
/jobs stats
/jobs stats Steve
```

**Permission:** `zjobs.stats`, `zjobs.stats.others`

---

### /jobs top

View the job leaderboard.

```
/jobs top <job> [page]
```

| Argument | Required | Description |
|----------|----------|-------------|
| `job` | Yes | The job ID |
| `page` | No | Leaderboard page (default: 1) |

**Examples:**
```
/jobs top miner
/jobs top miner 2
```

**Permission:** `zjobs.top`

---

### /jobs browse

Browse available jobs with detailed information.

```
/jobs browse
```

**Permission:** `zjobs.browse`

---

### /jobs setlevel

Set a player's job level (admin).

```
/jobs setlevel <player> <job> <level>
```

| Argument | Required | Description |
|----------|----------|-------------|
| `player` | Yes | Target player |
| `job` | Yes | The job ID |
| `level` | Yes | New level |

**Examples:**
```
/jobs setlevel Steve miner 50
```

**Permission:** `zjobs.admin.setlevel`

---

### /jobs addxp

Add job XP to a player (admin).

```
/jobs addxp <player> <job> <amount>
```

| Argument | Required | Description |
|----------|----------|-------------|
| `player` | Yes | Target player |
| `job` | Yes | The job ID |
| `amount` | Yes | XP amount to add |

**Examples:**
```
/jobs addxp Steve miner 1000
```

**Permission:** `zjobs.admin.addxp`

---

### /jobs removexp

Remove job XP from a player (admin).

```
/jobs removexp <player> <job> <amount>
```

| Argument | Required | Description |
|----------|----------|-------------|
| `player` | Yes | Target player |
| `job` | Yes | The job ID |
| `amount` | Yes | XP amount to remove |

**Examples:**
```
/jobs removexp Steve miner 500
```

**Permission:** `zjobs.admin.removexp`

---

### /jobs forcejoin

Force a player to join a job (admin).

```
/jobs forcejoin <player> <job>
```

| Argument | Required | Description |
|----------|----------|-------------|
| `player` | Yes | Target player |
| `job` | Yes | The job ID |

**Examples:**
```
/jobs forcejoin Steve miner
```

**Permission:** `zjobs.admin.forcejoin`

---

### /jobs forceleave

Force a player to leave a job (admin).

```
/jobs forceleave <player> <job>
```

| Argument | Required | Description |
|----------|----------|-------------|
| `player` | Yes | Target player |
| `job` | Yes | The job ID |

**Examples:**
```
/jobs forceleave Steve miner
```

**Permission:** `zjobs.admin.forceleave`

---

### /jobs reload

Reload the plugin configuration.

```
/jobs reload
```

**Permission:** `zjobs.admin.reload`

---

## Permissions

### Player Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `zjobs.use` | Access to /jobs command | true |
| `zjobs.list` | List available jobs | true |
| `zjobs.join` | Join jobs | true |
| `zjobs.leave` | Leave jobs | true |
| `zjobs.info` | View job information | true |
| `zjobs.stats` | View own job statistics | true |
| `zjobs.stats.others` | View other players' statistics | op |
| `zjobs.top` | View job leaderboards | true |
| `zjobs.browse` | Browse available jobs | true |

### Admin Permissions

| Permission | Description | Default |
|------------|-------------|---------|
| `zjobs.admin.*` | All admin permissions | op |
| `zjobs.admin.reload` | Reload plugin configuration | op |
| `zjobs.admin.setlevel` | Set player job levels | op |
| `zjobs.admin.addxp` | Add job XP to players | op |
| `zjobs.admin.removexp` | Remove job XP from players | op |
| `zjobs.admin.forcejoin` | Force players to join jobs | op |
| `zjobs.admin.forceleave` | Force players to leave jobs | op |

### Job-Specific Permissions

| Permission | Description |
|------------|-------------|
| `zjobs.job.*` | Access to all jobs |
| `zjobs.job.<job>` | Access to specific job |
| `zjobs.limit.<number>` | Override max jobs limit |

### Bypass Permissions

| Permission | Description |
|------------|-------------|
| `zjobs.bypass.cooldown` | Bypass job change cooldown |
| `zjobs.bypass.limit` | Bypass maximum jobs limit |
| `zjobs.bypass.worldrestriction` | Bypass world restrictions |

## Permission Examples

### Allow only VIPs to join premium jobs

```yaml
# LuckPerms example
/lp group vip permission set zjobs.job.legendary_hunter true
/lp group vip permission set zjobs.job.master_miner true
```

### Set custom job limits per rank

```yaml
# Default: 1 job
/lp group default permission set zjobs.limit.1 true

# VIP: 2 jobs
/lp group vip permission set zjobs.limit.2 true

# MVP: 3 jobs
/lp group mvp permission set zjobs.limit.3 true
```

### Allow staff to manage jobs

```yaml
/lp group moderator permission set zjobs.admin.setlevel true
/lp group moderator permission set zjobs.admin.addxp true
/lp group admin permission set zjobs.admin.* true
```

## Placeholders

zJobs provides PlaceholderAPI placeholders:

| Placeholder | Description |
|-------------|-------------|
| `%zjobs_jobs%` | List of player's jobs |
| `%zjobs_jobs_count%` | Number of jobs player has |
| `%zjobs_<job>_level%` | Level in specific job |
| `%zjobs_<job>_xp%` | Current XP in job |
| `%zjobs_<job>_xp_required%` | XP required for next level |
| `%zjobs_<job>_progress%` | Progress percentage to next level |
| `%zjobs_<job>_total_money%` | Total money earned from job |
| `%zjobs_<job>_total_xp%` | Total XP earned from job |
| `%zjobs_<job>_rank%` | Player's rank in job leaderboard |

### Placeholder Examples

```yaml
# In a scoreboard
- "&7Jobs: &e%zjobs_jobs%"
- "&7Miner Level: &e%zjobs_miner_level%"
- "&7Progress: &e%zjobs_miner_progress%%"

# In chat format
format: "[%zjobs_miner_level%⛏] %player%: %message%"
```
