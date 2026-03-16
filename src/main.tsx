import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CaseStudiesPage from "./ui/pages/CaseStudiesPage/CaseStudiesPage";
import NewCaseStudyPage from "./ui/pages/NewCaseStudyPage/NewCaseStudyPage";
import UpdateCaseStudyPage from "./ui/pages/UpdateCaseStudyPage/UpdateCaseStudyPage";
import CaseStudyPage from "./ui/pages/CaseStudyPage/CaseStudyPage";

const router = createBrowserRouter([
  // / Público
  // /dashboard Privado
  {
    path: "/:userId/case-studies", // Público
    element: <CaseStudiesPage />,
  },
  {
    path: "/:userId/case-studies/:id", // Público
    element: <CaseStudyPage />,
  },
  {
    path: "/case-studies", // Privado
    element: <CaseStudiesPage />,
  },
  {
    path: "/case-studies/:id", // Privado
    element: <CaseStudyPage />,
  },
  {
    path: "/case-studies/new", // Privado
    element: <NewCaseStudyPage />,
  },
  {
    path: "/case-studies/:id/update", // Privado
    element: <UpdateCaseStudyPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
