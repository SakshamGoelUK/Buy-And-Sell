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
  "CREATE TABLE Temporary(EmailID VARCHAR(255) NOT NULL,Temp VARCHAR(255) NOT NULL,Time VARCHAR(255),PRIMARY KEY (EmailID),FOREIGN KEY(EmailID) REFERENCES Users(username))";
connection.query(sql1, async(err, result) => {
  if (err) throw err;
  console.log(result);
  const sql2 = await connection.promise().query('SET GLOBAL event_scheduler = ON;')
    const sql3 = await connection.promise().query('CREATE EVENT IF NOT EXISTS auto_delete ON SCHEDULE EVERY 1 HOUR STARTS CURRENT_TIMESTAMP DO DELETE FROM `temporary` WHERE `Time`<=CURRENT_TIMESTAMP()-15*60000')
});
