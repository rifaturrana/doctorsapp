import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { apiURL } from "../../../../utils/apiURL";
import { Images } from "../../../../utils/Images";

const Master = () => {
  const history = useHistory();
  const [step, setstep] = useState(null);
  const [doctor, setdoctor] = useState({});
  const [preLoading, setPreloading] = useState(true);
  // const id = localStorage.getItem("id");
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
  }, []);

  // console.log(doctor);
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
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1>{doctor._id}</h1>
    </div>
  );
};

export default Master;
