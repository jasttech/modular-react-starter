import { Link } from './Link';

const meta = {
  title: 'Components/Elements/Link',
  component: Link,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template = (props) => (
  <Link to="/" {...props}>
    Hello
  </Link>
);

export const Default = Template.bind({});
Default.args = {};
