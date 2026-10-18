---
title: Hot Reload
description: Edit your inventories and see the result instantly in game, without any command
---

# Hot Reload

**Save the file, the menu is updated. No command, no restart.** With the hot reload enabled, zMenu watches your `inventories/` folder and applies every change on its own: edit a file in your editor, upload it over SFTP or pull it from git, and players see the new version instantly, even if they have the menu open.

```yaml
# config.yml
hot-reload:
  enable: true
  delay-milliseconds: 500
```

Then run `/zm reload config` once (or `/zm reload`) to start watching. From now on, you never need `/zm reload` for your inventories again.

<CalloutContainer type="info">

<CalloutTitle>Perfect for creating menus</CalloutTitle>

<CalloutDescription>
Open the menu in game, put your editor next to it, and design live: move a button, change a lore line, fix a requirement, save, and the menu reopens with your change on the same page. Combined with the [DeluxeMenus converter](./convert-deluxemenus), it is the fastest way to polish converted menus.
</CalloutDescription>

</CalloutContainer>

## What it does

| You... | zMenu... |
|--------|----------|
| Modify a file | Reloads the inventory |
| Create a file | Loads the new inventory |
| Delete a file (or a whole folder) | Unloads the inventory and closes it for its viewers |

Subfolders of `inventories/` are watched too.

## Players keep their place

Players viewing an inventory when it is reloaded see the new version open over it instantly:

- on the **same page**,
- with the **same previous inventories**, so a back button opens the new version too.

If the inventory is unloaded (file deleted, or `enable: false` added to it), it is closed.

## Errors never break a menu

A file that cannot be loaded (YAML syntax error, unknown button type, invalid size...) is **not applied**: the previous version stays loaded and playable, and the error is shown in the console until you fix the file. You can save half-finished work without breaking anything for your players.

## Works everywhere

- **Debounced saves**: text editors often save a file in several steps. zMenu waits `delay-milliseconds` (500 ms by default) after the last change, so a save triggers only one reload.
- **Docker, Pterodactyl, WSL, network shares, SFTP**: on top of the file system events, the folder is scanned every two seconds, so changes are detected even where the file system sends no event.
- **Backups and git**: if the `inventories/` folder is deleted and recreated (backup restore, `git checkout`...), it is watched again automatically.
- **Windows**: the whole tree is watched with a single handle, so subfolders can still be renamed or deleted while the server runs.
- **No useless reload**: a file is reloaded when its content or modification date changes. Saving it again without any change still reloads it, but the same version is never reloaded twice.

## Configuration

| Option | Default | Description |
|--------|---------|-------------|
| `enable` | `false` | Enables the hot reload |
| `delay-milliseconds` | `500` | Time to wait after the last change of a file before reloading it |

Enabling or disabling the option takes effect after `/zm reload` or `/zm reload config`, or within two seconds when changed from the in-game configuration dialog.

<CalloutContainer type="info">

<CalloutTitle>What is watched</CalloutTitle>

<CalloutDescription>
Only the `inventories/` folder is watched. Files listed in [`specify-path-menus`](./configurations/config-yml#specify-path-menus), patterns, commands and dialogs still require `/zm reload`.
</CalloutDescription>

</CalloutContainer>

## Console logs

Every detection, reload, unload and error is logged in the console with a `[HotReload]` prefix:

```
[zMenu] [HotReload] Inventory hot reload enabled, watching .../plugins/zMenu/inventories (native recursive watch, 12 file(s), 12 loaded inventory(ies), scan every 2000ms, delay 500ms).
[zMenu] [HotReload] Change detected on example.yml, reloading the inventory...
[zMenu] [HotReload] Inventory example.yml reloaded in 14ms, reopened for 1 player(s).
```

With [`enable-debug`](./configurations/config-yml#enable-debug) set to `true`, each file event, each change found by the scan and each ignored (unchanged) file is logged as well.

## Troubleshooting

**Nothing happens when I save a file**
1. Check that the `Inventory hot reload enabled` line appears at startup or after `/zm reload`.
2. Check that the file is in `inventories/` and not loaded through `specify-path-menus`.
3. Enable `enable-debug` to see whether the change is detected.

**My change is not applied**
The file probably contains an error: look for it in the console. The previous version stays loaded until the file is valid.

## When to enable it

- While creating or editing menus, to see your changes instantly
- On a test or development server
- On production servers where menus are deployed by SFTP or git and must be picked up without a command

## Next Steps

- [Migrate from DeluxeMenus](./convert-deluxemenus) in one command
- [Create your first inventory](./configurations/inventories/create-inventory)
- See every option of [config.yml](./configurations/config-yml)
