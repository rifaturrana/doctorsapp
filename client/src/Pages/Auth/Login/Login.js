import React, { useState } from "react";
import "../styles.scss";
import { Images } from "../../../utils/Images";
import { Link } from "react-router-dom";
import Icon from "react-icons-kit";
import { ic_done } from "react-icons-kit/md";

const Login = () => {
  const [accountType, setAccountType] = useState("patient");

  return (
    <div className="login">
      <div className="flex-center flex-colum">
        <div className="card shadow border-0 rounded 0">
          <div className="card-header text-center bg-white border-0">
            <h5 className="mb-0">Choose Account type</h5>
          </div>
          <div className="card-body">
            <div className="account-type-container d-flex">
              <div className="flex-fill p-2">
                <div
                  className={
                    accountType === "patient"
                      ? "active account p-2"
                      : "account p-2"
                  }
                  onClick={() => setAccountType("patient")}
                >
                  <img
                    className="img-fluid"
                    src={Images.PatientVector}
                    alt=""
                  />
                  <p className="text-center">Patient</p>
                  {accountType === "patient" ? (
                    <Icon
                      icon={ic_done}
                      size={26}
                      className="done-icon shadow"
                    />
                  ) : null}
                </div>
              </div>
              <div className="flex-fill p-2">
                <div
                  className={
                    accountType === "doctor"
                      ? "active account p-2"
                      : "account p-2"
                  }
                  onClick={() => setAccountType("doctor")}
                >
                  <img className="img-fluid" src={Images.DoctorVector} alt="" />
                  <p className="text-center">Doctor</p>
                  {accountType === "doctor" ? (
                    <Icon
                      icon={ic_done}
                      size={26}
                      className="done-icon shadow"
                    />
                  ) : null}
                </div>
              </div>
            </div>
            <div className="text-center">
              <h6>Hello {accountType}!</h6>

              <h6>Please fill out the form below to get started</h6>
            </div>

            <form>
              <div class="form-group mb-4">
                <label for="exampleInputEmail1">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Enter email"
                />
                <small id="emailHelp" class="form-text text-muted">
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div class="form-group mb-4">
                <label for="exampleInputPassword1">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                />
              </div>
              <div className="d-flex">
                <div className="d-flex pt-2 me-2">
                  <p>No account?</p>
                  <Link to="/register">Register</Link>
                </div>
                <div>
                  <button className="btn btn-primary">
                    <span>Login</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
