import React from "react";
import Footer from "../../Components/User/Footer/Footer";
import Navbar from "../../Components/User/Navbar/Navbar";
// import "./Contact.scss";

const Contact = () => {
  return (
    <div className="contact">
      <Navbar />

      <div className="map-content">
        <div className="container">
          <div className="row">
            <div
              className="col-12 text-center mb-5"
              style={{ marginTop: "100px" }}
            >
              <h1>Find Us on Google Maps</h1>
              <hr />
            </div>

            <div className="col-12 map-column">
              <iframe
                title="Our locatin find in google map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3687.1248196520914!2d91.96887051475842!3d22.461943285239826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30ad2fca34ae5549%3A0x35c88a37b3e90e97!2sChittagong%20University%20of%20Engineering%20and%20Technology!5e0!3m2!1sen!2sbd!4v1654106264812!5m2!1sen!2sbd"
                width="100%"
                height="450"
                frameBorder="0"
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
