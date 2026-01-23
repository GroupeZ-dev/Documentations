import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import Heading from '@theme/Heading';
import styles from './index.module.css';

const PluginList = [
  {
    title: 'zMenu',
    description: (
      <Translate id="plugin.zmenu.description">
        The most powerful inventory plugin for Minecraft. Create custom GUIs with YAML configuration.
      </Translate>
    ),
    link: '/zmenu/getting-started',
    icon: '📦',
    color: '#4CAF50',
  },
  {
    title: 'zAuctionHouse',
    description: (
      <Translate id="plugin.zauctionhouse.description">
        A complete auction house system with categories, bidding, and seamless zMenu integration.
      </Translate>
    ),
    link: '/zauctionhouse/introduction',
    icon: '🏪',
    color: '#2196F3',
  },
  {
    title: 'zTransaction',
    description: (
      <Translate id="plugin.ztransaction.description">
        Track and manage player transactions with detailed logging and statistics.
      </Translate>
    ),
    link: '/ztransaction/introduction',
    icon: '💰',
    color: '#FF9800',
  },
];

function PluginCard({title, description, link, icon, color}) {
  return (
    <div className={clsx('col col--4', styles.pluginCol)}>
      <Link to={link} className={styles.pluginCardLink}>
        <div className={styles.pluginCard} style={{'--card-color': color}}>
          <div className={styles.pluginIcon}>{icon}</div>
          <Heading as="h3" className={styles.pluginTitle}>{title}</Heading>
          <p className={styles.pluginDescription}>{description}</p>
          <span className={styles.pluginButton}>
            <Translate id="homepage.viewDocs">View Documentation</Translate> →
          </span>
        </div>
      </Link>
    </div>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">
          <Translate id="homepage.tagline">
            Documentation for GroupeZ Minecraft plugins
          </Translate>
        </p>
      </div>
    </header>
  );
}

function PluginSection() {
  return (
    <section className={styles.plugins}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          <Translate id="homepage.selectPlugin">Select a Plugin</Translate>
        </Heading>
        <div className="row">
          {PluginList.map((props, idx) => (
            <PluginCard key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          <div className="col col--4">
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>⚡</div>
              <Heading as="h3">
                <Translate id="homepage.feature1.title">High Performance</Translate>
              </Heading>
              <p>
                <Translate id="homepage.feature1.description">
                  All plugins are optimized for performance, even on large servers.
                </Translate>
              </p>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🔧</div>
              <Heading as="h3">
                <Translate id="homepage.feature2.title">Easy Configuration</Translate>
              </Heading>
              <p>
                <Translate id="homepage.feature2.description">
                  Simple YAML configuration with extensive documentation.
                </Translate>
              </p>
            </div>
          </div>
          <div className="col col--4">
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🛠️</div>
              <Heading as="h3">
                <Translate id="homepage.feature3.title">Developer API</Translate>
              </Heading>
              <p>
                <Translate id="homepage.feature3.description">
                  Comprehensive APIs for extending functionality with your own plugins.
                </Translate>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <Layout
      title={translate({id: 'homepage.title', message: 'Home'})}
      description={translate({id: 'homepage.description', message: 'GroupeZ Wiki - Documentation for Minecraft plugins'})}>
      <HomepageHeader />
      <main>
        <PluginSection />
        <FeaturesSection />
      </main>
    </Layout>
  );
}
