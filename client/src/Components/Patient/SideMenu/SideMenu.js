import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Images } from "../../../utils/Images";
import { Icon } from "react-icons-kit";
import { useHistory } from "react-router-dom";
import {
  ic_apps,
  ic_home,
  ic_people,
  ic_person,
  ic_lock,
} from "react-icons-kit/md";
import axios from "axios";
import { apiURL } from "../../../utils/apiURL";
import "./style.scss";
const SideMenu = ({ user }) => {
  const [isLoading, setLoading] = useState(false);
  let history = useHistory();
  const [header] = useState({
    headers: { Authorization: "Bearer" + localStorage.getItem("token") },
  });

  const doLogout = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiURL}/auth/logout`, header);
      if (response.status === 200) {
        localStorage.clear();
        history.push("/");
      }
    } catch (error) {
      if (error) {
        localStorage.clear();
        history.push("/");
      }
    }
  };
  console.log(user);
  return (
    <div className="patient-sidemenu">
      {/* Header */}
      <div className="header">
        <div className="d-flex">
          <div className="img-box rounded-circle">
            {user.image ? (
              <img src={user.image} className="img-fluid" alt="..." />
            ) : (
              <img src={Images.FakeUser} className="img-fluid" alt="..." />
            )}
          </div>
          <div className="content pt-3">
            <p>{user.name ? user.name : user.email}</p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="body">
        <NavLink
          exact
          activeClassName="is-Active"
          className="btn btn-block shadow-none"
          to="/"
        >
          <div className="icon-box rounded-circle border">
            <div className="flex-center flex-column">
              <Icon icon={ic_home} size={20} />
            </div>
          </div>
          <p>Home</p>
        </NavLink>
        <br />
        <br />
        <NavLink
          exact
          activeClassName="is-Active"
          className="btn btn-block shadow-none"
          to="/patient/profile"
        >
          <div className="icon-box rounded-circle border">
            <div className="flex-center flex-column">
              <Icon icon={ic_person} size={20} />
            </div>
          </div>
          <p>My profile</p>
        </NavLink>
        <br />
        <br />
        <NavLink
          exact
          activeClassName="is-Active"
          className="btn btn-block shadow-none"
          to="/patient/appointments"
        >
          <div className="icon-box rounded-circle border">
            <div className="flex-center flex-column">
              <Icon icon={ic_people} size={20} />
            </div>
          </div>
          <p>Appointments</p>
        </NavLink>
        <br />
        <br />
        <button
          type="button"
          className="btn btn-block shadow-none"
          onClick={doLogout}
          disabled={isLoading}
        >
          <div className="icon-box rounded-circle border">
            <div className="flex-center flex-column">
              <Icon icon={ic_lock} size={18} />
            </div>
          </div>
          {isLoading ? <span>Logging out...</span> : <span>logout</span>}
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
