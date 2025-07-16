import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { MainContent } from "./components/MainContent";
import { ModalProvider } from "./contexts/ModalContext";
import { ModalContainer } from "./components/Modals";

function App() {
  return (
    <ModalProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainContent />} />
          <Route path="document/:id" element={<MainContent />} />
        </Route>
      </Routes>
      <ModalContainer />
    </ModalProvider>
  );
}

export default App;
