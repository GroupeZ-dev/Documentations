import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    titleId: 'features.customizable.title',
    titleDefault: 'Highly Customizable',
    descriptionId: 'features.customizable.description',
    descriptionDefault: 'Create beautiful inventories with 9 built-in button types, 28+ action types, and full control over every aspect of your menus.',
  },
  {
    titleId: 'features.configuration.title',
    titleDefault: 'Easy Configuration',
    descriptionId: 'features.configuration.description',
    descriptionDefault: 'Simple YAML configuration with support for patterns, placeholders, and hot-reloading. No coding required for most use cases.',
  },
  {
    titleId: 'features.integration.title',
    titleDefault: 'Extensive Integration',
    descriptionId: 'features.integration.description',
    descriptionDefault: 'Full support for PlaceholderAPI, ItemsAdder, Oraxen, HeadDatabase, LuckPerms, and many more popular plugins.',
  },
];

function Feature({titleId, titleDefault, descriptionId, descriptionDefault}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">
          <Translate id={titleId}>{titleDefault}</Translate>
        </Heading>
        <p>
          <Translate id={descriptionId}>{descriptionDefault}</Translate>
        </p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
