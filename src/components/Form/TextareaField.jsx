import clsx from 'clsx';
import * as Emoji from 'quill-emoji';
import ReactQuill, { Quill } from 'react-quill';

import 'react-quill/dist/quill.snow.css';
import 'quill-emoji/dist/quill-emoji.css';
import { FieldWrapper } from './FieldWrapper';

Quill.register('modules/emoji', Emoji);

export const TextAreaField = (props) => {
  const { label, className, value, placeholder, error, setValue, editorContent } = props;
  const onEditorStateChange = (editorState) => {
    setValue(value, editorState);

    // if (props.onChange) {
    //   props.onChange({
    //     html: editorState.html,
    //     markdown: htmlToMarkdown(editorState.html),
    //   });
    // }
  };

  const TOOLBAR_OPTIONS = [
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    ['blockquote', 'code-block'],

    [{ header: 1 }, { header: 2 }], // custom button values
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
    [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
    [{ direction: 'rtl' }], // text direction

    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
    ['clean'],
  ];

  return (
    <FieldWrapper label={label} error={error}>
      <ReactQuill
        theme="snow"
        placeholder={placeholder}
        className={clsx(
          'appearance-none block w-full border-none placeholder-gray-400 focus:outline-none sm:text-sm',
          className
        )}
        modules={{
          toolbar: {
            container: TOOLBAR_OPTIONS,
          },
          'emoji-toolbar': true,
          'emoji-textarea': false,
          'emoji-shortname': true,
        }}
        value={editorContent || ''}
        onChange={onEditorStateChange}
      />
    </FieldWrapper>
  );
};
