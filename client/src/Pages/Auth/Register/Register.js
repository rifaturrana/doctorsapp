import React, { useState } from "react";
import { Images } from "../../../utils/Images";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiURL } from "../../../utils/apiURL";
import Icon from "react-icons-kit";
import { ic_done } from "react-icons-kit/md";
import "../styles.scss";
import axios from "axios";

toast.configure({ autoClose: 2000 });
const Register = () => {
  const [accountType, setAccountType] = useState("patient");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const newData = {
        role: accountType,
        email: data.email,
        password: data.password,
      };
      // console.log(newData);
      setLoading(true);
      const response = await axios.post(
        `${apiURL}/api/v1/auth/register`,
        newData
      );
      // console.log(response);
      if (response.status === 201) {
        toast.success(response.data.message);
        setLoading(false);
        history.push("/login");
      }

      if (response.status === 208) {
        toast.warn(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      if (error) {
        setLoading(false);
        toast.warn(error.message);
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
              <h6>Hello Patient!</h6>

              <h6>Please fill out the form below to get started</h6>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group mb-2">
                {errors.email && errors.email.message ? (
                  <small className="text-danger">
                    {errors.email && errors.email.message}
                  </small>
                ) : (
                  <small>E-mail</small>
                )}
                <input
                  type="text"
                  name="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  className={
                    errors.email
                      ? "form-control shadow-none danger-border"
                      : "form-control shadow-none"
                  }
                  placeholder="E-mail"
                />
              </div>
              <div className="form-group mb-3">
                {errors.password && errors.password.message ? (
                  <small className="text-danger">
                    {errors.password && errors.password.message}
                  </small>
                ) : (
                  <small>Password</small>
                )}
                <input
                  type="password"
                  name="password"
                  className={
                    errors.password
                      ? "form-control shadow-none danger-border"
                      : "form-control shadow-none"
                  }
                  {...register("password", {
                    required: "Please enter password",
                    minLength: {
                      value: 8,
                      message: "Minimun length 8 character",
                    },
                  })}
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
                    {loading ? <span>Loading...</span> : <span>Register</span>}
                  </button>
                </div>
              </div>

              <div className="d-flex justify-content-center pt-2">
                <p className="text-muted">
                  Have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </form>

            {/* <form onSubmit={handleSubmit(onSubmit)}>
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
                  <p>Have account?</p>
                  <Link to="/login">Login</Link>
                </div>
                <div>
                  <button className="btn btn-primary">
                    <span>Register</span>
                  </button>
                </div>
              </div>
            </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
