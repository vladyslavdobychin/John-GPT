import React from 'react';
import { Dialog, Button, Flex } from '@radix-ui/themes';
import { useModal } from '../../contexts/ModalContext';

export const ConfirmDeleteModal: React.FC = () => {
  const { modalState, closeConfirmDeleteModal } = useModal();
  const { isOpen, data } = modalState.confirmDelete;

  const handleConfirm = () => {
    if (data?.onConfirm) {
      data.onConfirm();
    }
    closeConfirmDeleteModal();
  };

  const handleCancel = () => {
    closeConfirmDeleteModal();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={closeConfirmDeleteModal}>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Delete Document</Dialog.Title>
        <Dialog.Description size="2">
          Are you sure you want to delete "{data?.title}"? This action cannot be undone.
        </Dialog.Description>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray" onClick={handleCancel}>
              Cancel
            </Button>
          </Dialog.Close>
          <Button variant="solid" color="red" onClick={handleConfirm}>
            Delete
          </Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}; 