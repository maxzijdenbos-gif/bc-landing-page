import classNames from 'classnames';
import type { HTMLAttributes } from 'react';
import Typography from 'components/atoms/typography/typography';
import Link from 'components/utilities/link/link';
import styles from './message-bar.module.scss';

export type MessageBarVariant = 'Primary' | 'Secondary' | 'Tertiary';

export interface MessageBarProps extends HTMLAttributes<HTMLDivElement> {
  link?: string | null;
  linkText: string;
  message: string;
  variant?: MessageBarVariant;
}

const MessageBar = ({
  className,
  link,
  linkText,
  message,
  variant = 'Primary',
  ...rest
}: MessageBarProps) => {
  const href = link?.trim();
  const showLink = Boolean(href && linkText.trim());

  const messageNode = (
    <Typography tag="span" tagStyle="bodyMedium" className={styles.message}>
      {message}
    </Typography>
  );

  return (
    <div
      className={classNames(
        styles.component,
        {
          [styles.isPrimary]: variant === 'Primary',
          [styles.isSecondary]: variant === 'Secondary',
          [styles.isTertiary]: variant === 'Tertiary',
        },
        className,
      )}
      {...rest}
    >
      {showLink ? (
        <Link
          className={styles.anchor}
          link={{ externalLink: href, linkText }}
          rel="noopener noreferrer"
          target="_blank"
        >
          {messageNode} <span className={styles.linkText}>{linkText}</span>
        </Link>
      ) : (
        messageNode
      )}
    </div>
  );
};

MessageBar.displayName = 'MessageBar';

export default MessageBar;
