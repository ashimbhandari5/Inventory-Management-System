import "./App.css";
// import Header from "./pages/header/header";
/*import Table from "./components/table";*/
/*import Form from "./components/form";*/
import AddProduct from "../src/pages/products/addproducts";
import { Navigate, Routes } from "react-router";
import { Route } from "react-router";
import Products from "./pages/products";
import AddSales from "../src/pages/sales/addSales";
import Sales from "../src/pages/sales";
import Login from "./pages/header/login";
import Signup from "./pages/header/signup";
import NewOrganization from "./pages/header/newOrganization";
import AppLayout from "./pages/appLayout";
import { useContext } from "react";
import { AuthContext } from "./components/context/authContext";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? <AppLayout /> : <Navigate to={"/login"} />;
};
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<Products />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/add" element={<AddProduct />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/sales/add" element={<AddSales />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/organizations" element={<NewOrganization />} />
        <Route path="*" element={<p>Page not found..</p>} />
      </Route>
    </Routes>
  );
}

export default App;
