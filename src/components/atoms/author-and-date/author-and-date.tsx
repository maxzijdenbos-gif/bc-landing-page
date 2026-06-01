import classNames from 'classnames';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import MotionFade from 'components/utilities/motion/transitions/motion-fade/motion-fade';
import { formatDateString } from 'libraries/formatters/format-date';
import { getLocaleFromAsPath } from 'libraries/getters/get-locale';
import Typography from '../typography/typography';
import styles from './author-and-date.module.scss';

export type AuthorName = string;
export type Date = string;

export interface AuthorAndDateProps {
  authorName?: AuthorName;
  className?: string;
  publishingDate?: Date;
}

const AuthorAndDate = ({
  authorName,
  className,
  publishingDate,
}: AuthorAndDateProps) => {
  const router = useRouter();
  const locale = getLocaleFromAsPath(router.asPath);

  const displayDate = useMemo((): Date | undefined => {
    if (publishingDate === undefined) return undefined;
    return publishingDate
      ? formatDateString(publishingDate, locale)
      : publishingDate;
  }, [publishingDate, locale]);

  return (
    <MotionFade delay="speed-short">
      <div className={classNames(styles.component, className)}>
        {authorName && <Typography weight="semiBold">{authorName}</Typography>}
        {authorName && displayDate && (
          <Typography className={styles.divider} weight="semiBold">
            |
          </Typography>
        )}
        {displayDate && (
          <Typography weight="semiBold">{displayDate}</Typography>
        )}
      </div>
    </MotionFade>
  );
};

AuthorAndDate.displayName = 'AuthorAndDate';

export default AuthorAndDate;
