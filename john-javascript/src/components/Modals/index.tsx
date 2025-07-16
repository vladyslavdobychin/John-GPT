import React from 'react';
import { ConfirmDeleteModal } from './ConfirmDeleteModal';

export const ModalContainer: React.FC = () => {
  return (
    <>
      <ConfirmDeleteModal />
      {/* Add other modals here as they are created */}
    </>
  );
};

export { ConfirmDeleteModal }; 