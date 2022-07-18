import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "../../../../utils/apiURL";
import { Images } from "../../../../utils/Images";
import { ic_dehaze } from "react-icons-kit/md";
import Icon from "react-icons-kit";
import SideMenu from "../../../../Components/Patient/SideMenu/SideMenu";
import { Switch, Route } from "react-router-dom";
import Profile from "../Profile/Profile";

const Master = () => {
  const [user, setUser] = useState({});
  const [id] = localStorage.getItem("id");
  const [isLoading, setLoading] = useState(true);
  const [header] = useState({
    headers: { Authorization: "Bearer " + localStorage.getItem("token") },
  });

  useEffect(() => {
    const loggedUser = async () => {
      try {
        const response = await axios.get(`${apiURL}/patient/me`, header);
        console.log(response.data);
        if (response.status === 200) {
          setUser(response.data.patient);
          setLoading(false);
          localStorage.setItem(
            "patient",
            JSON.stringify(response.data.patient)
          );
        }
      } catch (error) {
        if (error) {
          console.log(error);
        }
      }
    };
    loggedUser();
  }, [id, header]);
  console.log(user);
  if (isLoading) {
    return (
      <div className="loader">
        <div className="flex-center flex-column">
          <img src={Images.Loading} className="img-fluid" alt="..." />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        <div className="d-flex">
          <p>{user.name ? user.name : user.email}</p>
          <Icon icon={ic_dehaze} size={25} />
        </div>
        <SideMenu user={user} />
      </div>

      <div className="main flex-fill">
        <Switch>
          <Route exact path="/patient/profile">
            <Profile user={user} />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Master;
