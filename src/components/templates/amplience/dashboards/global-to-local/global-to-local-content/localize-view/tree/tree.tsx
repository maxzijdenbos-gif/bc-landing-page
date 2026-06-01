import { ContentPageResponse } from 'integrations/content/amplience/types/content-types';
import TreeNode from './tree-node';
import styles from './tree.module.scss';

export interface TreeHierarchyData {
  children?: TreeHierarchyData[];
  content: ContentPageResponse;
  contentItemSchemaId: string;
}

const Tree = ({
  data,
  setParentId,
  parentId,
  contentItemSchemaId,
}: {
  contentItemSchemaId: string;
  data: TreeHierarchyData;
  parentId: string | undefined;
  setParentId: (id: string) => void;
}) => {
  return (
    <div className={styles.component}>
      <div className={styles.tree}>
        <TreeNode
          contentItemSchemaId={contentItemSchemaId}
          node={data}
          parentId={parentId}
          setParentId={setParentId}
        />
      </div>
    </div>
  );
};

export default Tree;
