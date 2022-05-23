const passport = require('passport');
const mysql = require('mysql2');
const connect = require('./schemas/database');
const connection = mysql.createConnection(connect);

connection.connect((err) => {
  if (err) {
    throw err;
  }
});
const GoogleStrategy = require('passport-google-oauth2').Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '141421753362-2ft3pnf9ltc7joqrp6sq59m5ksori232.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/user/auth/google/callback',
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const user = await connection
          .promise()
          .query('SELECT * FROM users WHERE `username` = ?', [profile.email]);
        global.currentUser = user[0][0].FirstName;
        global.userstatus = user[0][0].status;
        global.emailstatus = true;
        if (user[0] == 0) {
          throw 'error';
        }
        return done(null, profile, { message: 'Welcome Back' });
      } catch (e) {
        return done(null, null, {
          message: 'Make sure that you are registered with us!!!',
        });
      }
    }
  )
);
