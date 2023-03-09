import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import Modal from '../Modal';

import { IconButton } from '@mui/material';
import './SingleModal.css';

export default function SingleModal({
  open,
  setOpen,
  title,
  onConfirm,
  children,
  ...operators
}) {
  const closeModal = () => setOpen(false);

  let className = operators.hasOwnProperty('className')
    ? operators.className
    : '';

  return (
    <>
      {open && (
        <Modal>
          <div className={`single-modal ${className}`}>
            <div className="single-modal-title">
              <h2 className="font-weight-600">{title}</h2>
              <IconButton><CloseIcon onClick={closeModal} /></IconButton>
            </div>
            {children && <div className="single-modal-content">{children}</div>}
            <div className="single-modal-footer">
              <button className="btn-cancle" onClick={closeModal}>
                Hủy
              </button>
              <button
                className="btn-create"
                onClick={() => {
                  onConfirm();
                  closeModal();
                }}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
