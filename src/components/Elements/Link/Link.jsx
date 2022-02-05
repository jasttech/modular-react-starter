import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';

export const Link = ({ className, children, ...props }) => {
  return (
    <RouterLink className={clsx('text-indigo-600 hover:text-indigo-900', className)} {...props}>
      {children}
    </RouterLink>
  );
};

Link.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
