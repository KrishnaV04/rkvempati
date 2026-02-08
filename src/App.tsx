import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import PlaceholderPage from "./pages/PlaceholderPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:slug" element={<ProjectDetailPage />} />
        <Route path="writing" element={<PlaceholderPage title="Writing" />} />
        <Route
          path="art-gallery"
          element={<PlaceholderPage title="Art Gallery" />}
        />
        <Route
          path="board-games"
          element={<PlaceholderPage title="Board Games" />}
        />
      </Route>
    </Routes>
  );
}

export default App;
