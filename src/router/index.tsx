import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from "../components/layouts/AuthLayout";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/SignUp";
import SessionLayout from "../components/layouts/SessionLayout";
import FeedPage from "../pages/Feed";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />
        <Route
          path="/sign-up"
          element={
            <AuthLayout>
              <SignUpPage />
            </AuthLayout>
          }
        />
        <Route
          path="/feed"
          element={
            <SessionLayout>
              <FeedPage />
            </SessionLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
