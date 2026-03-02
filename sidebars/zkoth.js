/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  zkothSidebar: [
    'introduction',
    'installation',
    'commands-permissions',
    {
      type: 'category',
      label: 'Configuration',
      link: {
        type: 'doc',
        id: 'configurations/koth',
      },
      items: [
        'configurations/config',
        'configurations/koth',
        'configurations/scoreboard',
        'configurations/loot',
        'configurations/webhook',
      ],
    },
    'placeholders',
    'integrations',
  ],
};

export default sidebars;
