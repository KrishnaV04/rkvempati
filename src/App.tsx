import { Routes, Route } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import WritingPage from "./pages/WritingPage";
import WritingDetailPage from "./pages/WritingDetailPage";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:slug" element={<ProjectDetailPage />} />
        <Route path="writing" element={<WritingPage />} />
        <Route path="writing/:slug" element={<WritingDetailPage />} />
        <Route
          path="photography"
          element={<PlaceholderPage title="Photography" />}
        />
        {/* <Route
          path="board-games"
          element={<PlaceholderPage title="Board Games" />}
        /> temporarily disabled */}
      </Route>
    </Routes>
  );
}

export default App;
