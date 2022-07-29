import React, { useState } from "react";
import "./style.scss";
import { NavLink, useHistory } from "react-router-dom";
import { Icon } from "react-icons-kit";
import {
  ic_person,
  ic_people,
  ic_info_outline,
  ic_lock,
  ic_home,
} from "react-icons-kit/md";
import axios from "axios";
import { apiURL } from "../../../utils/apiURL";
import { Images } from "../../../utils/Images";
import { ic_edit } from "react-icons-kit/md";

const SideMenu = ({ doctor, editdialog }) => {
  const history = useHistory();
  const [isLoading, setLoading] = useState(false);
  const [header] = useState({
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });

  // Logout
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

  return (
    <div className="side-menu">
      {/* Header */}
      <div className="header">
        <div className="d-flex">
          <div className="img-box rounded-circle">
            {doctor.image ? (
              <img src={doctor.image} className="img-fluid" alt="..." />
            ) : (
              <img src={Images.FakeUser} className="img-fluid" alt="..." />
            )}
          </div>
          <div className="content">
            <p>{doctor.name ? doctor.name : doctor.email}</p>
            <small className="text-capitalize">
              {doctor.specialist ?? null}
            </small>
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
        {/* <NavLink
          exact
          activeClassName="is-Active"
          className="btn btn-block shadow-none"
          to="/doctor/"
        >
          <Icon icon={ic_apps} size={20} />
          <span>dashboard</span>
        </NavLink> */}
        <NavLink
          exact
          activeClassName="is-Active"
          className="btn btn-block shadow-none"
          to="/doctor/appointments"
        >
          <Icon icon={ic_people} size={20} />
          <span>appointments</span>
        </NavLink>
        <NavLink
          exact
          activeClassName="is-Active"
          className="btn btn-block shadow-none"
          to="/doctor/requests"
        >
          <Icon icon={ic_info_outline} size={20} />
          <span>Requests</span>
        </NavLink>
        <NavLink
          exact
          activeClassName="is-Active"
          className="btn btn-block shadow-none"
          to="/doctor/profile"
        >
          <div className="icon-box rounded-circle border">
            <div className="flex-center flex-column">
              <Icon icon={ic_person} size={20} />
            </div>
          </div>
          <p>My profile</p>
        </NavLink>

        <button
          type="button"
          className="btn btn-block shadow-none"
          onClick={doLogout}
          disabled={isLoading}
        >
          <Icon icon={ic_lock} size={18} />
          {isLoading ? <span>Logging out...</span> : <span>logout</span>}
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
