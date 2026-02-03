/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  zmenuSidebar: [
    'getting-started',
    'installation',
    'supported-plugins',
    'zmenu-plus',
    {
      type: 'category',
      label: 'Configurations',
      collapsed: false,
      items: [
        'configurations/informations',
        'configurations/commands-permissions',
        'configurations/placeholders',
        {
          type: 'category',
          label: 'Inventories',
          collapsed: true,
          items: [
            'configurations/inventories/inventory',
            'configurations/inventories/create-inventory',
          ],
        },
        {
          type: 'category',
          label: 'Items',
          collapsed: true,
          items: [
            'configurations/items/item',
            'configurations/items/components',
          ],
        },
        {
          type: 'category',
          label: 'Buttons',
          collapsed: true,
          items: [
            'configurations/buttons/button',
            {
              type: 'category',
              label: 'Button Types',
              collapsed: true,
              items: [
                'configurations/buttons/types/none',
                'configurations/buttons/types/inventory',
                'configurations/buttons/types/back',
                'configurations/buttons/types/next',
                'configurations/buttons/types/previous',
                'configurations/buttons/types/home',
                'configurations/buttons/types/jump',
                'configurations/buttons/types/mainmenu',
                'configurations/buttons/types/switch',
                'configurations/buttons/types/pagination',
                'configurations/buttons/types/dynamic-pagination',
                'configurations/buttons/types/input',
              ],
            },
            'configurations/buttons/actions',
          ],
        },
        'configurations/requirements',
        'configurations/global-placeholders',
        'configurations/patterns',
        'configurations/player-data',
        'configurations/dialogues',
        'configurations/custom-commands',
        'configurations/config-yml',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      collapsed: false,
      items: [
        'development/api-introduction',
        'development/api-inventory',
        'development/api-buttons',
        'development/api-paginate-button',
        'development/api-menu-item-stack',
        'development/api-actions',
        'development/api-player-data',
        'development/api-events',
      ],
    },
  ],
};

export default sidebars;
