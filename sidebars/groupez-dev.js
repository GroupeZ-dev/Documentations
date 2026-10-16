/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  groupezDevSidebar: [
    'introduction',
    {
      type: 'category',
      label: 'API',
      collapsed: false,
      link: {type: 'doc', id: 'api/introduction'},
      items: [
        {
          type: 'category',
          label: 'v2 (current)',
          collapsed: false,
          items: [
            'api/v2/overview',
            'api/v2/licence',
            'api/v2/resources',
            'api/v2/authors',
            'api/v2/gifts-payments',
            'api/v2/discord',
            'api/v2/bstats',
          ],
        },
        {
          type: 'category',
          label: 'v1 (legacy)',
          collapsed: true,
          items: [
            'api/v1/overview',
            'api/v1/licence',
            'api/v1/resources',
            'api/v1/authors',
            'api/v1/gifts-payments',
            'api/v1/discord',
            'api/v1/bstats',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
