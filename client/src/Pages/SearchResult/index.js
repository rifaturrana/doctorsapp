import NavbarComponent from "../.././Components/User/Navbar/Navbar";
import SearchComponent from "../.././Components/User/Search/Search";
import DoctorsListComponent from "../.././Components/User/DoctorsList/index";
import FooterCompoent from "../../Components/User/Footer/Footer";
import { useLocation } from "react-router-dom";

const Index = ({ doctors }) => {
  const location = useLocation();
  console.log(location.search.slice(12));

  const searched = doctors.filter((el) => {
    return el.specialist === location.search.slice(12);
  });
  console.log(searched);
  return (
    <div>
      <div className="pt-10">
        <NavbarComponent />
      </div>
      <br />
      <br />
      <br />
      <br />
      <div className="search-result-index ">
        <div className="container">
          <div className="row">
            <div className="col-12 m-10 py-1 pt-10">
              <SearchComponent />
            </div>
            <div className="col-12 py-4 py-lg-5 text-center">
              <h3 className="font-weight-bold mb-0">
                Found {searched ? searched.length : null} doctors.
              </h3>
            </div>
          </div>
        </div>

        {/* Results */}
        <DoctorsListComponent doctors={searched} />
      </div>
      <br />
      <br />
      <br />
      <br />
      <FooterCompoent />
    </div>
  );
};

export default Index;
