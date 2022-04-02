import PropTypes from 'prop-types';
import * as React from 'react';

import { Head } from '../Head';

export const ContentLayout = ({ children, title }) => {
  return (
    <>
      <Head title={title} />
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-400">{title}</h1>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">{children}</div>
      </div>
    </>
  );
};

ContentLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
