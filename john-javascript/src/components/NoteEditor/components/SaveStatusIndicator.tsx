import React from 'react';
import { Box, Spinner } from '@radix-ui/themes';

interface SaveStatusIndicatorProps {
  isUpdating: boolean;
  hasUnsavedChanges: boolean;
  saveStatus: 'saved' | 'saving' | 'unsaved';
}

export const SaveStatusIndicator: React.FC<SaveStatusIndicatorProps> = ({ 
  isUpdating, 
  hasUnsavedChanges, 
  saveStatus 
}) => {
  const getStatusDisplay = () => {
    if (saveStatus === 'saving' || isUpdating) return { text: 'Saving...', spinner: true };
    if (saveStatus === 'unsaved' || hasUnsavedChanges) return { text: 'Unsaved changes', spinner: false };
    return { text: 'Saved', spinner: false };
  };

  const statusDisplay = getStatusDisplay();

  return (
    <Box style={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: '0.5rem', 
      marginBottom: '1rem',
      fontSize: '0.875rem',
      color: (saveStatus === 'unsaved' || hasUnsavedChanges) ? '#f59e0b' : '#10b981',
      fontWeight: '500'
    }}>
      {statusDisplay.spinner && <Spinner size="1" />}
      {statusDisplay.text}
    </Box>
  );
}; 