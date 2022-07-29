import React, { useEffect } from "react";
import { useState } from "react";
import { Images } from "../../../utils/Images";
import { Link, useHistory } from "react-router-dom";
import { standby } from "react-icons-kit/iconic";
import Icon from "react-icons-kit";
import axios from "axios";
import "./style.scss";
import { apiURL } from "../../../utils/apiURL";
const Index = () => {
  const history = useHistory();
  const [show, setShow] = useState(false);
  const [isLogout, setLogout] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState([]);
  const [header] = useState({
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });
  const doLogout = async () => {
    try {
      setLogout(true);
      const response = await axios(`${apiURL}/admin/auth/logout`, header);
      if (response.status === 200) {
        setTimeout(() => {
          setLogout(false);
          localStorage.clear();
          history.push("/");
        }, 1000);
      }
    } catch (error) {
      if (error) {
        setTimeout(() => {
          setLogout(false);
          localStorage.clear();
          history.push("/");
        }, 1000);
      }
    }
  };
  return (
    <nav
      className="navbar navbar-expand-lg  fixed-top mb-2"
      style={{ backgroundColor: "#f0e4e4 " }}
    >
      <div className="container-fluid">
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
          <ul className="navbar-nav text-center  ">
            <li className="nav-item ">
              <Link className="nav-link" to="/admin/">
                <span className="text">Dashboard</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/doctor">
                <span className="text">Doctors</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/admin/admin-list">
                <span className="text">Admin</span>
              </Link>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="style btn shadow-none"
                onClick={doLogout}
                disabled={isLogout}
              >
                <Icon icon={standby} size={18} />
                {isLogout ? <span>Logging out...</span> : <span>Logout</span>}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Index;
