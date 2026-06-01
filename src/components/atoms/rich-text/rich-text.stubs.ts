import { RichTextProps } from './rich-text';

const defaultStub: RichTextProps = {
  text: `## This is a headline

### This is a headline

#### This is a headline

This is a body copy with a **strong** *italic* <u>underline</u>, an [internal link](/)
and an [external link](https://google.com)`,
};

export default <Record<string, RichTextProps>>{
  default: defaultStub,
};
