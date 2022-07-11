import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Register from "./Pages/Auth/Register/Register";
import Login from "./Pages/Auth/Login/Login";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";
import Master from "./Pages/Account/Doctor/Master/Master";
import PatientAccountMaster from "./Pages/Account/Patient/Master/PatientAccountMaster";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/about" component={About} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/doctor" component={Master} />
        <Route exact path="/patient" component={PatientAccountMaster} />
      </Switch>
    </Router>
  );
}

export default App;
