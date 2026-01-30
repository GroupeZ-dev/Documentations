/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  zquestsSidebar: [
    'getting-started',
    'installation',
    {
      type: 'category',
      label: 'Configurations',
      collapsed: false,
      items: [
        'configurations/quests',
        'configurations/quest-types',
        'configurations/rewards',
        'configurations/placeholders',
        'configurations/commands-permissions',
        'configurations/inventories',
        'configurations/waypoints-holograms',
        'configurations/config-yml',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      collapsed: false,
      items: [
        'development/api',
      ],
    },
  ],
};

export default sidebars;
