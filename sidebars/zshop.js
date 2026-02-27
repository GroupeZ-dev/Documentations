// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  zshopSidebar: [
    {
      type: 'doc',
      id: 'introduction',
      label: 'Introduction',
    },
    {
      type: 'doc',
      id: 'installation',
      label: 'Installation',
    },
    {
      type: 'doc',
      id: 'commands-permissions',
      label: 'Commands & Permissions',
    },
    {
      type: 'category',
      label: 'Configuration',
      link: {
        type: 'doc',
        id: 'configurations/config',
      },
      items: [
        'configurations/config',
        'configurations/economies',
        'configurations/items',
        'configurations/limits',
        'configurations/buttons',
      ],
    },
    {
      type: 'doc',
      id: 'price-modifiers',
      label: 'Price Modifiers',
    },
    {
      type: 'doc',
      id: 'placeholders',
      label: 'Placeholders',
    },
  ],
};

export default sidebars;
