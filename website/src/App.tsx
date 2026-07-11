import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import GalleryPage from "./pages/GalleryPage";
import SkillPage from "./pages/SkillPage";
import DocsPage from "./pages/DocsPage";

export default function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout currentPage="home">
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/skills"
        element={
          <Layout currentPage="library">
            <GalleryPage />
          </Layout>
        }
      />
      <Route
        path="/skills/:slug"
        element={
          <Layout currentPage="library">
            <SkillPage />
          </Layout>
        }
      />
      <Route
        path="/docs"
        element={
          <Layout currentPage="docs">
            <DocsPage />
          </Layout>
        }
      />
    </Routes>
  );
}
