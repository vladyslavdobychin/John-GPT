import React, { useCallback } from "react";
import { useState, useEffect, useRef } from "react";
import classes from "./navigation.module.scss";
import { DocumentList } from "../DocumentList";

export const Navigation: React.FC = () => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(250);

  const notes = [
    { id: "note1", title: "Note 1", content: "Content of Note 1..." },
    { id: "note2", title: "Note 2", content: "Content of Note 2..." },
  ];

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
