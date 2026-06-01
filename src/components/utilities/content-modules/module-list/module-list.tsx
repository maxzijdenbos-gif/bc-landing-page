import React from 'react';
import {
  ContentModule,
  getModuleComponent,
} from 'components/utilities/content-modules/content-modules';

export interface ModuleListProps {
  /** An array of the modules to show */
  modules: ContentModule[];
  pageColor?: BackgroundColor;
}

const ModuleList = ({ modules, pageColor }: ModuleListProps) => {
  return (
    <React.Fragment>
      {modules?.map((module, moduleIndex) => {
        const { component: ModuleComponent, props } = getModuleComponent(
          module.name,
          module.data,
        );
        const moduleColor = props.color ?? pageColor;

        if (!ModuleComponent) return null;

        return (
          <ModuleComponent key={moduleIndex} {...props} color={moduleColor} />
        );
      })}
    </React.Fragment>
  );
};

ModuleList.displayName = 'ModuleList';

export default ModuleList;
