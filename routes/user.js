if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const passport = require('passport');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const connect = require('../schemas/database');
const connection = mysql.createConnection(connect);
const nodemailer = require('nodemailer');
const randomString = require('random-string');
const { isLoggedIn, userID } = require('../functions');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const { sessionConfig } = require('../config');
const ejs = require('ejs');
const session = require('express-session')(sessionConfig);
const sharedSession = require('express-socket.io-session');
const base64url = require('base64url');
const e = require('connect-flash');

app.set('trust proxy', 1);
cloudinary.config({
  cloud_name: 'dsxjfrucv',
  api_key: '529392691953429',
  api_secret: 'R6YwzYF0l8HLzXW9LdtLuF_I6F8',
  secure: true,
});
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected...');
});
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Buy-And-Sell',
    format: async (req, file) => 'png', // supports promises as well
    public_id: (req, file) => 'computed-filename-using-request',
  },
});
const upload = multer({ storage });
global.userstatus = '';
global.emailstatus = '';
let timer = 60;
const name = () => {
  const name12 = setInterval(() => {
    if (timer > 0) {
      timer -= 1;
    } else if (timer == 0) {
      timer = 60;
      global.emailstatus = true;
      clearInterval(name12);
    }
  }, 1000);
};
const cartItems = async (req) => {
  let cartProducts = [];
  if (req.user) {
    const { user } = userID(req);
    try {
      const cartData = await connection
        .promise()
        .query('SELECT * FROM cart WHERE EmailID=?', [user]);

      let id = cartData[0].map((product) => product.ProductID);
      id = id.toString();
      id = id.replaceAll(',', "','");
      try {
        cartProducts = await connection
          .promise()
          .query(
            `SELECT productID,Name,Price,Stock FROM products WHERE productID IN ('${id}')`
          );

        req.session.product = null;
      } catch (e) {

      }
    } catch (error) {

    }
  } else {
    if (req.session.product) {
      try {
        let id = req.session.product.toString();
        id = id.replaceAll(',', "','");

        cartProducts = await connection
          .promise()
          .query(
            `SELECT productID,Name,Price,Stock FROM products WHERE productID IN ('${id}')`
          );
      } catch (e) {

      }
    }
  }
  if (cartProducts.length != 0) {
    for (let i = 0; i < cartProducts[0].length; i++) {
      try {
        let sql1 = await connection
          .promise()
          .query(
            `SELECT publicId FROM images WHERE Product='${cartProducts[0][i].productID}'`
          );
        if (sql1[0].length !== 0) {
          cartProducts[0][i].cartUrl = sql1[0][0].publicId;
        } else {
          cartProducts[0][i].cartUrl =
            'https://res.cloudinary.com/dsxjfrucv/image/upload/v1643924761/default_ai4d4q.png?pgw=1';
        }
      } catch (e) {

      }
    }
    return cartProducts[0];
  } else {
    return [];
  }
};
router.get('/changes', async (req, res) => {
  const homeSearch = 'false'
  const cartProducts = await cartItems(req);
  if (req.user) {
    res.render('password_change.ejs', { req, cartProducts, homeSearch });
  } else {
    req.flash('error', 'Access Denied');
    res.redirect('/user/login');
  }
});
router.put('/changes', async (req, res) => {
  let { user } = userID(req);
  try {
    const sql1 = await connection
      .promise()
      .query('SELECT * FROM `users` WHERE `email`=?', [user]);
    const current = await bcrypt.compare(req.body.current, sql1[0][0].password);
    if (current) {
      if (req.body.new === req.body.confirmed) {
        try {
          const hashedPassword = await bcrypt.hash(req.body.new, 10);
          const sql2 = await connection
            .promise()
            .query('UPDATE users SET `password`=? WHERE `username`=?', [
              hashedPassword,
              user,
            ]);
          req.flash(
            'success',
            'Password Changed.Login with new password now👌'
          );
          req.logout();
          res.redirect('/products/allItems/filters/All');
        } catch (e) {

        }
      } else {
        req.flash('error', "Passwords don't match");
        res.redirect('/user/changes');
      }
    } else {
      req.flash('error', 'Incorrect current Password!');
      res.redirect('/user/changes');
    }
  } catch (e) {
    req.flash('error', 'Something went wrong');
    res.redirect('/products/allItems/filters/All');
  }
});
router.get('/verify', async (req, res) => {
  const homeSearch = 'false'
  if (req.user) {
    if (global.userstatus != 'Active') {
      if (global.emailstatus === true) {
        global.emailstatus = false;

        name();
        let { user, user_name } = userID(req);
        const result1 = await connection
          .promise()
          .query(`SELECT * FROM USERS WHERE USERNAME = '${user}'`);

        let code = result1[0][0].status;
        const transporter = nodemailer.createTransport({
          // service: process.env.SERVICE,
          host: 'smtp.gmail.com',
          port: 587,
          ignoreTLS: false,
          secure: false,
          auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD,
          },
        });

        try {
          const data = await ejs.renderFile(__dirname + '/email.ejs', {
            code: code,
            user_name: user,
          });
          const mailOptions = {
            from: process.env.USER,
            to: user,
            subject: 'Welcome to Buy&Sell',
            html: data,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {

            } else {
            }
          });
        } catch (err) {

        }
      }
      res.render('verify.ejs', { timer, emailstatus, homeSearch });
    } else {
      req.flash('success', 'You are already verified');
      res.redirect('/products/allItems/filters/All');
    }
  } else {
    req.flash('error', 'You are not logged in');
    res.redirect('/user/login');
  }
});
router.post('/verify', async (req, res) => {
  let user = '';
  if (req.user) {
    if (global.userstatus != 'Active') {
      let { user } = userID(req);
      const sql1 = await connection
        .promise()
        .query(`SELECT * FROM users WHERE username = '${user}'`);

      if (sql1[0][0].status != 'Active') {
        if (sql1[0][0].status == req.body.code) {
          try {
            const sql2 = await connection
              .promise()
              .query(
                `UPDATE users SET status='Active' WHERE username = '${user}'`
              );
            req.flash('success', 'Your account was verified successfully.👌');
            res.redirect('/products/allItems/filters/All');
            global.userstatus = 'Active';
          } catch (e) {
            req.flash('error', 'Unknown server error');
            req.logout();
            res.redirect('products/allItems/filters/All');
          }
        } else {
          req.flash('error', 'Invalid Code.Please try again');
          res.redirect('/user/verify');
        }
      }
    } else {
      req.flash('error', 'You are not logged in');
      res.redirect('/user/login');
    }
  } else {
    req.flash('error', 'You are not logged in');
    res.redirect('/user/login');
  }
});
router.get('/register', (req, res) => {
  const homeSearch = 'false'
  if (req.user) {
    req.flash('error', 'You are already logged in');
    res.redirect('/products/allItems/filters/All');
  } else {
    res.render('register.ejs', { homeSearch });
  }
});
router.get('/login', (req, res) => {
  const homeSearch = 'false'
  if (req.user) {
    req.flash('error', 'You are already logged in');
    res.redirect('/products/allItems/filters/All');
  } else {
    res.render('login.ejs', { homeSearch });
  }
});
const likeData = async (req, res, next) => {
  const { user, user_name } = userID(req);
  req.session.firstName = user_name;
  const sql1 = await connection
    .promise()
    .query('SELECT ProductID FROM liked WHERE Username=?', [user]);
  req.session.likedProducts = [];
  sql1[0].map((product) => {
    req.session.likedProducts.push(product.ProductID);
  });
  next();
};
router.post(
  '/login',

  passport.authenticate('local', {
    failureRedirect: '/user/login',
    failureFlash: true,
    successFlash: true,
  }), likeData,
  async (req, res, next) => {
    const { user } = userID(req)
    const sql1 = await connection.promise().query('SELECT * FROM users WHERE email=?', [user])
    req.session.userData = sql1[0][0]
    req.session.userEmail = user
    res.redirect('/products/allItems/filters/All');
  }
);
router.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);
router.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/user/register',
    failureFlash: true,
    successFlash: true,
  }),
  likeData,
  async (req, res, next) => {
    const { user } = userID(req)
    const sql1 = await connection.promise().query('SELECT * FROM users WHERE email=?', [user])
    req.session.userData = sql1[0][0]
    req.session.userData.notification = sql1[0][0].notification
    req.session.userEmail = user
    res.redirect('/products/allItems/filters/All');
  }
);
router.get('/notifications', async (req, res) => {
  const homeSearch = 'false'
  if (req.user) {
    const { user } = userID(req)
    if (req.session.userData.notification > 0) {
      const sql1 = await connection.promise().query('UPDATE users SET notification=0 WHERE email=?', [user])
    }
    const sql2 = await connection.promise().query('SELECT `Message`,`TIMESTAMP` FROM Notifications WHERE Email=? ORDER BY TIMESTAMP DESC', [user])
    const sql3 = await connection.promise().query('SELECT userEmail FROM access WHERE Selleremail=?', [req.session.userData.email])
    const approval = sql3[0]
    const allNotify = sql2[0]
    req.session.userData.notification = 0
    const cartProducts = await cartItems(req);
    for (let i = 0; i < approval.length; i++) {
      const sql4 = await connection.promise().query('SELECT FirstName,LastName,Image FROM users WHERE email=?', [req.session.userData.email])
      approval[i].FirstName = sql4[0][0].FirstName.trim()
      approval[i].LastName = sql4[0][0].LastName.trim()
      if (sql4[0][0].Image != null) {
        approval[i].image = sql4[0][0].Image.trim()
      } else {
        approval[i].image = 'https://www.svgrepo.com/show/345416/account-box.svg'
      }
    }

    res.render('notifications.ejs', { req, cartProducts, allNotify, homeSearch, approval })
  } else {
    req.flash('error', 'something went wrong')
    res.redirect('/products/home')
  }
})
router.post('/notifications/delete', async (req, res) => {
  try {
    const sql1 = await connection.promise().query('DELETE FROM notifications WHERE TIMESTAMP=? AND Email=?', [parseInt(req.body.timestamp), req.session.userData.email])

  } catch (e) {

  }
  res.send('deleted')
})
router.post('/email', async (req, res) => {
  if (global.emailstatus === true) {
    global.emailstatus = false;
    name();
    let { user } = userID(req);

    try {
      const code = `${Math.floor(Math.random() * 10)}${Math.floor(
        Math.random() * 10
      )}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
      const sql4 = await connection
        .promise()
        .query(`UPDATE users SET status='${code}' WHERE username = '${user}'`);
      const transporter = nodemailer.createTransport({
        // service: process.env.SERVICE,
        host: 'smtp.gmail.com',
        port: 587,
        ignoreTLS: false,
        secure: false,
        auth: {
          user: process.env.USER,
          pass: process.env.PASSWORD,
        },
      });

      try {
        const data = await ejs.renderFile(__dirname + '/email.ejs', {
          code: code,
          user_name: user,
        });
        const mailOptions = {
          from: process.env.USER,
          to: user,
          subject: 'Welcome to Buy&Sell',
          html: data,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {

          } else {
          }
        });
      } catch (err) {

      }
    } catch (e) {

    }
    req.flash('success', 'New email is on its way!!!🚀');
  } else if (global.emailstatus === false) {
    req.flash('error', `Next email can be sent in ${timer} seconds.`);
  }
  res.redirect('/user/verify');
});
router.post('/register', async (req, res) => {

  try {
    const sql1 = await connection
      .promise()
      .query(`SELECT * FROM users WHERE username = '${req.body.username}'`);
    if (sql1[0] == 0) {
      req.username = req.body.username;
      try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const code = `${Math.floor(Math.random() * 10)}${Math.floor(
          Math.random() * 10
        )}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
        let person = {
          firstname: req.body.FirstName,
          LastName: req.body.LastName,
          Age: req.body.Age,
          username: req.body.username,
          email: req.body.username,
          password: hashedPassword,
          phone: req.body.phone,
          Country: req.body.Country,
          State: req.body.State,
          City: req.body.City,
          status: code,
          rating: 0,
          reviewsNo: 0,
          bio: req.body.bio,
          notification: 0,
          emailNewProduct: 'true',
          emailChat: 'true',
          showContactDetails: 'true',
          profilePicture: 'true'
        };
        const sql = 'INSERT INTO users SET ?';
        connection.query(sql, person, async (err, result) => {
          if (err) {
            req.flash('error', `${err}`);
            res.redirect('/user/register');
          } else {
            const transporter = nodemailer.createTransport({
              service: process.env.SERVICE,
              auth: {
                user: process.env.USER,
                pass: process.env.PASSWORD,
              },
            });

            try {
              const data = await ejs.renderFile(__dirname + '/email.ejs', {
                code: code,
                user_name: req.body.username,
              });
              const mailOptions = {
                from: process.env.USER,
                to: req.body.username,
                subject: 'Welcome to Buy&Sell',
                html: data,
              };
              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {

                } else {
                }
              });
            } catch (e) {

            }
          }
        });
        req.session.userEmail = req.body.username
        req.flash(
          'success',
          `Account Created🤩.Look at your mailbox for verfication`
        );
        const result1 = await connection
          .promise()
          .query(`SELECT * FROM USERS WHERE USERNAME = '${req.body.username}'`);

        req.session.userData = result1[0][0]
        req.login(result1, function (e) {

        });
        global.userstatus = 'Not Active';
        global.emailstatus = true;
        req.session.likedProducts = [];
        res.redirect('/products/allItems/filters/All');
      } catch (e) {

      }
    } else {
      req.flash('error', 'This email is already registered with us!');
      res.redirect('/user/login');
    }
  } catch (e) {

  }
});
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success', 'You were logged out successfully');
  res.redirect('/products/allItems/filters/All');
});
router.get('/forgot', (req, res) => {
  const homeSearch = 'false'
  if (!req.user) {
    res.render('forgot.ejs', { req, homeSearch });
  } else {
    req.flash('error', 'You are already logged in');
    res.redirect('/products/allItems/filters/All');
  }
});
router.post('/changeSettings', async (req, res) => {

  if (req.user) {
    const sql1 = await connection.promise().query(`UPDATE users SET ${req.body.id}='?' WHERE email=?`, [req.body.checked, req.session.userData.email])
    const sql2 = await connection.promise().query('SELECT * FROM users WHERE email=?', [req.session.userData.email])

    req.session.userData = sql2[0][0]
  }
  res.send(req.body)
})
router.get('/password_verify/:hashID/:timestamp/:email', async (req, res) => {
  const homeSearch = 'false'
  const { hashID, timestamp, email } = req.params;
  try {
    const sql = await connection
      .promise()
      .query('SELECT * FROM `temporary` WHERE temp=?', [hashID]);
    const email1 = base64url.decode(email);
    if (
      sql[0][0].EmailID === email1 &&
      Date.now() / 1000 - sql[0][0].Time < 15 * 60 //Used to check if hashid is older than 15 minutes
    ) {
      res.render('change.ejs', { hashID, timestamp, email, req, homeSearch });
    } else if (Date.now() / 1000 - sql[0][0].Time > 15 * 60) {
      req.flash('error', 'Code Expired.Request new one');
      res.redirect('/user/forgot');
    } else {
      req.flash('error', 'You are not authorized for this action.');
      res.redirect('/products/allItems/filters/All');
    }
  } catch (e) {
    req.flash('error', 'Something went wrong');
    res.redirect('/user/forgot');
  }
});

