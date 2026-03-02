/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  zdrawerSidebar: [
    'introduction',
    'installation',
    'commands-permissions',
    {
      type: 'category',
      label: 'Configuration',
      link: {
        type: 'doc',
        id: 'configurations/config',
      },
      items: [
        'configurations/config',
        'configurations/drawers',
        'configurations/upgrades',
        'configurations/crafts',
      ],
    },
    'placeholders',
  ],
};

export default sidebars;
