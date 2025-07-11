import React from "react";
import styles from "./layout.module.scss";
import { Navigation } from "../Navigation";
import { Flex } from "@radix-ui/themes";

type LayoutProps = {
  children: React.ReactNode;
  selectedDocumentId: string | null;
  setSelectedDocumentId: (id: string | null) => void;
};

const Layout: React.FC<LayoutProps> = ({ children, selectedDocumentId, setSelectedDocumentId }) => {
  return (
    <Flex className={styles.container}>
      <Navigation 
        selectedDocumentId={selectedDocumentId}
        setSelectedDocumentId={setSelectedDocumentId}
      />
      <main className={styles.content}>{children}</main>
    </Flex>
  );
};

export default Layout;
