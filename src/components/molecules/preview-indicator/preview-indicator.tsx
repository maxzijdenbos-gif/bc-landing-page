import classNames from 'classnames';
import config from 'next.config';
import { useRouter } from 'next/router';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Typography from 'components/atoms/typography/typography';
import Button from 'components/molecules/button/button';
import { getCookie } from 'libraries/getters/get-cookie';
import { stripConfiguredBasePath } from 'libraries/getters/get-locale';
import styles from './preview-indicator.module.scss';

const TIMER_UPDATE_FREQUENCY = 500;
const COPIED_FEEDBACK_TIME = 3000;

function getPreviewTokenFromCookie(): string | null {
  return getCookie('previewToken');
}

const formatLocalTime = (isoString: string): string =>
  new Date(isoString).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

function fallbackCopy(text: string): void {
  const textArea = document.createElement('textarea');

  textArea.value = text;
  textArea.style.position = 'fixed';
  textArea.style.opacity = '0';
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
}

function copyToClipboard(text: string): void {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') {
    console.warn('Clipboard not available. Text:\n', text);

    return;
  }

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}

interface PreviewIndicatorProps {
  previewSessionDurationSeconds: number;
  previewSessionIssuedAt: string;
  stagingEnvironment: string;
  timestamp?: string;
  tokenExpiresAt: string;
}

const PreviewIndicator = ({
  previewSessionDurationSeconds,
  previewSessionIssuedAt,
  timestamp,
  tokenExpiresAt,
}: PreviewIndicatorProps) => {
  const router = useRouter();
  const [showTokenInfo, setShowTokenInfo] = useState(false);
  const [isMini, setIsMini] = useState(false);
  const token = useMemo(() => getPreviewTokenFromCookie(), []);
  const [displayCopyFeedback, setDisplayCopyFeedback] = useState(false);

  const sessionEndsAt = useRef<number>(
    new Date(previewSessionIssuedAt).getTime() +
      previewSessionDurationSeconds * 1000,
  );
  const tokenEndsAt = useRef<number>(new Date(tokenExpiresAt).getTime());

  const getSessionTimeLeft = useCallback(() => {
    const msLeft = sessionEndsAt.current - Date.now();

    if (msLeft <= 0) return undefined;
    const minutes = Math.floor(msLeft / 60000);
    const seconds = Math.floor((msLeft % 60000) / 1000);

    return `${minutes}m ${seconds}s`;
  }, []);

  const [timeLeft, setTimeLeft] = useState<string | undefined>(undefined);
  const [sessionExpired, setSessionExpired] = useState(false);
  const [tokenExpired, setTokenExpired] = useState(false);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();

      setSessionExpired(sessionEndsAt.current <= now);
      setTokenExpired(tokenEndsAt.current <= now);
      setTimeLeft(getSessionTimeLeft());
    };

    tick();
    const intervalId = setInterval(tick, TIMER_UPDATE_FREQUENCY);

    return () => clearInterval(intervalId);
  }, [getSessionTimeLeft]);

  if (
    !previewSessionIssuedAt ||
    !previewSessionDurationSeconds ||
    !router.isReady
  )
    return null;

  const pageDeliveryKey = stripConfiguredBasePath(
    router.asPath.split('?')[0].split('#')[0] || '',
  ).replace(/^\/|\/$/g, '');
  const renewUrl = `${config.basePath}/api/amplience/preview?token=${token}&deliveryKey=${pageDeliveryKey}&action=renew${
    timestamp ? '&timestamp=' + Date.parse(timestamp) : ''
  }`;
  const stopUrl = `${config.basePath}/api/amplience/preview?deliveryKey=${pageDeliveryKey}&action=stop`;

  const handleRenew = () => (window.location.href = renewUrl);
  const handleStop = () => (window.location.href = stopUrl);

  return (
    <div
      className={classNames(
        styles.component,
        (tokenExpired || sessionExpired) && styles.isError,
        showTokenInfo && styles.isExpanded,
        isMini && styles.isMinified,
      )}
      role="presentation"
      tabIndex={-1}
    >
      <div className={styles.headerRow}>
        <Typography tagStyle="bodyLarge" weight="bold">
          {tokenExpired
            ? 'Your Preview Link Has Expired'
            : sessionExpired
              ? 'Your Preview Session Has Ended'
              : "You're in Preview Mode"}
        </Typography>
        <Typography tagStyle="bodyMedium">
          {timeLeft
            ? `Session ends in ${timeLeft}.`
            : !tokenExpired
              ? "Preview session has ended, but your token is still valid. To restart preview mode, click 'Restart Preview Mode'."
              : 'Both your preview session and token have expired. Please request a new preview link.'}
        </Typography>

        <div className={styles.buttonRow}>
          {!tokenExpired && (
            <Button
              className={styles.button}
              onClick={handleRenew}
              size="small"
              text="Restart Preview Mode"
              type="button"
              variant="Primary"
            />
          )}

          <Button
            className={styles.button}
            onClick={() => setShowTokenInfo((prev) => !prev)}
            size="small"
            text={`${showTokenInfo ? 'Hide' : 'Show'} Details & Share Link`}
            variant="Secondary"
          />
        </div>
        <Button
          className={classNames(styles.button, styles.minifyButton)}
          leftIcon={isMini ? 'Plus_16' : 'Minus_16'}
          onClick={() => {
            setIsMini((prev) => !prev);
            setShowTokenInfo(false);
          }}
          variant="Text"
        />
        <Button
          className={classNames(styles.button, styles.stopButton)}
          innerClassName={styles.stopButtonText}
          onClick={handleStop}
          size="small"
          text="STOP PREVIEW"
          variant="Secondary"
        />
      </div>

      <div className={styles.tokenInfoDrawer}>
        <Typography tagStyle="bodyLarge" weight="bold">
          Preview Token Details
        </Typography>
        <Typography tagStyle="bodyLarge">
          Status: {tokenExpired ? 'Expired' : 'Valid'}
          <br />
          Expires At: {formatLocalTime(tokenExpiresAt)}
          <br />
          {timestamp
            ? `Scheduled Preview for: ${formatLocalTime(timestamp)}`
            : 'Live CMS preview'}
        </Typography>
        <Typography tagStyle="bodySmall">
          This link lets you preview unpublished content until it expires.
        </Typography>
        <div className={styles.tokenActions}>
          <Button
            onClick={() => {
              copyToClipboard(`${window.location.origin}${renewUrl}`);
              setDisplayCopyFeedback(true);

              setTimeout(
                () => setDisplayCopyFeedback(false),
                COPIED_FEEDBACK_TIME,
              );
            }}
            size="small"
            text={
              displayCopyFeedback
                ? 'Link copied to clipboard!'
                : 'Copy Preview Link'
            }
            variant="Secondary"
          />
          <Button
            className={styles.closeButton}
            leftIcon="Close_16"
            onClick={() => setShowTokenInfo(false)}
            variant="Text"
          />
        </div>
      </div>
    </div>
  );
};

export default memo(PreviewIndicator);
