import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

const REPO_OWNER = 'GroupeZ-dev';
const REPO_NAME = 'documentations';
const BRANCH = 'main';

export default function BuildInfo() {
  const [buildData, setBuildData] = useState({
    sha: 'loading...',
    date: '-',
    url: '#',
  });

  useEffect(() => {
    async function fetchBuildInfo() {
      try {
        const commitResponse = await fetch(
          `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/commits?sha=${BRANCH}&per_page=1`
        );

        if (commitResponse.ok) {
          const commits = await commitResponse.json();

          if (commits.length > 0) {
            const latestCommit = commits[0];
            setBuildData({
              sha: latestCommit.sha.substring(0, 7),
              date: new Date(latestCommit.commit.author.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              }),
              url: latestCommit.html_url,
            });
          }
        }
      } catch (error) {
        setBuildData({
          sha: 'unknown',
          date: '-',
          url: '#',
        });
      }
    }

    fetchBuildInfo();
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <div className={styles.buildInfo}>
      <span className={styles.copyright}>
        Copyright © {currentYear} <a href="https://groupez.dev" target="_blank" rel="noopener noreferrer" className={styles.buildLink}>GroupeZ</a>
      </span>
      <span className={styles.separator}>|</span>
      <span className={styles.buildDot} />
      <span>
        Build{' '}
        <a
          href={buildData.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.buildLink}
        >
          #{buildData.sha}
        </a>
      </span>
      <span className={styles.separator}>|</span>
      <span>{buildData.date}</span>
    </div>
  );
}
