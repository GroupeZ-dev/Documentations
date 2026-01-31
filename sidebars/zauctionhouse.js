/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  zauctionhouseSidebar: [
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
        'configuration/messages',
        'configuration/economies',
        'configuration/categories',
        'configuration/rules',
        'configuration/inventories',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      collapsed: false,
      items: [
        'development/api',
        'development/services',
        'development/events',
        'development/items',
        'development/custom-economy',
      ],
    },
  ],
};

export default sidebars;
