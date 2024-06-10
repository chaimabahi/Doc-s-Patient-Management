import React,{useEffect,useState} from "react";

import axios from "axios" ;
import Patients from "./components/patients/patients";
import "./App.css"
import AddPatients from "./components/add/AddPatients";
import OnePatient from "./components/onePatient/onePatient";



function App() {
  const [patients,setPatients] = useState([])
  const [view,setView]=useState("allPatients")
  const [patient,SetPatient]=useState({})
  
  useEffect(()=>{
    axios.get("http://localhost:5000/api/patients")
    .then(res => {
      console.log(res.data)
      setPatients(res.data)

    }) 
    .catch((err)=>{
      console.log(err);
    })
  },[])


  function changeView(patient,view){
    setView(view)
    SetPatient(patient)
  }

  function renderView(){
    if (view==="allPatients"){
      return <Patients patients={patients} callback={deletePatient} callback3={changeView}/>
    }
    else if (view==="AddPatient"){
      return <AddPatients/>
    }
    else return <OnePatient patient={patient} callback={changeView}/>

}
function deletePatient(id){
  if (window.confirm("Are you sure you want to delete this patient ?")) {
    axios.delete(`http://localhost:5000/api/patients/${id}`)
      .then(result => {
        console.log(result);
        window.location.reload();
      })
      .catch(error => {
        console.error("There was an error deleting the patient!", error);
      });
  }
}


return (
  <div>
    
    <nav className ="nav">
          <div id='div2'>
                <div onClick={() =>changeView(null,"allPatients")}            >
                  <h3>Patients</h3> 
                </div>
          </div>
          

          <div id='div1' > 
                <div onClick={() =>  changeView(null, "AddPatient") }>
                    <h3>Add a new patient</h3>
                </div>
          </div>

    </nav>
    <h1 id="title">Doctor's Patient Management</h1>
      {renderView()}

  </div>


);
}

export default App;
