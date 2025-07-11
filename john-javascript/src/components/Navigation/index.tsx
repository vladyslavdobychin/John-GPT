import React, { useCallback } from "react";
import { useState, useEffect, useRef } from "react";
import classes from "./navigation.module.scss";
import { DocumentList } from "../DocumentList";
import { Box, Flex, Spinner } from "@radix-ui/themes";
import { useDocumentsQuery } from "../../hooks/useDocuments";

interface NavigationProps {
  selectedDocumentId: string | null;
  setSelectedDocumentId: (id: string | null) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ selectedDocumentId, setSelectedDocumentId }) => {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [isResizing, setIsResizing] = useState(false);
    const [sidebarWidth, setSidebarWidth] = useState(250);
    const { data: documents = [], isLoading: loading, error: fetchError } = useDocumentsQuery();

    // Convert React Query error to string for backward compatibility
    const error = fetchError ? fetchError.message : null;

    const handleDocumentClick = (documentId: string) => {
        setSelectedDocumentId(documentId);
    };

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
        >
            <Box className={classes.content}>
                {loading && (
                    <Flex justify="center" align="center">
                        <Spinner size="3" />
                    </Flex>
                )}
                {error && <div>Error: {error}</div>}
                {!loading && !error && (
                    <DocumentList 
                        documents={documents}
                        selectedDocumentId={selectedDocumentId}
                        onDocumentClick={handleDocumentClick}
                    />
                )}
            </Box>
            <Box 
                className={classes.resizer} 
                onMouseDown={(e) => {
                    e.preventDefault(); // Only prevent default on the resizer
                    startResizing();
                }}
            />
        </div>
    );
};
