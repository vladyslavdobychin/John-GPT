import { Flex } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";
import { Document } from "../../types";
import { DocumentListItem } from "./components/DocumentListItem";
import { useDeleteDocumentQuery } from "../../hooks/useDocuments";

type DocumentListProps = {
  documents: Document[];
  selectedDocumentId: string | null;
};

export const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  selectedDocumentId,
}) => {
  const navigate = useNavigate();
  const { mutate: deleteDocument, isPending: isDeleting } = useDeleteDocumentQuery();

  const handleDocumentClick = (documentId: string) => {
    navigate(`/document/${documentId}`);
  };

  const handleDeleteDocument = (documentId: string) => {
    deleteDocument(documentId);
  };

  return (
    <Flex direction="column" gap="1">
      {documents.map((document) => {
        return (
        <DocumentListItem 
          key={document.id}
          {...document}
          isSelected={selectedDocumentId === String(document.id)}
          onClick={() => handleDocumentClick(document.id)}
          onDelete={() => handleDeleteDocument(document.id)}
          isDeleting={isDeleting}
        />
      )})}
    </Flex>
  );
};
