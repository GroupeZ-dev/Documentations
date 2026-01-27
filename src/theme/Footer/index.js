import React from 'react';
import Footer from '@theme-original/Footer';
import BuildInfo from '@site/src/components/BuildInfo';

export default function FooterWrapper(props) {
  return (
    <>
      <Footer {...props} />
      <div
        style={{
          backgroundColor: 'var(--ifm-footer-background-color)',
          borderTop: '1px solid var(--ifm-toc-border-color)',
          padding: '1rem',
          textAlign: 'center',
        }}
      >
        <BuildInfo />
      </div>
    </>
  );
}
