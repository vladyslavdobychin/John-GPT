import React from "react";
import classes from "../index.module.scss";
import { Document } from "../../../types";
import { Text } from "@radix-ui/themes";

export const DocumentListItem: React.FC<Document> = ({ title }) => {
  return (
    <a className={classes.documentListItem} >
      <Text size="2" align="left">
        {title}
      </Text>
    </a>
  );
};
