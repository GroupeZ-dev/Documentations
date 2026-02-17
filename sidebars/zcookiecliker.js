/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  zcookieclikerSidebar: [
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
        'configuration/upgrades',
      ],
    },
  ],
};

export default sidebars;
