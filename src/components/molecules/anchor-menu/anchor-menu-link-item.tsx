import classNames from 'classnames';
import React, { useId } from 'react';
import Typography from 'components/atoms/typography/typography';
import styles from './anchor-menu.module.scss';

export interface AnchorItem {
  anchorTarget: string;
  anchorTitle: string;
}

const ANCHOR_ID_POSTFIX = '-anchor';

export interface AnchorMenuLinkItemProps {
  isActive: boolean;
  item: AnchorItem;
  onScrollTo: (target: string) => void;
}

const AnchorMenuLinkItem = React.memo(
  ({ item, isActive, onScrollTo }: AnchorMenuLinkItemProps) => {
    const buttonId = useId();
    const id = `${item.anchorTarget}${ANCHOR_ID_POSTFIX}-${buttonId}`;

    return (
      <li className={styles.anchorMenuLinkListItem}>
        <button
          className={styles.anchorMenuLink}
          id={id}
          onClick={() => onScrollTo(item.anchorTarget)}
          onMouseDown={(e) => e.preventDefault()}
        >
          <Typography
            className={classNames(styles.anchorMenuText, {
              [styles.isActive]: isActive,
            })}
            tagStyle="actionMedium"
            weight="semiBold"
          >
            {item.anchorTitle}
          </Typography>
        </button>
      </li>
    );
  },
);
AnchorMenuLinkItem.displayName = 'AnchorMenuLinkItem';

export { ANCHOR_ID_POSTFIX };
export default AnchorMenuLinkItem;
