import ReactMarkdown from 'react-markdown';

export default function Viewer(props) {
  return <ReactMarkdown>{props.value}</ReactMarkdown>;
}
