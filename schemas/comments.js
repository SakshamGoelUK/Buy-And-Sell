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
  try {
    const sql1 = await connection
      .promise()
      .query(
        "CREATE TABLE Comments(Username VARCHAR(255) NOT NULL,ProductId VARCHAR(255) NOT NULL,Text LONGTEXT NOT NULL,Rating INT ,FOREIGN KEY (Username) REFERENCES Users(username))"
      );
  } catch (e) {
    console.log(e);
  }
};
table();
