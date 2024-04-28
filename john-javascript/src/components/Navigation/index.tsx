import React, { useCallback } from "react";
import { useState, useEffect, useRef } from "react";
import classes from "./navigation.module.scss";
import { DocumentList } from "../DocumentList";

export const Navigation: React.FC = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [notes, setNotes] = useState([]);  // Initialize notes as an array


  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing && sidebarRef.current) {
        setSidebarWidth(
          mouseMoveEvent.clientX -
            sidebarRef.current.getBoundingClientRect().left
        );
      }
    },
    [isResizing]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  useEffect(() => {
    fetch('/api/notes', {
      headers: {
        'Accept': 'application/json'  // Ensure the API returns JSON
      }
    })
        .then(response => response.json())
        .then(data => {
          if (data.error) {
            console.error('Fetching error:', data.error);
          } else {
            setNotes(data);  // Set the fetched notes to state
          }
        })
        .catch(error => console.error('Error fetching notes:', error));
  }, []);

  return (
    <div
      ref={sidebarRef}
      className={classes.navigation}
      style={{ width: sidebarWidth }}
      onMouseDown={(e) => e.preventDefault()}
    >
      <div className={classes.content}>
        <DocumentList documents={notes} />
      </div>
      <div className={classes.resizer} onMouseDown={startResizing} />
    </div>
  );
};
