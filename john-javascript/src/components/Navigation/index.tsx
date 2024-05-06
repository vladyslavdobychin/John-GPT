import React, { useCallback, useState, useEffect, useRef } from "react";
import classes from "./navigation.module.scss";
import { DocumentList } from "../DocumentList";
import {useDispatch, useSelector} from "react-redux";
import {fetchNotes } from "../../features/notes/notesSlice.ts";
import {AppDispatch, RootState} from "../../app/store.ts";

export const Navigation: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const notes = useSelector((state : RootState) => state.notes.items);
  const noteStatus = useSelector((state : RootState) => state.notes.status);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(250);


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
    if (noteStatus === 'idle') {
      dispatch(fetchNotes());
    }
  }, [noteStatus, dispatch]);

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
