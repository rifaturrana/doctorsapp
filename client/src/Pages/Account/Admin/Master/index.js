import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../../../utils/apiURL";
import "./style.scss";
import { Switch, Route } from "react-router-dom";
import Navbar from "../../../../Components/Admin/Navbar/index";

// import Layout from "../../../../components/Admin/Layout";
import Dashboard from "../Dashboard";
import DoctorIndex from "../Doctor";
import DoctorShow from "../Doctor/Show";
import AdminIndex from "../Admins/index";
import AdminCreate from "../Admins/Create";
import FourOFour from "../../../FourOFour/index";

const Index = () => {
  return (
    <div className="admin-master">
      <Navbar />
      {/* <Layout /> */}
      <div className="main">
        <Switch>
          <Route exact path="/admin" component={Dashboard} />

          <Route exact path="/admin/doctor" component={DoctorIndex} />
          <Route exact path="/admin/doctor/:id/show" component={DoctorShow} />

          <Route exact path="/admin/admin-list" component={AdminIndex} />
          <Route exact path="/admin/create-admin" component={AdminCreate} />
          <Route path="*" component={FourOFour} />
        </Switch>
      </div>
    </div>
  );
};

export default Index;
