import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/utils/context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaHome,
  FaUserFriends,
  FaBoxOpen,
  FaShoppingCart,
  FaUsers,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const menuItems = [
    { name: "Home", path: "/admin/home", icon: <FaHome /> },
    { name: "Users", path: "/admin/users", icon: <FaUserFriends /> },
    { name: "Orders", path: "/admin/orders", icon: <FaShoppingCart /> },
    { name: "Products", path: "/admin/products", icon: <FaBoxOpen /> },
    { name: "Customers", path: "/admin/customers", icon: <FaUsers /> },
  ];

  return (
    <>
      {/* Sidebar Toggle Button (Visible on smaller screens) */}
      <button
        className="btn btn-white text-white position-fixed top-0 start-0 m-3 d-md-none z-3"
        onClick={() => setIsOpen(prev => !prev)}
      >
        {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="sidebar"
            initial={{ x: -250, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -250, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark position-fixed top-0 start-0 vh-100"
            style={{ width: "240px", zIndex: 2 }}
          >
            {/* Sidebar Header */}
            <div className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
              <span className="fs-4 fw-bold">Admin Panel</span>
            </div>
            <hr />

            {/* Menu Items */}
            <ul className="nav nav-pills flex-column mb-auto">
              {menuItems.map(item => (
                <li className="nav-item" key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `nav-link d-flex align-items-center gap-2 ${
                        isActive ? "active text-white bg-primary" : "text-white"
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Logout */}
            <div className="mt-auto">
              <button
                className="btn btn-outline-light w-100 d-flex align-items-center gap-2 justify-content-center"
                onClick={handleLogout}
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
