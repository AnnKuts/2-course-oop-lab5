import type { FC, ReactNode } from 'react';
import Button from './Button.tsx';

interface ModalWindowProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
}

const ModalWindow: FC<ModalWindowProps> = ({
                                                   isOpen,
                                                   onClose,
                                                   title,
                                                   children,
                                                   className = '',
                                                 }) => {
  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${className}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h2>{title}</h2>
          <Button
            className="modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </Button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
};

export default ModalWindow;
