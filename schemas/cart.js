const mysql = require("mysql2");
const db = require("./database");
const connection = mysql.createConnection(db);
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected...");
});
const createCart = async () => {
  try {
    const sql1 = await connection
      .promise()
      .query(
        "CREATE TABLE Cart(EmailId VARCHAR(255) NOT NULL,ProductID VARCHAR(255) NOT NULL,Time VARCHAR(255) NOT NULL)"
      );
  } catch (error) {
    console.log(error);
  }
};
createCart();
