import HierarchyChooserTemplate from 'components/templates/amplience/extensions/hierarchy-chooser';
import withIframeRestriction from 'libraries/hocs/with-iframe-restriction';

const HierarchyChooser = () => {
  return <HierarchyChooserTemplate />;
};

export default withIframeRestriction(HierarchyChooser);
