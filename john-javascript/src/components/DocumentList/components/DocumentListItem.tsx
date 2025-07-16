import React from "react";
import classes from "../index.module.scss";
import { Document } from "../../../types";
import { Flex, IconButton, Spinner, Text } from "@radix-ui/themes";
import { TrashIcon } from "@radix-ui/react-icons";
import { useModal } from "../../../contexts/ModalContext";

interface DocumentListItemProps extends Document {
  isSelected: boolean;
  onClick: () => void;
  onDelete: () => void;
  isDeleting: boolean;
}

export const DocumentListItem: React.FC<DocumentListItemProps> = ({ 
  title, 
  isSelected, 
  onClick,
  onDelete,
  isDeleting
}) => {
  const { openConfirmDeleteModal } = useModal();

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openConfirmDeleteModal({
      title,
      onConfirm: onDelete,
    });
  };

  return (
    <Flex justify="between" align="center" className={`${classes.documentListItem} ${isSelected ? classes.selected : ''}`}>
      <Text
        as="div"
        size="2"
        align="left"

        truncate
        onClick={onClick}
        style={{ cursor: 'pointer', flex: 1 }}
      >
        <a>{title}</a>
      </Text>
      
      <IconButton
        size="1"
        variant="soft"
        className={classes.deleteButton}
        onClick={handleDeleteClick}
        disabled={isDeleting}
      >
        {isDeleting ? <Spinner size="1" /> : <TrashIcon />}
      </IconButton>
    </Flex>
  );
};
