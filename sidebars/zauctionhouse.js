/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  zauctionhouseSidebar: [
    'introduction',
    'installation',
    'why-zmenu',
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
        'configuration/discord',
      ],
    },
    {
      type: 'category',
      label: 'Inventories',
      collapsed: false,
      items: [
        'inventories/buttons',
        'inventories/auction',
        'inventories/categories',
        'inventories/sell',
        'inventories/expired-items',
        'inventories/purchased-items',
        'inventories/selling-items',
        'inventories/history',
        'inventories/purchase-confirm',
        'inventories/remove-confirm',
        'inventories/shulker-content',
        'inventories/patterns',
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
