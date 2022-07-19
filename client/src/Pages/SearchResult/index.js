import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiURL } from "../.././utils/apiURL";

import NavbarComponent from "../.././Components/User/Navbar/Navbar";
import SearchComponent from "../.././Components/User/Search/Search";
import DoctorsListComponent from "../.././Components/User/DoctorsList/index";
import FooterCompoent from "../../Components/User/Footer/Footer";
import { search } from "react-icons-kit/icomoon";

const Index = () => {
  // const [doctors, setDoctors] = useState([]);

  // useEffect(() => {
  //   //search doctors
  //   const searchDoctors = async () => {
  //     try {
  //       const response = await axios.get(
  //         `https://jsonplaceholder.typicode.com/users`
  //       );
  //       setDoctors(response.data);
  //     } catch (error) {
  //       if (error) console.log(console.response);
  //     }
  //   };
  //   searchDoctors();
  // }, []);
  // console.log(searched);
  return (
    <div>
      <NavbarComponent />

      <div className="search-result-index">
        <div className="container">
          <div className="row">
            <div className="col-12 py-4">
              <SearchComponent />
            </div>
            <div className="col-12 py-4 py-lg-5 text-center">
              <h3 className="font-weight-bold mb-0">
                {/* // Found {doctors ? doctors.length : null} doctors. */}
              </h3>
            </div>
          </div>
        </div>

        {/* Results */}
        {/* <DoctorsListComponent doctors={doctors} /> */}
      </div>
      <FooterCompoent />
    </div>
  );
};

export default Index;
