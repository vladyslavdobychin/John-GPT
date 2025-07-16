import React, { useState, useRef, useCallback } from 'react';
import { useUpdateDocumentQuery } from '../../hooks/useDocuments';
import { Document } from '../../types';
import { Box, Callout } from '@radix-ui/themes';
import classes from './index.module.scss';
import { SaveStatusIndicator } from './components/SaveStatusIndicator';
import { EditableTitle } from './components/EditableTitle';
import { EditableContent } from './components/EditableContent';

interface NoteEditorProps {
  document: Document;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ document }) => {
  const updateDocumentMutation = useUpdateDocumentQuery();
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  
  // Use refs to store current values without causing re-renders
  const documentIdRef = useRef<string | number>(document.id);
  const currentTitleRef = useRef(document.title);

  const isUpdating = updateDocumentMutation.isPending;

  // Auto-save function
  const autoSaveDocument = useCallback(async (title: string, content: string) => {
    if (isUpdating) return;
    
    setSaveStatus('saving');
    try {
      await updateDocumentMutation.mutateAsync({
        ...document,
        title,
        content,
      });
      setSaveStatus('saved');
      setHasUnsavedChanges(false);
      // Update our refs with the saved values
      currentTitleRef.current = title;
      // currentContentRef.current = content;
    } catch (error) {
      console.error('Auto-save failed:', error);
      setSaveStatus('unsaved');
    }
  }, [updateDocumentMutation, isUpdating, document]);

  // Auto-save function for content
  const handleContentAutoSave = useCallback((content: string) => {
    if (isUpdating) return;
    
    // Auto-save with current title and new content
    autoSaveDocument(currentTitleRef.current, content);
  }, [isUpdating, autoSaveDocument]);

  // Handle immediate content change for UI updates
  const handleContentChange = useCallback(() => {
    if (isUpdating) return;
    
    // Mark as unsaved immediately when content changes
    if (!hasUnsavedChanges) {
      setHasUnsavedChanges(true);
      setSaveStatus('unsaved');
    }
  }, [isUpdating, hasUnsavedChanges]);

  // Handle title save
  const handleTitleSave = useCallback(async (title: string) => {
    await updateDocumentMutation.mutateAsync({
      ...document,
      title,
    });
    currentTitleRef.current = title;
    setHasUnsavedChanges(false);
    setSaveStatus('saved');
  }, [updateDocumentMutation, document]);

  // Handle content save
  const handleContentSave = useCallback(async (content: string) => {
    await updateDocumentMutation.mutateAsync({
      ...document,
      content,
    });
    setHasUnsavedChanges(false);
    setSaveStatus('saved');
  }, [updateDocumentMutation, document]);

  React.useEffect(() => {
    const isNewDocument = documentIdRef.current !== document.id;
    
    // Update refs with new document data
    currentTitleRef.current = document.title;
    setHasUnsavedChanges(false);
    setSaveStatus('saved');
    
    if (isNewDocument) {
      documentIdRef.current = document.id;
    }
  }, [document]);

  return (
    <Box className={classes.container}>
      {updateDocumentMutation.error && (
        <Callout.Root color="red">
          <Callout.Text>
            Failed to save note: {updateDocumentMutation.error.message}
          </Callout.Text>
        </Callout.Root>
      )}
      
      <SaveStatusIndicator 
        isUpdating={isUpdating}
        hasUnsavedChanges={hasUnsavedChanges}
        saveStatus={saveStatus}
      />

      <EditableTitle 
        document={document}
        onSave={handleTitleSave}
        isUpdating={isUpdating}
      />

      <EditableContent 
        document={document}
        onSave={handleContentSave}
        onAutoSave={handleContentAutoSave}
        onContentChange={handleContentChange}
        isUpdating={isUpdating}
      />
    </Box>
  );
}; 