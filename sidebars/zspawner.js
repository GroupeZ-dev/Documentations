/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  zspawnerSidebar: [
    'introduction',
    'installation',
    'commands-permissions',
    'placeholders',
    {
      type: 'category',
      label: 'Configuration',
      collapsed: false,
      items: [
        'configuration/config',
        'configuration/virtual-spawner',
        'configuration/stackable-spawner',
        'configuration/silk-spawner',
      ],
    },
  ],
};

export default sidebars;
