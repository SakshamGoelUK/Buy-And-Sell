const localStrategy = require("passport-local");
const passport = require("passport");
const connection = require("./schemas/database");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const db = mysql.createConnection(connection);
db.connect((err) => {
  if (err) {
    throw err;
  }

});

passport.use(
  new localStrategy(async (username, password, done) => {
    try {
      const result = await db
        .promise()
        .query("SELECT * FROM USERS WHERE `USERNAME` = ?", [username]);
      if (result[0].length === 0) {
        done(null, false, { message: "Incorrect email or password" });
      } else {
        try {
          const result1 = await bcrypt.compare(password, result[0][0].password);
          if (result1) {
            global.userstatus = result[0][0].status;
            global.emailstatus = true;
            done(null, result[0][0], { message: "Welcome Back" });
          } else {
            done(null, false, { message: "Incorrect email or password" });
          }
        } catch (e) {

        }
      }
    } catch (err) {
      done(err, false);
    }
  })
);
