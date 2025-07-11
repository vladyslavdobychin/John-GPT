import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { documentsApi } from '../api/documents';
import { Document } from '../types';

// Hook for fetching all documents
export const useDocumentsQuery = () => {
  return useQuery({
    queryKey: ['documents'],
    queryFn: documentsApi.getAllDocuments,
  });
};

// Hook for updating a document
export const useUpdateDocumentQuery = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: documentsApi.updateDocument,
    onSuccess: (updatedDocument) => {
      // Update the document in the cache
      queryClient.setQueryData(['documents'], (oldDocuments: Document[]) =>
        oldDocuments?.map((d) => (d.id === updatedDocument.id ? updatedDocument : d))
      )
    },
  });
}; 