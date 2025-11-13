import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthTemplate from "../components/templates/AuthTemplate";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/SignUp";
import SessionTemplate from "../components/templates/SessionTemplate";
import FeedPage from "../pages/Feed";
import ProfileUI from "../pages/Profile/profileUI"; // ⬅ importa a página de perfil

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
        <Route
          path="/user/my-profile"
          element={
            <SessionTemplate>
              <ProfileUI />
            </SessionTemplate>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
