/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  ztransactionSidebar: [
    'introduction',
    'installation',
    {
      type: 'category',
      label: 'Configuration',
      collapsed: false,
      items: [
        'configuration/config',
        'configuration/messages',
      ],
    },
    {
      type: 'category',
      label: 'Usage',
      collapsed: false,
      items: [
        'usage/commands',
        'usage/placeholders',
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
