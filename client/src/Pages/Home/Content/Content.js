import React from "react";
import "./Content.scss";
import { Images } from "../../../utils/Images";
const Content = () => {
  return (
    <div className="text-center ">
      <div className="mb-5">
        <h3>How it works</h3>
      </div>

      <section className="upper-part d-flex">
        <div className="left-section half-width ">
          <h6>Search Doctor</h6>
          <p>
            Find your doctor easily with a minimum of effort. We&#039;ve kept
            everything organised for you.
          </p>
        </div>
        <div className="right-section half-width">
          <img src={Images.works1} alt="" />
        </div>
      </section>
      <section className="middle-part d-flex ">
        <div className="half-width middle-left-section">
          <img src={Images.works2} alt="" />
        </div>
        <div className="half-width middle-right-section p-5">
          <h6>Book Appointment</h6>
          <p>
            Ask for an appointment of the doctor quickly with almost a single
            click. We take care of the rest.
          </p>
        </div>
      </section>
      <section className="upper-part d-flex ">
        <div className="left-section half-width p-5">
          <h6>GET WELL SOON</h6>
          <p>
            Visit the doctor, take the service based on your appointment. Get
            back to good health and happiness.
          </p>
        </div>
        <div className="right-section half-width">
          <img src={Images.works3} alt="" />
        </div>
      </section>
    </div>
  );
};

export default Content;
