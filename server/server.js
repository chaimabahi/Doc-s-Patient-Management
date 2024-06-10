const express = require("express");
const app = express();
const PORT = 5000
const cors=require('cors');
const db=require('./database/index.js')


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/../client/dist"));

app.get('/api/patients',(req,res)=>{
    const sql= `SELECT * FROM patients`
    db.query(sql,(err,result)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.json(result);
        }
    })
})
app.get('/api/patients/:id',(req,res)=>{
    const id= req.params.id
    const sql= `SELECT * FROM patients WHERE id=${id}`
    db.query(sql,(err,result)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.json(result);
        }
})
})

app.post('/api/patients',(req,res)=>{
    const newPatient=req.body
    const sql=`INSERT INTO patients SET Name="${newPatient.Name}", Date_Of_Birth="${newPatient.Date_Of_Birth}", Gender="${newPatient.Gender}", email="${newPatient.Email}",Phone="${newPatient.Phone}", Address="${newPatient.Address}"`
    db.query(sql,function(err,rslt){
      if (err) res.status(500).send(err)
      else res.json(rslt)
    })
  })

app.delete('/api/patients/:id',(req,res)=>{
    const id= req.params.id
    const sql= `delete FROM patients WHERE id=${id}`
    db.query(sql,(err,result)=>{
        if(err){
            res.status(500).send(err)
        }
        else{
            res.json(result);
        }
})
})

app.put('/api/patients/:id', (req, res) => {
    const id = req.params.id;
    const patient = req.body;
    const sql = `UPDATE patients SET Name = ?, Date_Of_Birth = ?, Gender = ?, email = ?, Phone = ?, Address = ? WHERE ID = ?`;
    const values = [patient.Name, patient.Date_Of_Birth, patient.Gender, patient.Email, patient.Phone, patient.Address, id];
    
    db.query(sql, values, function(err, rslt) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(rslt);
      }
    });
  });















app.listen(PORT, function () {
  console.log("listening on port 5000!");
});