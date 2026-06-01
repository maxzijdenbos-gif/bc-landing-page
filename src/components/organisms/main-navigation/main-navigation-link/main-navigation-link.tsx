import classNames from 'classnames';
import Typography from 'components/atoms/typography/typography';
import Link from 'components/utilities/link/link';
import styles from './main-navigation-link.module.scss';

interface MainNavigationLinkProps {
  className?: string;
  isCurrentPathId?: boolean;
  isHighlighted?: boolean;
  isTabbable: boolean;
  link: BaseLink;
  onClick?: () => void;
  toggleMenuDrawer: () => void;
}

const MainNavigationLink = ({
  className,
  isCurrentPathId,
  isHighlighted,
  isTabbable,
  link,
  onClick,
  toggleMenuDrawer,
}: MainNavigationLinkProps) => {
  if (!link) return;

  return (
    <Typography
      className={classNames(styles.component, className)}
      tag="li"
      tagStyle={'bodyMedium'}
      weight={'semiBold'}
    >
      <Link
        className={classNames(styles.linkListItem, styles.doUnderline, {
          [styles.isCurrentPathId]: isCurrentPathId,
          [styles.isHighlighted]: isHighlighted,
        })}
        link={link}
        onClick={() => {
          toggleMenuDrawer();
          onClick?.();
        }}
        tabIndex={isTabbable ? 0 : -1}
        target={link?.target}
      >
        {link?.linkText}
      </Link>
    </Typography>
  );
};

MainNavigationLink.displayName = 'MainNavigationLink';

export default MainNavigationLink;
