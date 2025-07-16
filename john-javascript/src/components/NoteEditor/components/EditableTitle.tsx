import React, { useState, useRef } from 'react';
import { Box } from '@radix-ui/themes';
import { Document } from '../../../types';
import classes from '../index.module.scss';

interface EditableTitleProps {
  document: Document;
  onSave: (title: string) => Promise<void>;
  isUpdating: boolean;

}

export const EditableTitle: React.FC<EditableTitleProps> = ({ 
  document, 
  onSave, 
  isUpdating,

}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(() => document.title);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync local state with document prop changes
  React.useEffect(() => {
    setTitle(document.title);
    setIsEditing(false); // Exit editing mode when document changes
  }, [document.id]);

  // Focus input and select text on edit
  React.useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleClick = () => {
    if (!isUpdating) {
      setIsEditing(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleSave = async () => {
    if (title.trim() === document.title || isUpdating) {
      setIsEditing(false);
      return;
    }

    try {
      await onSave(title);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save title:', error);
      // Revert to original title on error
      setTitle(document.title);
    }
  };

  const handleCancel = () => {
    setTitle(document.title);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <>
      {isEditing ? (
        <Box style={{ position: 'relative' }}>
          <input
            ref={inputRef}
            type="text"
            value={title}
            onChange={handleChange}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            placeholder="Document title"
            className={classes.titleInput}
            disabled={isUpdating}
          />
        </Box>
      ) : (
        <h1 
          onClick={handleClick}
          className={`${classes.titleDisplay} ${isUpdating ? classes.updating : ''}`}
        >
          {document.title}
        </h1>
      )}
    </>
  );
}; 