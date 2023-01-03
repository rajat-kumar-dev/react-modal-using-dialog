import { useCallback, useEffect, useMemo, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import ReactDOM from 'react-dom';
import s from './modal.module.css';

const Modal = ({
  open,
  locked = false,
  onClose,
  children,
  className,
  style,
}) => {
  const modalRef = useRef(null);

  useEffect(() => {
    if (open && !modalRef.current.open) modalRef.current.showModal();
  }, [open]);

  const dialogClasses = useMemo(() => {
    const arr = [s.modal];
    if (!open) arr.push(s.modalAboutToClose);
    return `${className} ${arr.join(' ')}`;
  }, [open, className]);

  const onCancel = useCallback(
    (e) => {
      e.preventDefault();
      !locked && onClose();
    },
    [onClose, locked]
  );
  const onClick = useCallback(
    (e) => {
      if (e.target === modalRef.current) !locked && onClose();
    },
    [onClose, locked]
  );

  const onAnimEnd = useCallback(() => {
    if (!open) modalRef.current.close();
  }, [open]);

  return ReactDOM.createPortal(
    <CSSTransition in={open} unmountOnExit timeout={{ enter: 0, exit: 500 }}>
      <dialog
        ref={modalRef}
        className={dialogClasses}
        onClose={onClose}
        onCancel={onCancel}
        onClick={onClick}
        onAnimationEnd={onAnimEnd}
        style={style}
      >
        {children}
      </dialog>
    </CSSTransition>,
    document.getElementById('root')
  );
};

export default Modal;
