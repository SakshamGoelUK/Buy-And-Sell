const mysql = require("mysql2");
const db = require("./database");
const connection = mysql.createConnection(db);
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected...");
});
const data = async()=>{
    const sql1 = connection.promise().query('CREATE TABLE `access`( `Selleremail` VARCHAR(255) NOT NULL ,`userEmail` VARCHAR(255) NOT NULL)')
}
data()