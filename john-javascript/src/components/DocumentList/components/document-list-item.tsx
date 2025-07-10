import React from "react";
import classes from "../index.module.scss";
import { Document } from "../../../types";
import { Text } from "@radix-ui/themes";

export const DocumentListItem: React.FC<Document> = ({ title }) => {
  return (
    <Text
      as="div"
      size="2"
      align="left"
      truncate
      className={classes.documentListItem}
    >
      <a>{title}</a>
    </Text>
  );
};
