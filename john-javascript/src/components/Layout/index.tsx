import React from "react";
import styles from "./layout.module.scss";
import { Navigation } from "../Navigation";
import { Flex } from "@radix-ui/themes";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex className={styles.container}>
      <Navigation />
      <main className={styles.content}>{children}</main>
    </Flex>
  );
};

export default Layout;
