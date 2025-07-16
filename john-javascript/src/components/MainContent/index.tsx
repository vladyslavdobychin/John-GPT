import React from 'react';
import { useParams } from 'react-router-dom';
import { useDocumentsQuery } from '../../hooks/useDocuments';
import { NoteEditor } from '../NoteEditor';
import { Box } from '@radix-ui/themes';

export const MainContent: React.FC = () => {
  const { id: selectedDocumentId } = useParams<{ id: string }>();
  const { data: documents = [], isLoading: loading, error: fetchError } = useDocumentsQuery();

  // Convert React Query error to string for backward compatibility
  const error = fetchError ? fetchError.message : null;

  if (loading) {
    return (
      <Box style={{ padding: '2rem', textAlign: 'center' }}>
        Loading documents...
      </Box>
    );
  }

  if (error) {
    return (
      <Box style={{ padding: '2rem', textAlign: 'center' }}>
        Error: {error}
      </Box>
    );
  }

  if (documents.length === 0) {
    return (
      <Box style={{ padding: '2rem', textAlign: 'center' }}>
        No documents found. Create your first document to get started.
      </Box>
    );
  }

  if (!selectedDocumentId) {
    return (
      <Box style={{ padding: '2rem', textAlign: 'center' }}>
        Select a document from the sidebar to start editing.
      </Box>
    );
  }

  const selectedDocument = documents.find(doc => String(doc.id) === selectedDocumentId);


  if (!selectedDocument) {
    return (
      <Box style={{ padding: '2rem', textAlign: 'center' }}>
        Selected document not found.
      </Box>
    );
  }

  return <NoteEditor document={selectedDocument} />;
}; 