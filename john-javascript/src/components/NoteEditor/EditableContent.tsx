import React, { useState, useRef, useCallback } from 'react';
import { Box } from '@radix-ui/themes';
import { Document } from '../../types';
import classes from './index.module.scss';

interface EditableContentProps {
  document: Document;
  onSave: (content: string) => Promise<void>;
  onAutoSave: (content: string) => void;
  onContentChange: () => void;
  isUpdating: boolean;
}

// Debounce utility function
const useDebounce = <T extends unknown[]>(callback: (...args: T) => void, delay: number) => {
  const timeoutRef = useRef<number | null>(null);

  const debouncedCallback = useCallback((...args: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]);

  const cancel = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  return [debouncedCallback, cancel] as const;
};

export const EditableContent: React.FC<EditableContentProps> = ({ 
  document, 
  onSave, 
  onAutoSave,
  onContentChange,
  isUpdating,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(() => document.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const cursorRef = useRef<{ start: number; end: number } | null>(null)

  // Debounced auto-save (2 seconds after user stops typing)
  const [debouncedAutoSave, cancelAutoSave] = useDebounce(onAutoSave, 1000);

  // Sync local state with document prop changes
  React.useEffect(() => {
    setContent(document.content);
    setIsEditing(false); // Exit editing mode when document changes
    cancelAutoSave(); // Cancel any pending autosave for the previous document
  }, [document.id, cancelAutoSave]);


  // Focus textarea and position cursor at the end on edit
  React.useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      // Position cursor at the end
      const textarea = textareaRef.current;
      textarea.setSelectionRange(textarea.value.length, textarea.value.length);
      // Auto-resize the textarea
      adjustTextareaHeight(textarea);
    }
  }, [isEditing]);

  // Preserve cursor position after autosave
  React.useLayoutEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea || !cursorRef.current) return;

    const { start, end } = cursorRef.current;
    textarea.setSelectionRange(start, end);
    textarea.focus();
  }, [isUpdating])

  const adjustTextareaHeight = (textarea: HTMLTextAreaElement) => {
    textarea.style.height = 'auto';
    const minHeight = 200;
    const scrollHeight = textarea.scrollHeight;
    const newHeight = Math.max(scrollHeight, minHeight);
    textarea.style.height = `${newHeight}px`;
  };

  const handleClick = () => {
    if (!isUpdating) {
      setIsEditing(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    setContent(newContent);
    cursorRef.current = {
      start: e.target.selectionStart,
      end: e.target.selectionEnd,
    }
    
    // Auto-resize on every change
    adjustTextareaHeight(e.target);
    
    // Immediately notify parent of content change for UI updates
    onContentChange();
    
    // Trigger auto-save with debounce
    debouncedAutoSave(newContent);
  };

  const handleSave = async () => {
    // Cancel any pending autosave since we're doing a manual save
    cancelAutoSave();
    
    // Only save if content has actually changed
    if (content === document.content) {
      setIsEditing(false);
      return;
    }
  
    try {
      await onSave(content);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to save content:', error);
      // Revert to original content on error
      setContent(document.content);
    }
  };

  const handleCancel = () => {
    setContent(document.content);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <>
      {isEditing ? (
        <Box style={{ position: 'relative' }}>
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleChange}
            onBlur={handleSave}
            onKeyDown={handleKeyDown}
            placeholder="Document content"
            className={classes.contentInput}
            disabled={isUpdating}
          />
        </Box>
      ) : (
        <div 
          onClick={handleClick}
          className={`${classes.contentDisplay} ${isUpdating ? classes.updating : ''}`}
          title={isUpdating ? 'Saving...' : 'Click to edit content'}
        >
          {content || <span className={classes.placeholder}>Click to add content...</span>}
        </div>
      )}
    </>
  );
}; 