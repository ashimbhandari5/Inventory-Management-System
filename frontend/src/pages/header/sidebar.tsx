import { PackageOpen, ReceiptText, User2 } from "lucide-react";
import { NavLink } from "react-router";
import "./sidebar.css";

export default function Sidebar() {
  return (
    <div
      className="sidebar"
      style={{ backgroundColor: "#1E201E", color: "white" }}
    >
      <div style={{ display: "flex", height: 80, alignItems: "center" }}>
        <img src="/vite.svg" height={45} width="100%" />
      </div>
      <ul>
        <li>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? "active-item" : "")}
          >
            <PackageOpen />
            Products
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sales"
            className={({ isActive }) => (isActive ? "active-item" : "")}
          >
            <ReceiptText />
            Sales
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/ads"
            className={({ isActive }) => (isActive ? "active-item" : "")}
          >
            <User2 />
            Users
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
