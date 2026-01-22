import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Highly Customizable',
    description: (
      <>
        Create beautiful inventories with 9 built-in button types, 28+ action types,
        and full control over every aspect of your menus.
      </>
    ),
  },
  {
    title: 'Easy Configuration',
    description: (
      <>
        Simple YAML configuration with support for patterns, placeholders, and
        hot-reloading. No coding required for most use cases.
      </>
    ),
  },
  {
    title: 'Extensive Integration',
    description: (
      <>
        Full support for PlaceholderAPI, ItemsAdder, Oraxen, HeadDatabase,
        LuckPerms, and many more popular plugins.
      </>
    ),
  },
];

function Feature({title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
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
