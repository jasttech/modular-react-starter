import clsx from 'clsx';

export const FieldWrapper = (props) => {
  const { label, className, error, children } = props;
  return (
    <div>
      <label
        className={clsx('block text-sm font-medium text-gray-700 dark:text-gray-400', className)}
      >
        {label}
        <div className="mt-1">{children}</div>
      </label>
      {error?.message && (
        <div role="alert" aria-label={error.message} className="text-sm font-semibold text-red-500">
          {error.message}
        </div>
      )}
    </div>
  );
};
