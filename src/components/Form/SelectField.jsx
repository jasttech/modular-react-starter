import clsx from 'clsx';

import { FieldWrapper } from './FieldWrapper';

export const SelectField = (props) => {
  const { label, options, error, className, defaultValue, registration, placeholder } = props;
  return (
    <FieldWrapper label={label} error={error}>
      <select
        placeholder={placeholder}
        name="location"
        className={clsx(
          'mt-1 block w-full pl-3 pr-10 py-2 text-base dark:border-none dark:bg-gray-700 border-gray-600 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md',
          className
        )}
        defaultValue={defaultValue}
        {...registration}
      >
        {options.map(({ label, value }) => (
          <option key={label?.toString()} value={value}>
            {label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
};
