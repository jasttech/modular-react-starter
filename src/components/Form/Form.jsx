import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';

export const Form = ({ onSubmit, children, className, options, id, schema }) => {
  const methods = useForm({ ...options, resolver: schema && zodResolver(schema) });
  return (
    <form
      className={clsx('space-y-6', className)}
      onSubmit={methods.handleSubmit(onSubmit)}
      id={id}
    >
      {children(methods)}
    </form>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
  className: PropTypes.string,
  options: PropTypes.shape({}),
  id: PropTypes.string,
  schema: PropTypes.shape({}),
};
