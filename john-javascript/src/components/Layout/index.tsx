import React from "react";
import styles from "./layout.module.scss";
import { Navigation } from "../Navigation";
import { Flex } from "@radix-ui/themes";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <Flex className={styles.container}>
      <Navigation />
      <main className={styles.content}>
        <Outlet />
      </main>
    </Flex>
  );
};

export default Layout;
