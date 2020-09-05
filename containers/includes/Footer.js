import React from 'react';
import Footer from 'components/includes/Footer';
import { version } from 'package.json';

const FooterContainer = () => {
  return <Footer version={version} year={new Date().getFullYear()} />;
};

export default FooterContainer;
