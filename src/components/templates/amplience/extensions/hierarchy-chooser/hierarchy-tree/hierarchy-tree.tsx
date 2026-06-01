import { useState } from 'react';
import Typography from 'components/atoms/typography/typography';
import Button from 'components/molecules/button/button';
import { ContentPageResponse } from 'integrations/content/amplience/types/content-types';
import { InternalLinkSettings, PayloadType } from '..';
import HierarchyTreeNode from './hierarchy-tree-node';
import styles from './hierarchy-tree.module.scss';

export interface TreeHierarchyData {
  children?: TreeHierarchyData[];
  content?: ContentPageResponse;
}

const HierarchyTree = ({
  maxItems,
  data,
  selectedItems,
  payloadType,
  setSelectedItem,
  contentTypes,
}: {
  contentTypes: string[];
  data: TreeHierarchyData;
  maxItems: number;
  payloadType: PayloadType;
  selectedItems: InternalLinkSettings[];
  setSelectedItem: (item: InternalLinkSettings[]) => void;
}) => {
  const [selectedNodes, setSelectedNodes] =
    useState<InternalLinkSettings[]>(selectedItems);

  if (maxItems > 1) {
    return (
      <div className={styles.component}>
        <div className={styles.buttonGroup}>
          {selectedNodes.length >= maxItems && (
            <Typography tag="span" tagStyle="actionSmall">
              Reached maximum selectedItems: {maxItems}
            </Typography>
          )}
          <Button
            disabled={selectedNodes.length === 0}
            onClick={() => {
              setSelectedItem(selectedNodes);
            }}
            size="small"
            text="Add Links"
          />
          <Button
            onClick={() => {
              setSelectedItem(selectedItems);
            }}
            size="small"
            text="Cancel"
            variant="Secondary"
          />
        </div>
        <div className={styles.tree}>
          <HierarchyTreeNode
            contentTypes={contentTypes}
            maxItems={maxItems}
            node={data}
            payloadType={payloadType}
            selectedItems={selectedNodes}
            setSelectedItem={setSelectedNodes}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.component}>
      <div className={styles.tree}>
        <HierarchyTreeNode
          contentTypes={contentTypes}
          maxItems={maxItems}
          node={data}
          payloadType={payloadType}
          selectedItems={selectedItems}
          setSelectedItem={setSelectedItem}
        />
      </div>
    </div>
  );
};

export default HierarchyTree;
