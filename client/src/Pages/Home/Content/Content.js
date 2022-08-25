import React from "react";
import "./Content.scss";
import { Images } from "../../../utils/Images";
const Content = () => {
  return (
    <>
      <div className=" content">
        <div className="mb-5">
          <hr
            style={{
              width: "20%",
              height: " 1px",
              backgroundColor: "black",
              border: "none",
              margin: "auto",
            }}
          />
          <h2 style={{ textAlign: "center" }}>How it works</h2>
          <hr
            style={{
              width: "20%",
              height: " 1px",
              backgroundColor: "black",
              border: "none",
              margin: "auto",
            }}
          />
        </div>
      </div>

      <div
        id="carouselExampleDark"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="10000">
            <img
              src={Images.works1}
              className="d-block h-100 w-40 m-auto"
              alt="..."
            />
            <div
              // style={{ marginTop: "10px" }}
              className="carousel-caption d-none d-md-block"
            >
              <h6 style={{ fontWeight: "bold", color: "black" }}>
                Search Doctor
              </h6>
              <p style={{ fontWeight: "bold", color: "black" }}>
                Find your doctor easily with a minimum of effort. We&#039;ve
                kept everything organised for you.
              </p>
            </div>
          </div>
          <div className="carousel-item active" data-bs-interval="10000">
            <img
              src={Images.works2}
              className="d-block h-100 w-40 m-auto"
              alt="..."
            />
            <div
              // style={{ marginTop: "10px" }}
              className="carousel-caption d-none d-md-block"
            >
              <h6 style={{ fontWeight: "bold", color: "black" }}>
                Book Appointment
              </h6>
              <p style={{ fontWeight: "bold", color: "black" }}>
                Ask for an appointment of the doctor quickly with almost a
                single click. We take care of the rest.
              </p>
            </div>
          </div>
          <div className="carousel-item active" data-bs-interval="10000">
            <img
              src={Images.works3}
              className="d-block h-100 w-40 m-auto"
              alt="..."
            />
            <div
              // style={{ marginTop: "10px" }}
              className="carousel-caption d-none d-md-block"
            >
              <h6 style={{ fontWeight: "bold", color: "black" }}>
                GET WELL SOON
              </h6>
              <p style={{ fontWeight: "bold", color: "black" }}>
                Visit the doctor, take the service based on your appointment.
                Get back to good health and happiness.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
};

export default Content;
