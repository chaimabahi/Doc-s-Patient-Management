import React, { useState } from "react";
import "./patients.css";

const Patients = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPatients = props.patients.filter((patient) => {
    return (
      patient.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.Date_Of_Birth.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.Phone.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
  });

  return (
    <form id="form">
      <div id="search">
        <input
          type="text"
          placeholder="Search patients..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <table id="example" className="table table-striped table-bordered" width="100%">
        <thead>
          <tr>
            <th className="head">Name</th>
            <th className="head">Email</th>
            <th className="head">Address</th>
            <th className="head">Date of birth</th>
            <th className="head">Phone Number</th>
            <th className="head">Gender</th>
            <th className="head">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient, i) => (
            <tr key={i}>
              <td>{patient.Name}</td>
              <td>{patient.Email}</td>
              <td>{patient.Address}</td>
              <td>{patient.Date_Of_Birth}</td>
              <td>{patient.Phone}</td>
              <td>{patient.Gender}</td>
              <td>
                <input
                  type="button"
                  value="Update"
                  onClick={() => { props.callback3(patient, "OnePatient"); }}
                />
                &nbsp;&nbsp;&nbsp;
                <input
                  type="button"
                  value="Delete"
                  onClick={() => { props.callback(patient.ID); }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </form>
  );
};

export default Patients;
