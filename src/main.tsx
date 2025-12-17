import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CaseStudiesPage from "./ui/pages/CaseStudiesPage/CaseStudiesPage";
import NewCaseStudyPage from "./ui/pages/NewCaseStudyPage/NewCaseStudyPage";
import UpdateCaseStudyPage from "./ui/pages/UpdateCaseStudyPage/UpdateCaseStudyPage";
import CaseStudyPage from "./ui/pages/CaseStudyPage/CaseStudyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CaseStudiesPage />,
  },
  {
    path: "/:id",
    element: <CaseStudyPage />,
  },
  {
    path: "/:id/update",
    element: <UpdateCaseStudyPage />,
  },
  {
    path: "/new",
    element: <NewCaseStudyPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
