import { useState } from "react";
import Layout from "./components/Layout";
import { MainContent } from "./components/MainContent";

function App() {
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);

  return (
    <Layout
      selectedDocumentId={selectedDocumentId}
      setSelectedDocumentId={setSelectedDocumentId}
    >
      <MainContent selectedDocumentId={selectedDocumentId} />
    </Layout>
  );
}

export default App;
