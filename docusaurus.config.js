// @ts-check
import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'zMenu',
  tagline: 'The most powerful inventory plugin for Minecraft',
  favicon: 'img/favicon.ico',

  future: {
    v4: true,
  },

  url: 'https://zmenu.groupez.dev',
  baseUrl: '/',

  organizationName: 'Maxlego08',
  projectName: 'zMenu',

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

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          editUrl: 'https://github.com/Maxlego08/zMenu/tree/master/docs/',
        },
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
      image: 'img/zmenu-social-card.jpg',
      colorMode: {
        defaultMode: 'dark',
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: 'zMenu',
        logo: {
          alt: 'zMenu Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://www.spigotmc.org/resources/zmenu.110402/',
            label: 'SpigotMC',
            position: 'right',
          },
          {
            href: 'https://discord.groupez.dev',
            label: 'Discord',
            position: 'right',
          },
          {
            href: 'https://github.com/Maxlego08/zMenu',
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
            title: 'Documentation',
            items: [
              {
                label: 'Getting Started',
                to: '/docs/getting-started',
              },
              {
                label: 'Installation',
                to: '/docs/installation',
              },
              {
                label: 'Configuration',
                to: '/docs/configurations/informations',
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
                href: 'https://www.spigotmc.org/resources/zmenu.110402/',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/Maxlego08/zMenu',
              },
              {
                label: 'zMenu+',
                href: 'https://minecraft-inventory-builder.com/resources/zmenu-addon',
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
