import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "../components/layouts/DefaultLayout";
import LoginPage from "../pages/Login";
import SignUpPage from "../pages/SignUp";
const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout>
              <LoginPage />
            </DefaultLayout>
          }
        />
        <Route
          path="/sign-up"
          element={
            <DefaultLayout>
              <SignUpPage />
            </DefaultLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
