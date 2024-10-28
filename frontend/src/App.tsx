import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import "./index.css";
import AccountPage from "./pages/AccountPage/AccountPage";
import AdminPage from "./pages/AdminPage/AdminPage";
import CreateProduct from "./pages/AdminPage/CreateProduct/CreateProduct";
import EditProduct from "./pages/AdminPage/EditProduct/EditProduct";
import CataloguePage from "./pages/CataloguePage/CataloguePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProductPage from "./pages/ProductPage/ProductPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import { useAppSelector } from "./store/hooks";

export enum RoutesEnum {
  CATALOGUE = "/",
  ADMIN = "/admin",
  PRODUCT_MANAGEMENT = "/admin/products/:id",
  CREATE_PRODUCT = "/admin/products",
  ACCOUNT = "/account",
  PRODUCT = "/product/:id",
  LOGIN = "/login",
  REGISTER = "/register",
}

function App() {
  const role = useAppSelector((state) => state.user.user?.role);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path={RoutesEnum.CATALOGUE} element={<CataloguePage />} />
        <Route path={RoutesEnum.PRODUCT} element={<ProductPage />} />
        <Route path={RoutesEnum.ACCOUNT} element={<AccountPage />} />
        <Route path={RoutesEnum.LOGIN} element={<LoginPage />} />
        <Route path={RoutesEnum.REGISTER} element={<RegisterPage />} />
        <Route path={RoutesEnum.CREATE_PRODUCT} element={<CreateProduct />} />
        <Route path={RoutesEnum.PRODUCT_MANAGEMENT} element={<EditProduct />} />
        {role === "admin" && (
          <Route path={RoutesEnum.ADMIN} element={<AdminPage />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
