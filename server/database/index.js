const mysql=require('mysql2');

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'admin',
    database:'patients'
    }); 
    connection.connect(function(err){
        if(err) {
            console.log(err);
        }
        else{
            console.log(' database connected');
        }
})
module.exports=connection;