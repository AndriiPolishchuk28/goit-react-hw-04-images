import { useEffect } from 'react';
import css from './Modal.module.css';

export const Modal = ({ closeModal, url }) => {
  const handleOverlayClose = e => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleEscapeClose = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleEscapeClose);
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEscapeClose);
    };
  }, []);

  return (
    <div className={css.overlay} onClick={handleOverlayClose}>
      <div className={css.modal}>
        <img className={css.img} src={url} alt="" />
      </div>
    </div>
  );
};
