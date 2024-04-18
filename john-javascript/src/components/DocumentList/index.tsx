import { Flex } from "@radix-ui/themes";
import { Document } from "../../types";
import { DocumentListItem } from "./components/document-list-item";

type DocumentListItemProps = {
  documents: Document[];
};

export const DocumentList: React.FC<DocumentListItemProps> = ({
  documents,
}) => {
  return (
    <Flex direction="column" gap="1">
      {documents.map((document) => (
        <DocumentListItem {...document} />
      ))}
    </Flex>
  );
};
