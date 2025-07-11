import React from "react";
import classes from "../index.module.scss";
import { Document } from "../../../types";
import { Text } from "@radix-ui/themes";

interface DocumentListItemProps extends Document {
  isSelected: boolean;
  onClick: () => void;
}

export const DocumentListItem: React.FC<DocumentListItemProps> = ({ 
  title, 
  isSelected, 
  onClick 
}) => {
  return (
    <Text
      as="div"
      size="2"
      align="left"
      truncate
      className={`${classes.documentListItem} ${isSelected ? classes.selected : ''}`}
      onClick={onClick}
      style={{ cursor: 'pointer' }}
    >
      <a>{title}</a>
    </Text>
  );
};
