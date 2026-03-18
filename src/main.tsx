import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CaseStudiesPage from "./ui/pages/CaseStudiesPage/CaseStudiesPage";
import NewCaseStudyPage from "./ui/pages/NewCaseStudyPage/NewCaseStudyPage";
import UpdateCaseStudyPage from "./ui/pages/UpdateCaseStudyPage/UpdateCaseStudyPage";
import CaseStudyPage from "./ui/pages/CaseStudyPage/CaseStudyPage";
import DashboardPage from "./ui/pages/DashboardPage/DashboardPage";
import LandingPage from "./ui/pages/LandingPage/LandingPage";
import ProtectedRoute from "./ui/components/ProtectedRoute/ProtectedRoute";
import RegisterPage from "./ui/pages/RegisterPage/RegisterPage";
import LoginPage from "./ui/pages/LoginPage/LoginPage";
import PublicOnlyRoute from "./ui/components/PublicOnlyRoute/PublicOnlyRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    element: <PublicOnlyRoute />,
    children: [
      {
        path: "/auth/register",
        element: <RegisterPage />,
      },
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/:userId/case-studies",
    element: <CaseStudiesPage />,
  },
  {
    path: "/:userId/case-studies/:id",
    element: <CaseStudyPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/dashboard",
        element: <DashboardPage />,
      },
      {
        path: "/case-studies",
        element: <CaseStudiesPage isOwner />,
      },
      {
        path: "/case-studies/:id",
        element: <CaseStudyPage isOwner />,
      },
      {
        path: "/case-studies/new",
        element: <NewCaseStudyPage />,
      },
      {
        path: "/case-studies/:id/update",
        element: <UpdateCaseStudyPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
