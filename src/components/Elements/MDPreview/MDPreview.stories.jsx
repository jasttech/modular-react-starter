import { MDPreview } from './MDPreview';

const meta = {
  title: 'Components/Elements/MDPreview',
  component: MDPreview,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template = (props) => <MDPreview {...props} />;

export const Default = Template.bind({});
Default.args = {
  value: `## Hello World`,
};
