import classNames from 'classnames';
import { useRef } from 'react';
import Icon from 'components/atoms/icon/icon';
import Typography, {
  TypographyStyle,
} from 'components/atoms/typography/typography';
import Link from 'components/utilities/link/link';
import { NavigationHierarchyNode } from 'integrations/content/amplience/endpoints/navigation/navigation.types';
import styles from './main-navigation-primary-link.module.scss';

interface MainNavigationPrimaryButtonProps {
  isTabbable: boolean;
  link: NavigationHierarchyNode;
  onClick: (options?: { viaKeyboard?: boolean }) => void;
  onLinkClick?: () => void;
  tagStyle?: TypographyStyle;
}

const MainNavigationPrimaryButton = ({
  link,
  onClick,
  onLinkClick,
  isTabbable,
  tagStyle = 'headlineLarge',
}: MainNavigationPrimaryButtonProps) => {
  const activatedViaKeyboardRef = useRef(false);
  const linkObject = link.linkObject?.[0];
  const hasLink = !!(
    linkObject?.modalId ||
    linkObject?.internalLink ||
    linkObject?.externalLink ||
    linkObject?.internalLinkRef?.[0]
  );

  if (hasLink && linkObject) {
    return (
      <li key={link.title} className={styles.component}>
        <Link
          className={classNames(styles.linkListItem, styles.linkListDeeper)}
          link={linkObject}
          onClick={onLinkClick}
          tabIndex={isTabbable ? 0 : -1}
        >
          <Typography tagStyle={tagStyle} weight={'bold'}>
            {link.title}
          </Typography>
          <Icon className={styles.arrow} name="ChevronRight_16" hidden />
        </Link>
      </li>
    );
  }

  return (
    <li key={link.title} className={styles.component}>
      <button
        className={classNames(styles.linkListItem, styles.linkListDeeper)}
        onClick={() => {
          if (activatedViaKeyboardRef.current) {
            activatedViaKeyboardRef.current = false;
            return;
          }
          onClick({ viaKeyboard: false });
        }}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && isTabbable) {
            e.preventDefault();
            activatedViaKeyboardRef.current = true;
            onClick({ viaKeyboard: true });
          }
        }}
        tabIndex={isTabbable ? 0 : -1}
      >
        <Typography tagStyle={tagStyle} weight={'bold'}>
          {link.title}
        </Typography>
        <Icon className={styles.arrow} name="ChevronRight_16" hidden />
      </button>
    </li>
  );
};

MainNavigationPrimaryButton.displayName = 'MainNavigationPrimaryLink';

export default MainNavigationPrimaryButton;
