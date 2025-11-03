import { BrowserRouter, Route, Routes } from "react-router-dom";
import DefaultLayout from "../components/layouts/DefaultLayout";
import HelloWorld from "../pages/HelloWorld";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultLayout><HelloWorld /></DefaultLayout>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;