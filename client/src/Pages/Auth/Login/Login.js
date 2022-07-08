import React, { useState } from "react";
import "../styles.scss";
import { useForm } from "react-hook-form";
import { Images } from "../../../utils/Images";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Icon from "react-icons-kit";
import { ic_done } from "react-icons-kit/md";
import { useHistory } from "react-router-dom";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { apiURL } from "../../../utils/apiURL";
toast.configure({ autoClose: 2000 });
const Login = () => {
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [accountType, setAccountType] = useState("patient");
  const [loading, setloading] = useState(false);

  const token = localStorage.getItem("token");
  const checkRole = (token) => {
    const decode = jwt_decode(token);
    // console.log(decode);
    const role = decode.role;
    const id = decode.id;
    localStorage.setItem("id", id);
    if (role === "doctor") {
      history.push("/doctor");
    }
    if (role === "patient") {
      history.push("/patient");
    }
  };
  if (token) {
    checkRole(token);
  }
  const onSubmit = async (data) => {
    try {
      const newData = {
        role: accountType,
        email: data.email,
        password: data.password,
      };
      // console.log(newData);
      setloading(true);
      const response = await axios.post(`${apiURL}/api/v1/auth/login`, newData);
      // console.log(response);
      if (response.status === 200) {
        setloading(false);
        localStorage.setItem("token", response.data.token);
        checkRole(response.data.token);
      }
    } catch (error) {
      if (error) {
        setloading(false);
        toast.warn(error.response.data.message);
      }
    }
  };

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

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* E-mail */}
              <div className="form-group mb-4">
                <input
                  type="text"
                  name="email"
                  {...register("email", { required: true })}
                  className={
                    errors.email
                      ? "form-control shadow-none danger-border"
                      : "form-control shadow-none"
                  }
                  placeholder="E-mail"
                />
              </div>

              {/* Password */}
              <div className="form-group mb-4">
                <input
                  type="password"
                  name="password"
                  {...register("password", { required: true })}
                  className={
                    errors.password
                      ? "form-control shadow-none danger-border"
                      : "form-control shadow-none"
                  }
                  placeholder="Password"
                />
              </div>

              <div className="d-flex justify-content-center ">
                <div className="ml-auto">
                  <button
                    type="submit"
                    className="btn shadow-none"
                    disabled={loading}
                  >
                    {loading ? <span>Loading...</span> : <span>Login</span>}
                  </button>
                </div>
              </div>

              <div className="d-flex justify-content-center pt-2">
                <p className="text-muted">
                  No account? <Link to="/register">Register</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
