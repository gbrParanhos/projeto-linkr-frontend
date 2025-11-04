import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthTemplate from "../components/templates/AuthTemplate";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/SignUp";
import SessionTemplate from "../components/templates/SessionTemplate";
import FeedPage from "../pages/Feed";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AuthTemplate>
              <LoginPage />
            </AuthTemplate>
          }
        />
        <Route
          path="/sign-up"
          element={
            <AuthTemplate>
              <SignUpPage />
            </AuthTemplate>
          }
        />
        <Route
          path="/feed"
          element={
            <SessionTemplate>
              <FeedPage />
            </SessionTemplate>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