router.put('/change/:id/:time/:email', async (req, res) => {
  const { id, time, email } = req.params;
  const email1 = base64url.decode(email);
  const sql1 = await connection
    .promise()
    .query(
      'SELECT * FROM `temporary` WHERE `emailID`=? AND `Temp`=? AND `Time`=?',
      [email1, id, time]
    );
  if (sql1[0][0] && req.body.new === req.body.confirmed) {
    const hashedPassword = await bcrypt.hash(req.body.new, 10);
    const sql2 = await connection
      .promise()
      .query('UPDATE users SET password=? WHERE email=?', [
        hashedPassword,
        email1,
      ]);
    const sql3 = await connection
      .promise()
      .query('DELETE FROM `temporary` WHERE EmailID=?', [email]);
    req.flash('success', 'Password changed!!You can login now');
    res.redirect('/user/login');
  } else {
    req.flash('error', 'Something went wrong!😵‍💫');
    res.redirect('/user/forget');
  }
});
router.post('/forgot', async (req, res) => {
  if (!req.user) {
    const sql1 = await connection
      .promise()
      .query('SELECT * FROM users WHERE `username`=?', [req.body.email]);
    if (sql1[0][0]) {
      const email = base64url(req.body.email);
      const hash = randomString(25);
      const stamp = Date.now() / 1000;
      try {
        const sql2 = await connection
          .promise()
          .query('SELECT * FROM temporary WHERE `emailID`=?', [req.body.email]);
        if (sql2[0][0]) {
          const sql3 = await connection
            .promise()
            .query('UPDATE temporary SET `Temp`=?,`Time`=? WHERE `EmailID`=?', [
              hash,
              stamp,
              req.body.email,
            ]);
        } else {
          try {
            const sql4 = await connection
              .promise()
              .query(
                `INSERT INTO temporary VALUES('${req.body.email}','${hash}','${stamp}')`
              );
          } catch (e) {

          }
        }
      } catch (e) {

      }
      const transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        auth: {
          user: process.env.USER,
          pass: process.env.PASSWORD,
        },
      });

      try {
        const data = await ejs.renderFile(__dirname + '/forgotPassword.ejs', {
          hash,
          stamp,
          email,
        });
        const mailOptions = {
          from: process.env.USER,
          to: req.body.email,
          subject: 'Forgot Password',
          html: data,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {

          } else {
          }
        });
      } catch (err) {

      }

      req.flash('success', 'Look for our Email in your mailbox');
      res.redirect('/products/allItems/filters/All')
    } else {
      req.flash('error', 'This is not a registered email address.🤯');
      res.redirect('/user/forgot');
    }
  }
});
router.get('/userProfile', async (req, res) => {
  const homeSearch = 'false'
  if (req.user) {
    const { user } = userID(req);
    const sql2 = await connection
      .promise()
      .query('SELECT * FROM users WHERE Username=?', [user]);
    const userData = sql2[0][0];
    req.session.userData = userData;
    let profilePicture;
    if (userData.Image === null) {
      profilePicture = 'https://www.svgrepo.com/show/3130/user.svg';
    } else {
      profilePicture = userData.Image;
    }
    const cartProducts = await cartItems(req);
    res.render('profile.ejs', { req, cartProducts, profilePicture, userData, homeSearch });
  } else {
    req.flash('error', 'You are not logged in');
    res.redirect('/products/allItems/filters/All');
  }
});
router.post('/userImage', upload.single('myfile'), async (req, res) => {
  if (req.user) {
    const { user } = userID(req);
    const picLink = req.file.path;
    const sql2 = await connection
      .promise()
      .query('SELECT Image FROM users WHERE Username=?', [user]);
    if (sql2[0].length === 0) {
      const sql1 = await connection
        .promise()
        .query('UPDATE users SET Image=? WHERE Username=?', [picLink, req.session.userData.email]);
    } else {
      cloudinary.uploader.destroy(sql2[0][0].Image, function (result) { });
      const sql3 = await connection
        .promise()
        .query('UPDATE users SET `Image`=? WHERE `Username`=?', [
          picLink,
          user,
        ]);
    }
    res.redirect('/user/userProfile');
  } else {
    req.flash('error', 'Action Not Authorized😢');
    res.redirect('/products/allItems/filters/All');
  }
});
router.put('/changeUserDetails', async (req, res) => {
  const { first, last, phone, country, state, city, bio } = req.body;

  const sql1 = await connection
    .promise()
    .query(
      'UPDATE users SET FirstName=?,LastName=?,phone=?,Country=?,State=?,City=?,bio=? WHERE email=?',
      [first, last, phone, country, state, city, bio, req.session.userData.email]
    );
  req.flash('success', 'User Profile Updated!');
  res.redirect('/products/allItems/filters/All');
});
router.post('/comment/delete', async (req, res) => {
  console.log('hi')
  console.log(req.body)
  if (req.user) {
    console.log('hi')
    try {
      const sql1 = await connection.promise().query('DELETE FROM comments WHERE ProductId=? AND Text=? AND Username=?', [req.body.id, req.body.identity, req.session.userData.email])

    } catch (e) { console.log(e) }
  }
  res.send('done')
})
router.post('/cart/deleteItem', async (req, res) => {
  console.log(req.body)
  if (req.user) {
    const sql = await connection.promise().query('DELETE FROM cart WHERE EmailId=? AND ProductID=?', [req.session.userData.email, req.body.product.trim()])
  } else {
    req.session.product.splice(req.session.product.indexOf(req.body.product), 1)
  }
  res.send('product removed from the cart')
})
module.exports = router;
