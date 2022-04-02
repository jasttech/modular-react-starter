import { Spinner } from './Spinner';

const meta = {
  title: 'Components/Elements/Spinner',
  component: Spinner,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template = (props) => <Spinner {...props} />;

export const Default = Template.bind({});
Default.args = {};
