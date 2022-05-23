const mysql = require("mysql2");
const db = require("./database");
const connection = mysql.createConnection(db);
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected...");
});
const productTable = async () => {
  try {
    const sql1 = await connection
      .promise()
      .query(
        "CREATE TABLE Products(productID varchar(255) NOT NULL,Name varchar(255) NOT NULL,Category varchar(255) NOT NULL,Type ENUM('New','Old') NOT NULL,Price VARCHAR(255) NOT NULL,Stock VARCHAR(255) NOT NULL,Description LONGTEXT NOT NULL,Seller varchar(255) NOT NULL,UploadTime VARCHAR(255) NOT NULL,Location varchar(255) NOT NULL,Likes INT,advertize VARCHAR(5) NOT NULL,PRIMARY KEY (productID),FOREIGN KEY (Seller) REFERENCES Users(username))"
      );
    try {
      const sql2 = await connection
        .promise()
        .query(
          "CREATE TABLE Images(publicId varchar(255) NOT NULL PRIMARY KEY,Product VARCHAR(255) NOT NULL,DeleteId VARCHAR(255) NOT NULL,FOREIGN KEY(Product) REFERENCES Products(productID))"
        );
    } catch (e) {
      console.log(e);
    }
  } catch (e) {
    console.log(e);
  }
};
productTable();
