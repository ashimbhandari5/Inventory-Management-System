import "./App.css";
import Header from "./pages/header/header";
/*import Table from "./components/table";*/
/*import Form from "./components/form";*/
import AddProduct from "../src/pages/products/addproducts";
import { Routes } from "react-router";
import { Route } from "react-router";
import Products from "./pages/products";
import AddSales from "../src/pages/sales/addSales";
import Sales from "../src/pages/sales";
import Login from "./pages/header/login";
import Signup from "./pages/header/signup";

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Header />
      {/* <Table /> */}
      {/*<Form />*/}
      {/* <Login/>
      <Signup/> */}
      <AppRoutes />
    </div>
  );
}
function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Products />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/add" element={<AddProduct />} />
      <Route path="/" element={<Sales />} />
      <Route path="/sales" element={<Sales />} />
      <Route path="/sales/add" element={<AddSales />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
