import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/User/Navbar/Navbar";
import { Images } from "../../utils/Images";
import Search from "../../Components/User/Search/Search";
import Footer from "../../Components/User/Footer/Footer";
import DoctorListComponent from "../.././Components/User/DoctorsList/index";
import "./Home.scss";
import Content from "./Content/Content";
import { useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../utils/apiURL";
const Home = () => {
  const [doctor, setDoctor] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get(`${apiURL}/client/doctors`);
      console.log(response);
      setDoctor(response.data.doctors);
      setLoading(false);
    } catch (error) {
      if (error) console.log(console.response);
    }
  };
  useEffect(() => {
    fetchDoctors();
  }, []);
  console.log(doctor);
  return (
    <>
      <Navbar />
      <div className="home">
        <div className="header py-4">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-6 content d-none d-lg-block">
                <h1>Search Doctors</h1>
                <h5>Choose your nearest specialist</h5>
              </div>
              <div className="col-12 col-lg-6 image-column text-center">
                <img src={Images.PeopleSearch} alt="..." />
              </div>
            </div>
          </div>
        </div>
        <Search />
        <DoctorListComponent doctors={doctor} loading={isLoading} />

        {/* service  */}
        <div className="service">
          <div className="container">
            <div className="row">
              <div className="col-12 col-lg-6 text-center text-lg-left content">
                <h1>We Provide</h1>
                <h3>24/7 hour Service</h3>
                {/* <p>Lorem ipsum</p>
                <Link to="/contact" type="button" className="btn shadow-none">
                  Contact Us
                </Link> */}
              </div>
              <div className="col-12 col-lg-6 text-center text-lg-left mt-4 mt-lg-0">
                <img src={Images.Service} className="" alt="..." />
              </div>
            </div>
          </div>
        </div>
        <Content />
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default Home;
