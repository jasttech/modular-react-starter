import createDOMPurify from 'dompurify';
import marked from 'marked';
import PropTypes from 'prop-types';

const DOMPurify = createDOMPurify(window);

export const MDPreview = ({ value = '' }) => {
  return (
    <div
      className="p-2 w-full prose prose-indigo"
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(marked(value)),
      }}
    />
  );
};

MDPreview.propTypes = {
  value: PropTypes.string,
};
