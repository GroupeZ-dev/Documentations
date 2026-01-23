/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  zauctionhouseSidebar: [
    'introduction',
    'installation',
    {
      type: 'category',
      label: 'Configuration',
      collapsed: false,
      items: [
        'configuration/config',
        'configuration/categories',
        'configuration/inventories',
      ],
    },
    {
      type: 'category',
      label: 'Features',
      collapsed: false,
      items: [
        'features/selling',
        'features/buying',
        'features/bidding',
        'features/expired-items',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      collapsed: true,
      items: [
        'development/api',
        'development/events',
      ],
    },
  ],
};

export default sidebars;
