/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  sarahSidebar: [
    'introduction',
    'installation',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'connections',
        'migrations',
      ],
    },
    {
      type: 'category',
      label: 'Usage',
      collapsed: false,
      items: [
        'queries',
        'schema-builder',
      ],
    },
  ],
};

export default sidebars;
