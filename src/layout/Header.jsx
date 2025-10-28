import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/context/AuthContext";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const { user, isLogin, logout } = useAuth();
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate("/login");
  }
  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <Link className="navbar-brand ms-2" to={"/"}>
        Admin Desk
      </Link>
      {/* <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarCollapse"
        aria-controls="navbarCollapse"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button> */}

      <div className="collapse navbar-collapse" id="navbarCollapse">
        {/* <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to={"/home"}>
              Home
            </Link>
          </li>
        </ul> */}
      </div>
      {isLogin ? (
        <div className="d-flex align-items-center justify-content-end">
          <h5 className="text-white me-2 mt-2">{user?.name}</h5>
          <Link className="btn btn-outline-light me-2" onClick={handleLogout}>
            Logout
          </Link>
        </div>
      ) : (
        <div className="d-flex justify-content-end">
          <Link className="btn btn-outline-light me-2" to={"/login"}>
            Login
          </Link>
          <Link className="btn btn-outline-light" to={"/signup"}>
            Sign-up
          </Link>
        </div>
      )}
    </nav>
  );
}
