import React, { useState } from "react";
import "../../Patient/Profile/style.scss";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Images } from "../../../../utils/Images";

import { apiURL } from "../../../../utils/apiURL";
import { checkIfError } from "../../../../utils/Error";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure({ autoClose: 2000 });
const Index = ({ doctor }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [previewURL, setPreviewURL] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isUpload, setUpload] = useState(false);
  const id = localStorage.getItem("id");
  const [header] = useState({
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });

  console.log(doctor);
  // Image onChange
  const imageChangeHandeller = async (event) => {
    const file = event.target.files[0];

    try {
      if (file) {
        setPreviewURL(URL.createObjectURL(event.target.files[0]));
        let formData = new FormData();
        formData.append("image", file);

        setUpload(true);
        const response = await axios.post(
          `${apiURL}/doctor/profile/${id}/update/photo`,
          formData,
          header
        );
        console.log(response);
        if (response.status === 201) {
          setUpload(false);
          toast.success(response.data.message);
        }
      }
    } catch (error) {
      if (error) {
        setUpload(false);
        checkIfError(error);
      }
    }
  };
  console.log(previewURL);
  // const response = axios.get(`${apiURL}/patient/me`, header);
  // console.log(response.data);
  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${apiURL}/doctor/profile/${id}/update/bio`,
        data,
        header
      );
      if (response.status === 201) {
        setLoading(false);
        toast.success(response.data.message);
      }
    } catch (error) {
      if (error) checkIfError(error);
    }
  };

  return (
    <div className="patient-profile">
      <div className="container-fluid py-3 py-lg-0">
        <div className="row">
          <div className="col-12 pl-lg-0">
            <div className="card border-0 shadow">
              <div className="card-body px-md-4">
                {/* Image Container */}
                <div className="img-container text-center">
                  <div className="image rounded-circle border">
                    {doctor && doctor.image ? (
                      <img src={doctor.image} className="img-fluid" alt="..." />
                    ) : previewURL ? (
                      <img src={previewURL} className="img-fluid" alt="..." />
                    ) : (
                      <img
                        src={Images.Fakedoctor}
                        className="img-fluid"
                        alt="..."
                      />
                    )}
                    <div className="overlay">
                      <div className="flex-center flex-column">
                        {isUpload ? null : (
                          <input
                            type="file"
                            className="upload"
                            onChange={imageChangeHandeller}
                          />
                        )}
                        {isUpload ? (
                          <p className="mb-0">Uploading...</p>
                        ) : (
                          <p className="mb-0">Change</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <br />
                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    {/* Name */}
                    <div className="col-12 col-md-6 pr-md-2">
                      <div className="form-group mb-3">
                        {errors.name && errors.name.message ? (
                          <p className="text-danger">
                            {errors.name && errors.name.message}
                          </p>
                        ) : (
                          <p>Name</p>
                        )}

                        <input
                          type="text"
                          name="name"
                          defaultValue={doctor ? doctor.name : null}
                          {...register("name", {
                            required: "Name is required",
                          })}
                          className="form-control shadow-none"
                          placeholder="Name"
                        />
                      </div>
                    </div>

                    {/* Email */}

                    {/* College */}
                    <div className="col-12 col-md-6 pr-md-2">
                      <div className="form-group mb-3">
                        {errors.college && errors.college.message ? (
                          <p className="text-danger">
                            {errors.college && errors.college.message}
                          </p>
                        ) : (
                          <p>College</p>
                        )}

                        <input
                          type="text"
                          name="college"
                          defaultValue={doctor ? doctor.college : null}
                          {...register("college", {
                            required: "College is required",
                          })}
                          className="form-control shadow-none"
                        />
                      </div>
                    </div>

                    {/* passing_year */}
                    <div className="col-12 col-md-6 pl-md-2">
                      <div className="form-group mb-3">
                        {errors.passingYear && errors.passingYear.message ? (
                          <p className="text-danger">
                            {errors.passingYear && errors.passingYear.message}
                          </p>
                        ) : (
                          <p>Passing Year</p>
                        )}

                        <input
                          type="text"
                          name="passingYear"
                          defaultValue={doctor ? doctor.passingYear : null}
                          {...register("passingYear", {
                            required: "passingYear is required",
                          })}
                          className="form-control shadow-none"
                        />
                      </div>
                    </div>

                    {/* currentHospital */}
                    <div className="col-12 col-md-6 pr-md-2">
                      <div className="form-group mb-3">
                        {errors.currentHospital &&
                        errors.currentHospital.message ? (
                          <p className="text-danger">
                            {errors.currentHospital &&
                              errors.currentHospital.message}
                          </p>
                        ) : (
                          <p>currentHospital</p>
                        )}

                        <input
                          type="text"
                          name="currentHospital"
                          defaultValue={doctor ? doctor.currentHospital : null}
                          {...register("currentHospital", {
                            required: "currentHospital is required",
                          })}
                          className="form-control shadow-none"
                          placeholder="currentHospital "
                        />
                      </div>
                    </div>

                    {/* Specialist */}
                    <div className="col-12 col-md-6 pl-md-2">
                      <div className="form-group mb-3">
                        {errors.specialist && errors.specialist.message ? (
                          <p className="text-danger">
                            {errors.specialist && errors.specialist.message}
                          </p>
                        ) : (
                          <p>specialist</p>
                        )}

                        <input
                          type="text"
                          name="specialist"
                          defaultValue={doctor ? doctor.specialist : null}
                          {...register("specialist", {
                            required: "specialist is required",
                          })}
                          className="form-control shadow-none"
                        />
                      </div>
                    </div>

                    <div className="col-12 text-right">
                      <button
                        type="submit"
                        className="btn shadow-none"
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <span>Updating ...</span>
                        ) : (
                          <span>Update</span>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
