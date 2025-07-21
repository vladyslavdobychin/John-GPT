import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@radix-ui/themes';
import { useCreateDocumentQuery } from '../../hooks/useDocuments';
import { Pencil2Icon } from '@radix-ui/react-icons';

export const CreateNoteButton: React.FC = () => {
    const navigate = useNavigate();
    const createDocumentMutation = useCreateDocumentQuery();

    const handleCreateNote = () => {
        const newDocument = {
            title: "Untitled",
            content: ""
        };
        
        createDocumentMutation.mutate(newDocument, {
            onSuccess: (createdDocument) => {
                // Navigate to the newly created document
                navigate(`/document/${createdDocument.id}`);
            }
        });
    };

    return (
        <Button 
            onClick={handleCreateNote}
            disabled={createDocumentMutation.isPending}
            style={{ width: '100%' }}
            variant="soft"
        >
            <Pencil2Icon />
            {createDocumentMutation.isPending ? 'Creating...' : 'New Note'}
        </Button>
    );
}; 