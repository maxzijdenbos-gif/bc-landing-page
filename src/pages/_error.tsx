import type { NextPage } from 'next';
import DefaultPageLayout from 'components/layouts/default-page-layout/default-page-layout';
import Error from 'components/templates/error/error';
import { PageAdapter } from 'integrations/content/amplience/page/page.types';

interface CustomErrorProps extends PageAdapter {
  message: string;
}

const CustomError: NextPage<CustomErrorProps> = ({
  message = 'An error occurred',
  ...rest
}) => {
  return (
    <DefaultPageLayout {...rest}>
      <Error headline={message} />
    </DefaultPageLayout>
  );
};

export default CustomError;
