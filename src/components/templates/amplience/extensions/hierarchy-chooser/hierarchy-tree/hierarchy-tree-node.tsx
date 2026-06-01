import classNames from 'classnames';
import React from 'react';
import Icon from 'components/atoms/icon/icon';
import Typography from 'components/atoms/typography/typography';
import { useInternalLinksContext } from 'libraries/contexts/internal-navigation-context';
import { InternalLinkSettings, PayloadType } from '..';
import { TreeHierarchyData } from './hierarchy-tree';
import styles from './hierarchy-tree.module.scss';

const CONTENT_LINK_SCHEMA =
  'http://bigcontent.io/cms/schema/v1/core#/definitions/content-link';

const CONTENT_REFERENCE_SCHEMA =
  'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference';

const HierarchyTreeNode = ({
  contentTypes,
  node,
  payloadType,
  setSelectedItem,
  selectedItems,
  maxItems,
}: {
  contentTypes: string[];
  maxItems: number;
  node: TreeHierarchyData;
  payloadType: PayloadType;
  selectedItems: InternalLinkSettings[];
  setSelectedItem: (id: InternalLinkSettings[]) => void;
}) => {
  const isSelected = selectedItems.some(
    (item) => item.reference.id === node.content?._meta.deliveryId,
  );
  const isAllowed =
    !!node.content && contentTypes?.includes(node.content._meta.schema);

  const { internalLinks } = useInternalLinksContext();

  const isPublishedNode =
    node.content?._meta.deliveryId !== undefined &&
    internalLinks?.[node.content._meta.deliveryId];

  const onClickHandler = () => {
    if (!node.content?._meta.deliveryId) return;

    if (!isAllowed && selectedItems.length < maxItems) return;

    if (isSelected) {
      const filteredSelectedItems = selectedItems.filter(
        (item) => item.reference.id !== node.content?._meta.deliveryId,
      );

      return setSelectedItem(filteredSelectedItems);
    }

    const payload: InternalLinkSettings[] = [
      {
        reference: {
          _meta: {
            schema:
              payloadType === 'content-reference'
                ? CONTENT_REFERENCE_SCHEMA
                : CONTENT_LINK_SCHEMA,
          },
          contentType: node.content._meta.schema,
          id: node.content._meta.deliveryId,
        },

        text: node.content._meta.name ?? 'Missing name',
      },
    ];

    setSelectedItem(selectedItems?.concat(payload));
  };

  return (
    <div className={styles.treeNode}>
      <Typography
        className={classNames(styles.treeNodeButton, {
          [styles.disabled]:
            !isAllowed || (!isSelected && selectedItems.length >= maxItems),
        })}
        onClick={onClickHandler}
        tag="button"
        tagStyle="bodyLarge"
        weight={isSelected ? 'bold' : undefined}
      >
        {node.content?._meta.name}
        <span
          className={classNames(
            styles.publicationIndicator,
            isPublishedNode && styles.isPublishedNode,
          )}
        >
          {!isPublishedNode && <Icon name="Close_16" hidden />}
          <span className={styles.infoText}>
            {' '}
            {isPublishedNode ? 'Available' : 'Not published'}
          </span>
        </span>
      </Typography>
      {node.children && node.children.length > 0 && (
        <React.Fragment>
          {node.children
            .filter(({ content }) => !!content?._meta?.deliveryId)
            .map((child) => (
              <HierarchyTreeNode
                key={child.content?._meta.deliveryId}
                contentTypes={contentTypes}
                maxItems={maxItems}
                node={child}
                payloadType={payloadType}
                selectedItems={selectedItems}
                setSelectedItem={setSelectedItem}
              />
            ))}
        </React.Fragment>
      )}
    </div>
  );
};

export default HierarchyTreeNode;
