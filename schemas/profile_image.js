const mysql = require("mysql2");
const db = require("./database");
const connection = mysql.createConnection(db);
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected...");
});
const profileImageSchema = async () => {
  try {
    const sql1 = await connection
      .promise()
      .query(
        "CREATE TABLE profileImage(Username VARCHAR(255),Image VARCHAR(255) NOT NULL,PRIMARY KEY(Username))"
      );
  } catch (e) {
    console.log(e);
  }
};
profileImageSchema();
