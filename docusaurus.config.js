// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'GroupeZ Docs',
  tagline: 'Documentation for GroupeZ Minecraft plugins',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://docs.groupez.dev',
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
    // zAntiAutoClick Documentation
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'zantiautoclick',
        path: 'plugins/zantiAutoClick/docs',
        routeBasePath: 'zantiautoclick',
        sidebarPath: './sidebars/zantiautoclick.js',
        editUrl: 'https://github.com/GroupeZ-dev/groupez-wiki/edit/main/',
      },
    ],
    // zCookieCliker Documentation
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'zcookiecliker',
        path: 'plugins/zcookiecliker/docs',
        routeBasePath: 'zcookiecliker',
        sidebarPath: './sidebars/zcookiecliker.js',
        editUrl: 'https://github.com/GroupeZ-dev/groupez-wiki/edit/main/',
      },
    ],
    // zCrate Documentation
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'zcrate',
        path: 'plugins/zcrate/docs',
        routeBasePath: 'zcrate',
        sidebarPath: './sidebars/zcrate.js',
        editUrl: 'https://github.com/GroupeZ-dev/groupez-wiki/edit/main/',
      },
    ],
    // zDrawer Documentation
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'zdrawer',
        path: 'plugins/zdrawer/docs',
        routeBasePath: 'zdrawer',
        sidebarPath: './sidebars/zdrawer.js',
        editUrl: 'https://github.com/GroupeZ-dev/groupez-wiki/edit/main/',
      },
    ],
    // zEssentials Documentation
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'zessentials',
        path: 'plugins/zessentials/docs',
        routeBasePath: 'zessentials',
        sidebarPath: './sidebars/zessentials.js',
        editUrl: 'https://github.com/GroupeZ-dev/groupez-wiki/edit/main/',
      },
    ],
    // zHead Documentation
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'zhead',
        path: 'plugins/zhead/docs',
        routeBasePath: 'zhead',
        sidebarPath: './sidebars/zhead.js',
        editUrl: 'https://github.com/GroupeZ-dev/groupez-wiki/edit/main/',
      },
    ],
    // zItems Documentation
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'zitems',
        path: 'plugins/zitems/docs',
        routeBasePath: 'zitems',
        sidebarPath: './sidebars/zitems.js',
        editUrl: 'https://github.com/GroupeZ-dev/groupez-wiki/edit/main/',
      },
    ],
    // zItemStacker Documentation
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'zitemstacker',
        path: 'plugins/zitemstacker/docs',
        routeBasePath: 'zitemstacker',
        sidebarPath: './sidebars/zitemstacker.js',
        editUrl: 'https://github.com/GroupeZ-dev/groupez-wiki/edit/main/',
      },
    ],
    // zJobs Documentation
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'zjobs',
        path: 'plugins/zjobs/docs',
        routeBasePath: 'zjobs',
        sidebarPath: './sidebars/zjobs.js',
        editUrl: 'https://github.com/GroupeZ-dev/groupez-wiki/edit/main/',
      },
    ],
    // zKoth Documentation
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'zkoth',
        path: 'plugins/zkoth/docs',
        routeBasePath: 'zkoth',
        sidebarPath: './sidebars/zkoth.js',
        editUrl: 'https://github.com/GroupeZ-dev/groupez-wiki/edit/main/',
      },
    ],
    // zQuests Documentation
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'zquests',
        path: 'plugins/zquests/docs',
        routeBasePath: 'zquests',
        sidebarPath: './sidebars/zquests.js',
        editUrl: 'https://github.com/GroupeZ-dev/groupez-wiki/edit/main/',
      },
    ],
    // zShop Documentation
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'zshop',
        path: 'plugins/zshop/docs',
        routeBasePath: 'zshop',
        sidebarPath: './sidebars/zshop.js',
        editUrl: 'https://github.com/GroupeZ-dev/groupez-wiki/edit/main/',
      },
    ],
    // zSpawner Documentation
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'zspawner',
        path: 'plugins/zspawner/docs',
        routeBasePath: 'zspawner',
        sidebarPath: './sidebars/zspawner.js',
        editUrl: 'https://github.com/GroupeZ-dev/groupez-wiki/edit/main/',
      },
    ],
    // zTextGenerator Documentation
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'ztextgenerator',
        path: 'plugins/ztextgenerator/docs',
        routeBasePath: 'ztextgenerator',
        sidebarPath: './sidebars/ztextgenerator.js',
        editUrl: 'https://github.com/GroupeZ-dev/groupez-wiki/edit/main/',
      },
    ],
    // zVault Documentation
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'zvault',
        path: 'plugins/zvault/docs',
        routeBasePath: 'zvault',
        sidebarPath: './sidebars/zvault.js',
        editUrl: 'https://github.com/GroupeZ-dev/groupez-wiki/edit/main/',
      },
    ],
    // zVoteParty Documentation
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'zvoteparty',
        path: 'plugins/zvoteparty/docs',
        routeBasePath: 'zvoteparty',
        sidebarPath: './sidebars/zvoteparty.js',
        editUrl: 'https://github.com/GroupeZ-dev/groupez-wiki/edit/main/',
      },
    ],
    // SuperiorSkyBlock-zMenu Documentation
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'superiorskyblock-zmenu',
        path: 'plugins/superiorskyblock-zmenu/docs',
        routeBasePath: 'superiorskyblock-zmenu',
        sidebarPath: './sidebars/superiorskyblock-zmenu.js',
        editUrl: 'https://github.com/GroupeZ-dev/groupez-wiki/edit/main/',
      },
    ],
    // CurrenciesAPI Documentation
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'currenciesapi',
        path: 'plugins/currenciesapi/docs',
        routeBasePath: 'currenciesapi',
        sidebarPath: './sidebars/currenciesapi.js',
        editUrl: 'https://github.com/GroupeZ-dev/groupez-wiki/edit/main/',
      },
    ],
    // Sarah Documentation
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'sarah',
        path: 'plugins/sarah/docs',
        routeBasePath: 'sarah',
        sidebarPath: './sidebars/sarah.js',
        editUrl: 'https://github.com/GroupeZ-dev/groupez-wiki/edit/main/',
      },
    ],
    // groupez.dev Documentation
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'groupez-dev',
        path: 'plugins/groupez-dev/docs',
        routeBasePath: 'groupez-dev',
        sidebarPath: './sidebars/groupez-dev.js',
        editUrl: 'https://github.com/GroupeZ-dev/groupez-wiki/edit/main/',
      },
    ],
    // serveur-minecraft-vote.fr Documentation
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'serveur-minecraft-vote',
        path: 'plugins/serveur-minecraft-vote/docs',
        routeBasePath: 'serveur-minecraft-vote',
        sidebarPath: './sidebars/serveur-minecraft-vote.js',
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
            label: 'Plugins',
            position: 'left',
            items: [
              {
                type: 'docSidebar',
                sidebarId: 'zantiautoClickSidebar',
                docsPluginId: 'zantiautoclick',
                label: 'zAntiAutoClick',
              },
              {
                type: 'docSidebar',
                sidebarId: 'zauctionhouseSidebar',
                docsPluginId: 'zauctionhouse',
                label: 'zAuctionHouse',
              },
              {
                type: 'docSidebar',
                sidebarId: 'zcookieclikerSidebar',
                docsPluginId: 'zcookiecliker',
                label: 'zCookieCliker',
              },
              {
                type: 'docSidebar',
                sidebarId: 'zcrateSidebar',
                docsPluginId: 'zcrate',
                label: 'zCrate',
              },
              {
                type: 'docSidebar',
                sidebarId: 'zdrawerSidebar',
                docsPluginId: 'zdrawer',
                label: 'zDrawer',
              },
              {
                type: 'docSidebar',
                sidebarId: 'zessentialsSidebar',
                docsPluginId: 'zessentials',
                label: 'zEssentials',
              },
              {
                type: 'docSidebar',
                sidebarId: 'zheadSidebar',
                docsPluginId: 'zhead',
                label: 'zHead',
              },
              {
                type: 'docSidebar',
                sidebarId: 'zitemsSidebar',
                docsPluginId: 'zitems',
                label: 'zItems',
              },
              {
                type: 'docSidebar',
                sidebarId: 'zitemstackerSidebar',
                docsPluginId: 'zitemstacker',
                label: 'zItemStacker',
              },
              {
                type: 'docSidebar',
                sidebarId: 'zjobsSidebar',
                docsPluginId: 'zjobs',
                label: 'zJobs',
              },
              {
                type: 'docSidebar',
                sidebarId: 'zkothSidebar',
                docsPluginId: 'zkoth',
                label: 'zKoth',
              },
              {
                type: 'docSidebar',
                sidebarId: 'zmenuSidebar',
                docsPluginId: 'zmenu',
                label: 'zMenu',
              },
              {
                type: 'docSidebar',
                sidebarId: 'zquestsSidebar',
                docsPluginId: 'zquests',
                label: 'zQuests',
              },
              {
                type: 'docSidebar',
                sidebarId: 'zshopSidebar',
                docsPluginId: 'zshop',
                label: 'zShop',
              },
              {
                type: 'docSidebar',
                sidebarId: 'zspawnerSidebar',
                docsPluginId: 'zspawner',
                label: 'zSpawner',
              },
              {
                type: 'docSidebar',
                sidebarId: 'ztextgeneratorSidebar',
                docsPluginId: 'ztextgenerator',
                label: 'zTextGenerator',
              },
              {
                type: 'docSidebar',
                sidebarId: 'zvaultSidebar',
                docsPluginId: 'zvault',
                label: 'zVault',
              },
              {
                type: 'docSidebar',
                sidebarId: 'zvotepartySidebar',
                docsPluginId: 'zvoteparty',
                label: 'zVoteParty',
              },
            ],
          },
          {
            type: 'dropdown',
            label: 'Projets',
            position: 'left',
            items: [
              {
                type: 'docSidebar',
                sidebarId: 'superiorskyblockZmenuSidebar',
                docsPluginId: 'superiorskyblock-zmenu',
                label: 'SuperiorSkyBlock-zMenu',
              },
              {
                type: 'docSidebar',
                sidebarId: 'currenciesapiSidebar',
                docsPluginId: 'currenciesapi',
                label: 'CurrenciesAPI',
              },
              {
                type: 'docSidebar',
                sidebarId: 'sarahSidebar',
                docsPluginId: 'sarah',
                label: 'Sarah',
              },
              {
                type: 'docSidebar',
                sidebarId: 'groupezDevSidebar',
                docsPluginId: 'groupez-dev',
                label: 'groupez.dev',
              },
              {
                type: 'docSidebar',
                sidebarId: 'serveurMinecraftVoteSidebar',
                docsPluginId: 'serveur-minecraft-vote',
                label: 'serveur-minecraft-vote.fr',
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
            title: 'Community',
            items: [
              {
                label: 'Discord',
                href: 'https://discord.groupez.dev',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/GroupeZ-dev',
              },
              {
                label: 'SpigotMC',
                href: 'https://www.spigotmc.org/resources/authors/maxlego08.45892/',
              },
              {
                label: 'Modrinth',
                href: 'https://modrinth.com/organization/groupez',
              },
              {
                label: 'BuiltByBit',
                href: 'https://builtbybit.com/creators/maxlego08.85132/',
              },
            ],
          },
          {
            title: 'Partners',
            items: [
              {
                label: 'Minestrator',
                href: 'https://minestrator.com/a/GROUPEZ',
              },
              {
                label: 'serveur-minecraft-vote.fr',
                href: 'https://serveur-minecraft-vote.fr/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Minecraft Inventory Builder',
                href: 'https://minecraft-inventory-builder.com',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} GroupeZ. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
        additionalLanguages: ['java', 'yaml', 'json', 'bash'],
      },
    }),
};

export default config;
