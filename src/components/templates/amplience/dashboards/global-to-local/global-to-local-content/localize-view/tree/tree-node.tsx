import { useQueryClient } from '@tanstack/react-query';
import classNames from 'classnames';
import React from 'react';
import Typography from 'components/atoms/typography/typography';
import { ALLOWED_SCHEMAS_QUERY_KEY } from '../..';
import { TreeHierarchyData } from './tree';
import styles from './tree.module.scss';

const TreeNode = ({
  node,
  setParentId,
  parentId,
  contentItemSchemaId,
}: {
  contentItemSchemaId: string;
  node: TreeHierarchyData;
  parentId: string | undefined;
  setParentId: (id: string) => void;
}) => {
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData<Record<string, string[]>>([
    ALLOWED_SCHEMAS_QUERY_KEY,
  ]);
  const isSelected = parentId === node.content._meta.deliveryId;
  const isAllowed =
    data && data[node.content._meta.schema]?.includes(contentItemSchemaId);

  return (
    <div className={styles.treeNode}>
      <Typography
        className={classNames(styles.treeNodeButton, {
          [styles.disabled]: !isAllowed,
        })}
        onClick={() => {
          isAllowed &&
            node.content._meta.deliveryId &&
            setParentId(node.content._meta.deliveryId);
        }}
        tag="button"
        tagStyle="bodyLarge"
        weight={isSelected ? 'bold' : undefined}
      >
        {node.content._meta.name}
      </Typography>
      {node.children && node.children.length > 0 && (
        <React.Fragment>
          {node.children.map((child) => (
            <TreeNode
              key={child.content._meta.deliveryId}
              contentItemSchemaId={contentItemSchemaId}
              node={child}
              parentId={parentId}
              setParentId={setParentId}
            />
          ))}
        </React.Fragment>
      )}
    </div>
  );
};

export default TreeNode;
