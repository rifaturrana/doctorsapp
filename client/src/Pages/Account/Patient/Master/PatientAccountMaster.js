import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../../../utils/apiURL";
import { Images } from "../../../../utils/Images";
import { ic_dehaze } from "react-icons-kit/md";
import Icon from "react-icons-kit";
import SideMenu from "../../../../Components/Patient/SideMenu/SideMenu";
import { Switch, Route } from "react-router-dom";
import ProfileIndex from ".././Profile/index";
import AppointmentIndex from ".././Appointments/index";
import FourOFour from "../../.././FourOFour/index";
import DashboardIndex from ".././Dashboard/index";
const Master = () => {
  const [user, setUser] = useState({});
  const [show, setShow] = useState(false);

  const [id] = localStorage.getItem("id");
  const [isLoading, setLoading] = useState(true);
  const [header] = useState({
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });

  useEffect(() => {
    const loggedUser = async () => {
      try {
        const response = await axios.get(`${apiURL}/patient/me`, header);
        console.log(response.data);
        if (response.status === 200) {
          setUser(response.data.patient);
          setLoading(false);
          localStorage.setItem(
            "patient",
            JSON.stringify(response.data.patient)
          );
        }
      } catch (error) {
        if (error) {
          console.log(error);
        }
      }
    };
    loggedUser();
  }, [id, header]);
  console.log(user);
  if (isLoading) {
    return (
      <div className="loader">
        <div className="flex-center flex-column">
          <img src={Images.Loading} className="img-fluid" alt="..." />
        </div>
      </div>
    );
  }

  return (
    <div className="patient-master">
      {/* Mobile Navbar */}
      <div className="mobile-navbar d-lg-none p-3">
        <div className="d-flex">
          <div>
            <p>{user.name ? user.name : user.email}</p>
          </div>
          <div className="ml-auto">
            <button
              type="button"
              className="btn btn-light rounded-circle shadow-none"
              onClick={() => setShow(true)}
            >
              <Icon icon={ic_dehaze} size={25} />
            </button>
          </div>
        </div>
      </div>
      <div className="d-flex">
        {/* Sidebar */}
        <div className="sidebar">
          <div
            className={show ? "backdrop open-backdrop" : "backdrop"}
            onClick={() => setShow(false)}
          ></div>
          <div
            className={show ? "main-sidebar open-main-sidebar" : "main-sidebar"}
          >
            <SideMenu user={user} />
          </div>
        </div>

        {/* Main */}
        <div className="main flex-fill">
          <Switch>
            <Route exact path="/patient/" component={DashboardIndex} />

            <Route exact path="/patient/profile">
              <ProfileIndex user={user} />
            </Route>
            <Route
              exact
              path="/patient/appointments"
              component={AppointmentIndex}
            />
            <Route path="*" component={FourOFour} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Master;
