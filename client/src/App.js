import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Auth/Register/Register";
import Login from "./Pages/Auth/Login/Login";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Master from "./Pages/Account/Doctor/Master/Master";
import PatientAccountMaster from "./Pages/Account/Patient/Master/PatientAccountMaster";
import SearchResultIndex from "./Pages/SearchResult/index";
import FourOFour from "./Pages/FourOFour/index";
import PrivateRoute from "./Components/PrivateRoute/index";
import { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "./utils/apiURL";
function App() {
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
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/about" component={About} />
        {/* <Route exact path="/search" component={SearchResultIndex} /> */}
        <Route exact path="/search">
          <SearchResultIndex doctors={doctor} />
        </Route>

        <Route exact path="/contact" component={Contact} />
        <PrivateRoute path="/doctor" role="doctor">
          <Master />
        </PrivateRoute>

        {/* Patient Master */}
        <PrivateRoute path="/patient" role="patient">
          <PatientAccountMaster />
        </PrivateRoute>
        <Route path="*" component={FourOFour} />
      </Switch>
    </Router>
  );
}

export default App;
