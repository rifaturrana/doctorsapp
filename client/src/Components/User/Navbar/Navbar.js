import React, { useEffect } from "react";
import { useState } from "react";
import { Images } from "../../../utils/Images";
import { Link } from "react-router-dom";
import "./Navbar.scss";
const Navbar = () => {
  const [token, settoken] = useState(
    localStorage.getItem("token") || undefined
  );
  console.log(token);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      settoken(localStorage.getItem("token"));
    }
  }, []);
  return (
    <nav
      className="navbar navbar-expand-lg  fixed-top mb-2"
      style={{ backgroundColor: "#f0e4e4 " }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={Images.Logo} alt="" width="40" height="40" />
          <span
            style={{
              color: "blue",
              fontFamily: "sans-serif",
              fontStyle: "bold",
            }}
          >
            DoctorApp
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#toogleMobileMenu"
          aria-controls="toogleMobileMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="toogleMobileMenu">
          <ul className="navbar-nav mx-auto    text-center  ">
            <li className="nav-item ">
              <Link className="nav-link" to="/">
                <span className="text">Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                <span className="text">About</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                <span className="text">Contact</span>
              </Link>
            </li>
            <li className="nav-item">
              {token ? (
                <Link className="nav-link" to="/login">
                  <span className="text">Profile</span>
                </Link>
              ) : (
                <Link className="nav-link" to="/login">
                  <span className="text">Login</span>
                </Link>
              )}
              {/* <Link className="nav-link" to="/login">
                <span className="text">Login</span>
              </Link> */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
