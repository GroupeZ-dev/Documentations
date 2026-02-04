/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  zessentialsSidebar: [
    'introduction',
    'installation',
    'commands-permissions',
    'placeholders',
    'database',
    'converters',
    {
      type: 'category',
      label: 'Configuration',
      collapsed: false,
      items: [
        'configuration/main-config',
      ],
    },
    {
      type: 'category',
      label: 'Modules',
      collapsed: false,
      items: [
        'modules/index',
        'modules/afk',
        'modules/automessage',
        'modules/chat',
        'modules/discord',
        'modules/economy',
        'modules/hologram',
        'modules/home',
        'modules/items',
        'modules/join-quit',
        'modules/kits',
        'modules/mailbox',
        'modules/messages',
        'modules/rules',
        'modules/sanction',
        'modules/scoreboard',
        'modules/spawn',
        'modules/steps',
        'modules/teleportation',
        'modules/vault',
        'modules/vote',
        'modules/warp',
        'modules/worldedit',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      collapsed: false,
      items: [
        'development/hooks',
        'development/events',
        'development/discord-bot',
      ],
    },
  ],
};

export default sidebars;
