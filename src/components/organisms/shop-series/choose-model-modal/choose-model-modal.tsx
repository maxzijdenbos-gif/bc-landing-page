import classNames from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useI18n } from 'next-localization';
import Icon from 'components/atoms/icon/icon';
import Image from 'components/atoms/image/image';
import Typography from 'components/atoms/typography/typography';
import Button from 'components/molecules/button/button';
import { generateImageSizes } from 'components/utilities/generate-image-sizes';
import { MODAL_ROOT_ID } from 'constants/index';
import lockBodyScroll from 'libraries/utilities/body-scroll-lock/lock-body-scroll';
import { ModalBikeProps } from '../shop-series';
import styles from './choose-model-modal.module.scss';

interface ChooseModelModalProps {
  bikes: ModalBikeProps[];
  isOpen: boolean;
  onClose: () => void;
}

const ChooseModelModal = ({ bikes, isOpen, onClose }: ChooseModelModalProps) => {
  const { t } = useI18n();
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setModalRoot(document.getElementById(MODAL_ROOT_ID));
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    lockBodyScroll(true);
    return () => lockBodyScroll(false);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!modalRoot || !isOpen) return null;

  const isSingle = bikes.length === 1;

  return createPortal(
    <div
      ref={overlayRef}
      className={styles.overlay}
      onClick={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
    >
      <div
        aria-label="Choose Model"
        aria-modal="true"
        className={styles.modal}
        role="dialog"
      >
        <button
          aria-label="Close modal"
          className={styles.closeButton}
          type="button"
          onClick={onClose}
        >
          <Icon ariaLabel="Close" hidden name="Close_32" />
        </button>

        <Typography className={styles.title} tag="h2" tagStyle="displayMedium">
          Choose Model
        </Typography>

        <div className={classNames(styles.cards, { [styles.isSingle]: isSingle })}>
          {bikes.slice(0, 2).map((bike, index) => (
            <div key={bike.name + index} className={styles.card}>
              <div className={styles.imageWrapper}>
                <Image
                  alt={bike.imageObject.alt}
                  className={styles.image}
                  fill
                  imageObject={bike.imageObject}
                  {...generateImageSizes(12, 6, 6, 6, 6)}
                />
              </div>
              <div className={styles.cardContent}>
                <Typography
                  className={styles.bikeName}
                  tag="h3"
                  tagStyle="displaySmall"
                >
                  {bike.name}
                </Typography>
                {!!bike.fromPrice && (
                  <Typography
                    className={styles.price}
                    tag="p"
                    tagStyle="bodyLarge"
                  >
                    {t('global.pricesFrom', { price: bike.fromPrice }) ||
                      `Starting from ${bike.fromPrice}`}
                  </Typography>
                )}
                {bike.link && (
                  <div className={styles.ctaWrapper}>
                    <Button
                      link={{ externalLink: bike.link }}
                      rightIcon="ArrowRight_24"
                      size="large"
                      text="Start Customizing"
                      variant="Primary"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    modalRoot,
  );
};

ChooseModelModal.displayName = 'ChooseModelModal';

export default ChooseModelModal;
