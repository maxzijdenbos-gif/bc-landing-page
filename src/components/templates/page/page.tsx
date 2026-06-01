import React from 'react';
import { ContentModule } from 'components/utilities/content-modules/content-modules';
import ModuleList, {
  ModuleListProps,
} from 'components/utilities/content-modules/module-list/module-list';

export interface PageProps extends ModuleListProps {
  /** An array of the modules to show */
  modules: ContentModule[];
  pageColor?: BackgroundColor;
  topModules?: ContentModule[];
}

const Page = ({ modules, topModules, pageColor }: PageProps) => {
  return (
    <React.Fragment>
      {topModules && <ModuleList modules={topModules} pageColor={pageColor} />}
      {modules && <ModuleList modules={modules} pageColor={pageColor} />}
    </React.Fragment>
  );
};

Page.displayName = 'Page';

export default Page;
