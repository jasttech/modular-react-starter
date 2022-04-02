import logo from '@/assets/logo.svg';
import { Link } from '@/components/Elements';
import { Head } from '@/components/Head';
import PropTypes from 'prop-types';

export const Layout = ({ children, title }) => {
  return (
    <>
      <Head title={title} />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Link className="flex items-center text-white" to="/">
              <img className="h-24 w-auto" src={logo} alt="Workflow" />
            </Link>
          </div>

          <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            {title}
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
};
