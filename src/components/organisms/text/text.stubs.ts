import { TextProps } from 'components/organisms/text/text';

const defaultStub: TextProps = {
  headline: 'This is a headline with extra words',
  text: '<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><ul><li>This is a list item</li><li>This is a list item</li><li>This is a list item</li><li>This is a list item</li></ul>',
};

export default <Record<string, TextProps>>{
  default: defaultStub,
};
