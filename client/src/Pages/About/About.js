import React from "react";
import "./About.scss";
import { Images } from "../../utils/Images";
import Navbar from "../../Components/User/Navbar/Navbar";
import Footer from "../../Components/User/Footer/Footer";
const About = () => {
  return (
    <div className="about">
      <Navbar />
      {/* Header Banner */}
      <div className="header py-4">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-6 content d-none d-lg-block">
              <h1>
                Book<span>Doctor</span>
              </h1>
            </div>
            <div className="col-12 col-lg-6 image-column text-center d-none d-lg-block">
              <img src={Images.About} alt="..." />
            </div>
            <div className="col-12 col-lg-6 content d-lg-none text-center">
              <h1>
                About <span>Doctor</span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p>
                <span>Book Doctor</span> has been a popular doc booking app that
                offers online video consultation, booking doctor’s appointments
                after choosing the specialist needed, getting digital
                prescriptions, etc. It provides all information about doctors
                such as experience, qualification, consulting fees, timings,
                etc. It is ideal for those who look for specialized doctors for
                different ailments.
              </p>
              <p>
                As a patient-focused, flexible app, it offers free service to
                doctors and patients, alike. Patients can ask any type of
                health-related query and get expert answers from the doctors. It
                is easy to connect with the best of doctors in a short while. It
                is completely safe and secure as far as consultation goes. You
                can even have a free doctor chat with a follow-up.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
