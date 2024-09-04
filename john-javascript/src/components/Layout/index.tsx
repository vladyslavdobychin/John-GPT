import React, {useEffect} from "react";
import styles from "./layout.module.scss";
import { Navigation } from "../Navigation";
import { Flex } from "@radix-ui/themes";
import {AppDispatch, RootState} from "../../store/store.ts";
import {useDispatch, useSelector} from "react-redux";
import {fetchNotes} from "../../store/features/notes/notesSlice.ts";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const dispatch: AppDispatch = useDispatch();
    const noteStatus = useSelector((state:RootState) => state.notes.status);

    useEffect(() => {
        if (noteStatus === 'idle') {
            dispatch(fetchNotes());
        }
    }, [noteStatus, dispatch]);

  return (
    <Flex className={styles.container}>
      <Navigation />
      <main className={styles.content}>{children}</main>
    </Flex>
  );
};

export default Layout;
