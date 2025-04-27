import React, { useEffect, useState } from "react";
import testLogo from "./assets/TestLogo.svg";
import layer from "./assets/Layer 2@2x.png";
import respiratory from "./assets/respiratory rate.svg";
import heart from "./assets/HeartBPM.svg";
import temperature from "./assets/temperature.svg";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import "./App.css";

//Typescript types defination
interface BloodPressure {
  systolic: {
    value: number;
    levels: number;
  };

  diastolic: {
    value: number;
    levels: number;
  };
}

interface Vitals {
  value: number;
  levels: string;
}

interface History {
  month: number;
  year: number;
  blood_pressure: BloodPressure;
  heart_rate: Vitals;
  respiratory_rate: Vitals;
  temperature: Vitals;
}

interface Diagnostic_lis {
  name: string;
  description: string;
  status: string;
}

interface Patience {
  name: string;
  gender: string;
  age: number;
  profile_picture: string;
  date_of_birth: number;
  phone_number: number;
  emergency_contact: number;
  insurance_type: string;
  diagnosis_history: History[];
  diagnostic_list: Diagnostic_lis[];
  lab_results: string[];
}

const App: React.FC = () => {
  const [data, setData] = useState<Patience | null>(null);

  //credentials
  const username = "coalition";
  const password = "skills-test";

  //encode to base64
  const token = btoa(`${username}:${password}`);

  const url = "https://fedskillstest.coalitiontechnologies.workers.dev";

  const headers = {
    Authorization: `Basic ${token}`,
    "Content-Type": "application/json",
  };

  // Automatically fetch data on page loaded
  useEffect(() => {
    const handeFecth = async () => {
      try {
        const response = await axios.get<Patience[]>(url, { headers });
        const diagnosisName = response.data[0];
        setData(diagnosisName);
      } catch (err) {
        console.error("Failed to fetch", err);
      }
    };
    handeFecth();
  }, []);
  console.log(data);

  // Chart details
  const chart = [
    {
      month: data?.diagnosis_history[0].month,
      Systolic: data?.diagnosis_history[0].blood_pressure.systolic.value,
      Diastolic: data?.diagnosis_history[0].blood_pressure.diastolic.value,
    },
  ];

  return (
    <>
      {/* Overall background color defination */}
      <div className="overall-bg">
        <div className="bg-color">
          {/* Navbar section */}
          <nav>
            <div>
              <img src={testLogo} alt="testLogo" className="logo-emoji" />
            </div>
            <div>
              <div className="flex-overview">
                <p>
                  <i className="bi bi-house"></i> Overview
                </p>
                <p className="patience">
                  <i className="bi bi-people"></i> Patience
                </p>
                <p className="schedule">
                  <i className="bi bi-calendar"></i> Schedule
                </p>
                <p className="message">
                  <i className="bi bi-chat-left"></i> Message
                </p>
                <p className="transaction">
                  <i className="bi bi-calendar4"></i>Transaction
                </p>
              </div>
            </div>
            <div className="doctor">
              <img className="doc-image1" src={layer} alt="doctor" />
              <div className="gear">
                <h5>Dr. Jose simmons</h5>
                <p>General practitional</p>
              </div>
              <p className="gea">
                <i className="bi bi-gear-fill"></i>
              </p>
              <p className="gea">
                <i className="bi bi-three-dots"></i>
              </p>
            </div>
            {/* <div className="menubar">
              <span></span>
              <span></span>
              <span></span>
            </div> */}
          </nav>

          {/* Rendered of API data section */}
          {data ? (
            <div className="flex-section">
              {/* First  section of the page grid with Patience name*/}
              <section>
                <div className="flexall">
                  <h3>Patience</h3>
                  <i className="bi bi-search search"></i>
                </div>
                <div className="flexall">
                  <div className="doctor">
                    <img
                      className="doc-image"
                      src={data.profile_picture}
                      alt="doctor"
                    />
                    <div>
                      <h6>{data.name}</h6>
                      <p>
                        {data.gender}, {data.age}
                      </p>
                    </div>
                  </div>
                  <i className="bi bi-three-dots-vertical"></i>
                </div>
              </section>

              {/* Second section of the page grid with diagnosis history */}
              <section className="section2">
                <section>
                  <h3 className="middle-section">Diagnosis History</h3>
                  <div className="graph-section">
                    <div>
                      <h4>Blood Pressure</h4>
                      <div className="graph">
                        <ResponsiveContainer>
                          <LineChart data={chart}>
                            <CartesianGrid strokeDasharray={"3 3"} />
                            <XAxis dataKey={"month"} />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                              type={"monotone"}
                              dataKey={"Systolic"}
                              stroke="#e66fd2"
                              name="Systolic"
                            />
                            <Line
                              type={"monotone"}
                              dataKey={"Diastolic"}
                              stroke="#8c6fe6"
                              name="Diastolic"
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    <div>
                      <div className="grid-systolic">
                        <div className="systolic">
                          <span></span>
                        </div>
                        <h5>Systolic</h5>
                      </div>
                      <h5 className="padding10">
                        {
                          data.diagnosis_history[0].blood_pressure.systolic
                            .value
                        }
                      </h5>
                      <p className="padding10">
                        {
                          data.diagnosis_history[0].blood_pressure.systolic
                            .levels
                        }
                      </p>
                      <hr />

                      <div className="grid-systolic">
                        <div className="diastolic">
                          <span></span>
                        </div>
                        <h5>Diastolic</h5>
                      </div>
                      <h5 className="padding10">
                        {
                          data.diagnosis_history[0].blood_pressure.diastolic
                            .value
                        }
                      </h5>
                      <p className="padding10">
                        {
                          data.diagnosis_history[0].blood_pressure.diastolic
                            .levels
                        }
                      </p>
                    </div>
                  </div>
                  <div className="grid-resporatory">
                    <div className="respiratory">
                      <img
                        src={respiratory}
                        className="resImageSize"
                        alt="respiratory"
                      />
                      <h5>Respiratory Rate</h5>
                      <h6 className="respiratoryFont">
                        {data.diagnosis_history[0].respiratory_rate.value} bpm
                      </h6>
                      <p>{data.diagnosis_history[0].respiratory_rate.levels}</p>
                    </div>
                    <div className="temprature">
                      <img
                        src={temperature}
                        className="resImageSize"
                        alt="respiratory"
                      />
                      <h5>Temperature</h5>
                      <h6 className="respiratoryFont">
                        {data.diagnosis_history[0].temperature.value} bpm
                      </h6>
                      <p>{data.diagnosis_history[0].temperature.levels}</p>
                    </div>
                    <div className="heart-rate">
                      <img
                        src={heart}
                        className="resImageSize"
                        alt="respiratory"
                      />
                      <h5>Hearth Rate</h5>
                      <h6 className="respiratoryFont">
                        {data.diagnosis_history[0].heart_rate.value} bpm
                      </h6>
                      <p>{data.diagnosis_history[0].heart_rate.levels}</p>
                    </div>
                  </div>
                </section>

                <section className="middle-section">
                  <h4 className="middle-section">Dignostic List</h4>
                  <table>
                    <thead>
                    <tr>
                      <th className="padding10">Problem/Diagnosis</th>
                      <th className="padding10">Description</th>
                      <th className="padding10">Status</th>
                    </tr>
                    </thead>
                    <tbody>
                      {data.diagnostic_list.map((list, index) => (
                        <tr key={index}>
                          <td className="padding10">{list.name}</td>
                          <td className="padding10">{list.description}</td>
                          <td className="padding10">{list.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </section>

              {/* third section of the page with details of the desease type */}
              <section className="section2">
                <section>
                  <div className="jessica-section">
                    <img src={data.profile_picture} alt="taylor image" />
                    <h2>{data.name}</h2>
                  </div>
                  <div className="grid-jesica">
                    <i className="bi bi-calendar space-top"></i>
                    <div className="space-top">
                      <h5>Date Of Birth</h5>
                      <p>{data.date_of_birth}</p>
                    </div>

                    <i className="bi bi-gender-female space-top"></i>
                    <div className="space-top">
                      <h5>Gender</h5>
                      <p>{data.gender}</p>
                    </div>

                    <i className="bi bi-telephone space-top"></i>
                    <div className="space-top">
                      <h5>Contact Info</h5>
                      <p>{data.phone_number}</p>
                    </div>

                    <i className="bi bi-telephone space-top"></i>
                    <div className="space-top">
                      <h5>Emergency Contact</h5>
                      <p>{data.emergency_contact}</p>
                    </div>

                    <i className="bi bi-shield-lock space-top"></i>
                    <div className="space-top">
                      <h5>Insurance Provider</h5>
                      <p>{data.insurance_type}</p>
                    </div>
                  </div>

                  <p className="patience info-pad">Show All Information</p>
                </section>

                <section className="lab">
                  <h4 className="middle-section">Lab Results</h4>

                  {data.lab_results.map((lab) => (
                    <table className="table2-grid left-aling">
                      <p className="padding10">{lab}</p>
                      <i className="bi bi-download padding10"></i>
                    </table>
                  ))}
                </section>
              </section>
            </div>
          ) : (
            // this will be display when the data is still fetching
            <p>Loading Data...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default App;
