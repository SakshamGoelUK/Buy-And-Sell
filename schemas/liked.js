const mysql = require("mysql2");
const db = require("./database");
const connection = mysql.createConnection(db);
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected...");
});
const table = async () => {
  const sql1 = await connection
    .promise()
    .query(
      "CREATE TABLE Liked(Username VARCHAR(255),ProductID VARCHAR(255),PRIMARY KEY (Username,ProductID))"
    );
};
table();
