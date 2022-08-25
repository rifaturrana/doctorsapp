import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import axios from "axios";
import "./style.scss";
import { apiURL } from "../../../../utils/apiURL";
import Icon from "react-icons-kit";
import { ic_dehaze } from "react-icons-kit/md";
import { Images } from "../../../../utils/Images";
import StepOne from "../../../../Components/Doctor/ProfileUpdate/StepOne";
import StepTwo from "../../../../Components/Doctor/ProfileUpdate/StepTwo";
import StepFive from "../../../../Components/Doctor/ProfileUpdate/StepFive";
import StepThree from "../../../../Components/Doctor/ProfileUpdate/StepThree";
import StepFour from "../../../../Components/Doctor/ProfileUpdate/StepFour";
import SideMenu from "../../../../Components/Doctor/SideMenu/SideMenu";
import AppointmentsIndex from ".././Appointment/index";
import Profile from ".././Profile/Profile";
import RequestsIndex from ".././Request/index";
import FourOFour from "../../../FourOFour/index";
const Master = () => {
  const history = useHistory();
  const [step, setstep] = useState(null);
  const [show, setShow] = useState(false);
  const [isDaialog, setDaialog] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const [doctor, setdoctor] = useState({});
  const [preLoading, setPreloading] = useState(true);
  const id = localStorage.getItem("id");
  const [header] = useState({
    headers: { Authorization: "Bearer" + localStorage.getItem("token") },
  });
  console.log(header);
  const loggedDoctor = useCallback(async () => {
    try {
      const response = await axios.get(`${apiURL}/doctor/me`, header);
      if (response.status === 200) {
        setdoctor(response.data.doctor);
        setstep(response.data.doctor.updateStep);
        setPreloading(false);
      }
    } catch (error) {
      if (error) console.log(error.response);
    }
  }, [header]);
  useEffect(() => {
    loggedDoctor();
  }, [id, header, loggedDoctor]);
  const handleProfileEdit = (data) => setDaialog(data);
  const updateResponse = (responseStep) => {
    loggedDoctor();
    setstep(responseStep);
  };
  // console.log(doctor);
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
  if (preLoading) {
    return (
      <div className="loader" style={{ width: "100%", height: "100vh" }}>
        <div className="flex-center flex-column">
          <img src={Images.Loading} className="img-fluid" alt="..." />
        </div>
      </div>
    );
  }
  if (doctor.isApproved === "pending") {
    return (
      <div className="update-page">
        <div className="flex-center flex-column">
          <div className="card rounded-0 border-o shadow">
            <div className="card-header bg-white p-4">
              <h5 className="mb-0">Hello doctor!</h5>
              <p className="mb-0">
                Your account has been deactivated, fill all field & submit to
                active.
              </p>
            </div>
            <div className="card-body p-4">
              <small>Profile Updated</small>
              <div className="progress mb-3">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{ width: doctor.updateRange + "%" }}
                  aria-valuenow={doctor.updateRange}
                  aria-valuemin="0"
                  aria-valuemax="100"
                >
                  {doctor.updateRange}%
                </div>
              </div>

              {step === 1 ? (
                <StepOne responsestep={updateResponse} id={id} />
              ) : step === 2 ? (
                <StepTwo responsestep={updateResponse} id={id} />
              ) : step === 3 ? (
                <StepThree responsestep={updateResponse} id={id} />
              ) : step === 4 ? (
                <StepFour responsestep={updateResponse} id={id} />
              ) : step === 5 ? (
                <StepFive responsestep={updateResponse} id={id} />
              ) : null}
              <div className="text-center">
                <button
                  type="button"
                  className="btn shadow-none"
                  onClick={doLogout}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span>Logging out ...</span>
                  ) : (
                    <span>Logout</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (doctor.isApproved === "submitted") {
    return (
      <div className="update-page">
        <div className="flex-center flex-column">
          <div className="card rounded-0 border-0 shadow">
            <div className="card-header bg-white p-4">
              <h5 className="mb-0">Hello doctor !</h5>
              <p className="mb-0">
                Your account has been submitted, Please wait for admin approval.
              </p>
            </div>
            <div className="card-body text-center">
              <img
                src={Images.PendingApproval}
                className="img-fluid"
                alt="..."
              />
              <div className="text-center">
                <button
                  type="button"
                  className="btn shadow-none"
                  onClick={doLogout}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span>Logging out ...</span>
                  ) : (
                    <span>Logout</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="master">
      {/* Mobile Navbar */}
      <div className="mobile-navbar d-lg-none p-3">
        <div className="d-flex">
          <div>
            <p>{doctor.name ?? doctor.email}</p>
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
            <SideMenu editdialog={handleProfileEdit} doctor={doctor} />
          </div>
        </div>

        {/* Main */}
        <div className="main flex-fill">
          <Switch>
            {/* <Route exact path="/doctor/" component={DashboardIndex} /> */}
            <Route
              exact
              path="/doctor/appointments"
              component={AppointmentsIndex}
            />{" "}
            <Route exact path="/doctor/profile">
              <Profile doctor={doctor} />
            </Route>
            <Route exact path="/doctor/requests" component={RequestsIndex} />
            <Route path="*" component={FourOFour} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default Master;
