import { FC, useEffect } from 'react';

import { IModalProps } from './modal.interface';

import styles from './modal.module.scss';

const Modal: FC<IModalProps> = (props) => {
  const {
    isOpen,
    onClose,
    title,
    children,
    width = '480px',
    showCloseButton = true,
  } = props;

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleOverlayClick = (e: React.MouseEvent): void => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'modal-title' : undefined}
    >
      <div
        className={styles.dialog}
        style={{ width }}
      >
        <header className={styles.header}>
          {
            title && (
              <h2
                id="modal-title"
                className={styles.title}
              >
                {title}
              </h2>
            )
          }

          {
            showCloseButton && (
              <button
                type="button"
                className={styles.closeBtn}
                onClick={onClose}
                aria-label="Close modal"
              >
                ×
              </button>
            )
          }
        </header>

        <div className={styles.body}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
