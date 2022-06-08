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
                About<span>Doctor</span>
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
              <h3>Doctor</h3>
              <p>this is doctor app</p>
              <p>this is dummy app</p>
              <p>Work in progress</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
