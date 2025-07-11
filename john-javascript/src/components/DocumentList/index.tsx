import { Flex } from "@radix-ui/themes";
import { Document } from "../../types";
import { DocumentListItem } from "./components/document-list-item";

type DocumentListProps = {
  documents: Document[];
  selectedDocumentId: string | null;
  onDocumentClick: (documentId: string) => void;
};

export const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  selectedDocumentId,
  onDocumentClick,
}) => {
  return (
    <Flex direction="column" gap="1">
      {documents.map((document) => (
        <DocumentListItem 
          key={document.id}
          {...document}
          isSelected={selectedDocumentId === document.id}
          onClick={() => onDocumentClick(document.id)}
        />
      ))}
    </Flex>
  );
};
