import { AuthorAndDateProps } from './author-and-date';

const defaultStub: AuthorAndDateProps = {
  authorName: 'Name Nameson',
  publishingDate: '2024-02-02',
};
const onlyName: AuthorAndDateProps = {
  authorName: 'Name Nameson',
  publishingDate: undefined,
};
const onlyDate: AuthorAndDateProps = {
  authorName: undefined,
  publishingDate: '2024-02-02',
};

export default <Record<string, AuthorAndDateProps>>{
  default: defaultStub,
  onlyDate: onlyDate,
  onlyName: onlyName,
};
