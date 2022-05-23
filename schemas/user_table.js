const mysql = require("mysql2");
const db = require("./database");
const connection = mysql.createConnection(db);
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected...");
});
const sql1 =
  "CREATE TABLE Users(FirstName varchar(255) NOT NULL,LastName varchar(255) NOT NULL,Age varchar(10) NOT NULL,username varchar(255) NOT NULL,email varchar(255),password varchar(255) NOT NULL,phone varchar(50) NOT NULL,Country varchar(60) NOT NULL,State varchar(255) NOT NULL,City varchar(255),status VARCHAR(100),rating VARCHAR(200),reviewsNo INT,bio VARCHAR(300),Image VARCHAR(255) ,PRIMARY KEY (username))";
connection.query(sql1, (err, result) => {
  if (err) throw err;
  console.log(result);
});
