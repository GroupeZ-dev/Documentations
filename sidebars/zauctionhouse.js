/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  zauctionhouseSidebar: [
    'introduction',
    'installation',
    'commands-permissions',
    {
      type: 'category',
      label: 'Configuration',
      collapsed: false,
      items: [
        'configuration/config',
        'configuration/economies',
        'configuration/categories',
        'configuration/buttons',
        'configuration/placeholders',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      collapsed: true,
      items: [
        'development/api',
        'development/custom-economy',
      ],
    },
  ],
};

export default sidebars;
