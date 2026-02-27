// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  zitemsSidebar: [
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
        id: 'configurations/items',
      },
      items: [
        'configurations/items',
      ],
    },
    {
      type: 'category',
      label: 'Effects',
      link: {
        type: 'doc',
        id: 'effects/overview',
      },
      items: [
        'effects/overview',
        'effects/vein-mining',
        'effects/hammer',
        'effects/farming-hoe',
        'effects/auto-sell',
        'effects/melt-mining',
        'effects/sell-stick',
        'effects/silk-spawner',
        'effects/xp-boost',
        'effects/absorption',
        'effects/infinite-bucket',
        'effects/unbreakable',
        'effects/enchants-applicator',
        'effects/attributes-applicator',
      ],
    },
    {
      type: 'category',
      label: 'Metadata',
      link: {
        type: 'doc',
        id: 'metadata/overview',
      },
      items: [
        'metadata/overview',
      ],
    },
    {
      type: 'doc',
      id: 'runes',
      label: 'Runes (Legacy)',
    },
  ],
};

export default sidebars;
