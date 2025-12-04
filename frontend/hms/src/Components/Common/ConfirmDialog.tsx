import React from 'react';
import { Modal, Text, Button, Group } from '@mantine/core';

interface ConfirmDialogProps {
  opened: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  opened,
  onClose,
  onConfirm,
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'OK',
  cancelText = 'Cancel',
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={title}
      centered
      size="sm"
    >
      <Text mb="md">{message}</Text>
      <Group justify="flex-end">
        <Button variant="outline" onClick={onClose}>
          {cancelText}
        </Button>
        <Button variant="outline" color="red" onClick={handleConfirm}>
          {confirmText}
        </Button>
      </Group>
    </Modal>
  );
};

export default ConfirmDialog;