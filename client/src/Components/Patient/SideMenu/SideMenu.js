import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Images } from "../../../utils/Images";
import { Icon } from "react-icons-kit";
import { useHistory } from "react-router-dom";
import {
  ic_home,
  ic_apps,
  ic_people,
  ic_person,
  ic_lock,
} from "react-icons-kit/md";
import axios from "axios";
import { apiURL } from "../../../utils/apiURL";

const SideMenu = ({ user }) => {
  const [isLoading, setLoading] = useState(false);
  let history = useHistory();
  const [header] = useState({
    headers: { Authorization: "Bearer" + localStorage.getItem("token") },
  });

  const doLogOut = async () => {
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
    <div>
      <div className="patient-sidemenu">
        <div className="header">
          <div className="d-flex">
            <div className="img-box rounded-circle">
              {user.image ? (
                <img src={user.image} alt="" className="img-fluid" />
              ) : (
                <img src={Images.FakeUser} alt="" className="img-fluid" />
              )}
              {/* <img src={Images.FakeUser} alt="" className="img-fluid" /> */}
            </div>
            <div className="content pt-3">
              <p>{user.email}</p>
            </div>
          </div>
        </div>
        <div className="body">
          <NavLink to="/">
            <div className="flex-column flex-center">
              <Icon icon={ic_home} size={20} />
              <p>Home</p>
            </div>
          </NavLink>
          <NavLink to="/patient/">
            <Icon icon={ic_apps} size={20} />
            <p>Dashboard</p>
          </NavLink>
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
            <p>appointments</p>
          </NavLink>
          <button
            type="button"
            onClick={doLogOut}
            className="btn btn-block shadow-none"
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
    </div>
  );
};

export default SideMenu;
