import React, { useState, useEffect } from "react";
import "./style.scss";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { apiURL } from "../../../../utils/apiURL";
const Index = () => {
  const [appointments, setappointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patient, setpatient] = useState([]);
  useEffect(() => {
    // Fetch doctors
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(`${apiURL}/admin/appointments`);
        if (response.status === 200) {
          setappointments(response.data.totalAppointments);
        }
      } catch (error) {
        if (error) console.log(error.response);
      }
    };
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`${apiURL}/admin/doctor`);
        if (response.status === 200) {
          setDoctors(response.data.doctors);
        }
      } catch (error) {
        if (error) console.log(error.response);
      }
    };
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`${apiURL}/admin/patients`);
        if (response.status === 200) {
          setpatient(response.data.totalPatients);
        }
      } catch (error) {
        if (error) console.log(error.response);
      }
    };

    fetchDoctor();
    fetchPatient();

    fetchAppointments();
  }, []);
  console.log(appointments);
  const [year] = useState(new Date().getFullYear());
  const [data] = useState({
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Patient graph",
        fill: true,
        lineTension: 0.1,
        backgroundColor: "#fec200",
        borderColor: "#fec200",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#fec200",
        pointHoverBorderColor: "#fec200",
        pointHoverBorderWidth: 0,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [10, 30, 20],
      },
    ],
  });

  return (
    <div className="dashboard">
      <div className="container-fluid pl-lg-0 py-3 py-lg-0">
        <div className="row">
          <div className="col-12 col-lg-6 mb-3">
            <div className="card border-0">
              <div className="card-body">
                <Bar
                  data={data}
                  width={800}
                  height={400}
                  options={{
                    maintainAspectRatio: false,
                    title: {
                      display: true,
                      text: "Patient in " + year,
                      fontSize: 20,
                    },
                    legend: {
                      display: true,
                      position: "bottom",
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-6">
            <div className="row">
              <div className="col-12 mb-3 pl-lg-0 pr-0">
                <div className="card border-0" style={{ height: 150 }}>
                  <div className="card-body">
                    <div className="flex-center flex-column text-center">
                      <h5 className="mb-0">{appointments.length}</h5>
                      <h6 className="mb-0">Total Appointments</h6>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="col-6 mb-3">
                <div className="card border-0" style={{ height: 150 }}>
                  <div className="card-body">
                    <div className="flex-center flex-column text-center">
                      <h5 className="mb-0">120</h5>
                      <h6 className="mb-0">Today Appointments</h6>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="row">
              <div className="col-6 mb-3 pl-lg-0 pr-0">
                <div className="card border-0" style={{ height: 150 }}>
                  <div className="flex-center flex-column text-center">
                    <h5 className="mb-0">{doctors.length}</h5>
                    <h6 className="mb-0">Total Doctors</h6>
                  </div>
                </div>
              </div>
              <div className="col-6 mb-3">
                <div className="card border-0" style={{ height: 150 }}>
                  <div className="card-body">
                    <div className="flex-center flex-column text-center">
                      <h5 className="mb-0">{patient.length}</h5>
                      <h6 className="mb-0">Total Patient</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
