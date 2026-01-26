// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'GroupeZ Wiki',
  tagline: 'Documentation for GroupeZ Minecraft plugins',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://wiki.groupez.dev',
  baseUrl: '/',

  organizationName: 'GroupeZ-dev',
  projectName: 'groupez-wiki',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'fr'],
    localeConfigs: {
      en: {
        label: 'English',
        htmlLang: 'en-US',
      },
      fr: {
        label: 'Français',
        htmlLang: 'fr-FR',
      },
    },
  },

  plugins: [
    // zMenu Documentation
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'zmenu',
        path: 'plugins/zmenu/docs',
        routeBasePath: 'zmenu',
        sidebarPath: './sidebars/zmenu.js',
        editUrl: 'https://github.com/GroupeZ-dev/groupez-wiki/edit/main/',
      },
    ],
    // zAuctionHouse Documentation
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'zauctionhouse',
        path: 'plugins/zauctionhouse/docs',
        routeBasePath: 'zauctionhouse',
        sidebarPath: './sidebars/zauctionhouse.js',
        editUrl: 'https://github.com/GroupeZ-dev/groupez-wiki/edit/main/',
      },
    ],
    // zTransaction Documentation
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'ztransaction',
        path: 'plugins/ztransaction/docs',
        routeBasePath: 'ztransaction',
        sidebarPath: './sidebars/ztransaction.js',
        editUrl: 'https://github.com/GroupeZ-dev/groupez-wiki/edit/main/',
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false, // Disabled - using multi-instance plugins instead
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/groupez-social-card.jpg',
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'GroupeZ Wiki',
        logo: {
          alt: 'GroupeZ Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'dropdown',
            label: 'Projets',
            position: 'left',
            items: [
              {
                type: 'docSidebar',
                sidebarId: 'zmenuSidebar',
                docsPluginId: 'zmenu',
                label: 'zMenu',
              },
              {
                type: 'docSidebar',
                sidebarId: 'zauctionhouseSidebar',
                docsPluginId: 'zauctionhouse',
                label: 'zAuctionHouse',
              },
              {
                type: 'docSidebar',
                sidebarId: 'ztransactionSidebar',
                docsPluginId: 'ztransaction',
                label: 'zTransaction',
              },
            ],
          },
          {
            href: 'https://discord.groupez.dev',
            label: 'Discord',
            position: 'right',
          },
          {
            href: 'https://github.com/GroupeZ-dev',
            label: 'GitHub',
            position: 'right',
          },
          {
            type: 'localeDropdown',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Plugins',
            items: [
              {
                label: 'zMenu',
                to: '/zmenu/getting-started',
              },
              {
                label: 'zAuctionHouse',
                to: '/zauctionhouse/introduction',
              },
              {
                label: 'zTransaction',
                to: '/ztransaction/introduction',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.groupez.dev',
              },
              {
                label: 'SpigotMC',
                href: 'https://www.spigotmc.org/members/maxlego08.45892/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/GroupeZ-dev',
              },
              {
                label: 'Minecraft Inventory Builder',
                href: 'https://minecraft-inventory-builder.com',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Maxlego08 - GroupeZ. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['java', 'yaml', 'json', 'bash'],
      },
    }),
};

export default config;
