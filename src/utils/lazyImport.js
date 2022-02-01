import PropTypes from 'prop-types';
import * as React from 'react';

// named imports for React.lazy: https://github.com/facebook/react/issues/14603#issuecomment-726551598
export function lazyImport(factory, name) {
  return Object.create({
    [name]: React.lazy(() => factory().then((module) => ({ default: module[name] }))),
  });
}

lazyImport.propTypes = {
  factory: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
// Usage
// const { Home } = lazyImport(() => import("./Home"), "Home");
