if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const app = express();
const router = express.Router();
const EventEmitter = require('events').EventEmitter
const emitter = new EventEmitter();
emitter.setMaxListeners(100)
const mysql = require('mysql2');
const nodemailer = require('nodemailer')
const ejs = require('ejs');
const cloudinary = require('cloudinary').v2;
const methodOverride = require('method-override');
const { isLoggedIn, userID } = require('../functions');
const connect = require('../schemas/database');
const { user } = require('../schemas/database');
const connection = mysql.createConnection(connect);
const axios = require('axios')

app.set('trust proxy', 1);
cloudinary.config({
  cloud_name: 'dsxjfrucv',
  api_key: '529392691953429',
  api_secret: 'R6YwzYF0l8HLzXW9LdtLuF_I6F8',
  secure: true,
});
app.use(methodOverride('_method'));
connection.connect((err) => {
  if (err) {
    throw err;
  }

});
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
router.post('/accessreq', async (req, res) => {
  const { seller } = req.body
  const user = req.session.userData.FirstName + ' ' + req.session.userData.LastName
  const userEmail = req.session.userData.email
  const sql1 = await connection.promise().query('SELECT * FROM access WHERE Selleremail=? AND userEmail=?', [seller, req.session.userData.email])

  if (sql1[0].length === 0) {

    const sql2 = await connection.promise().query('INSERT INTO access VALUES(?,?)', [seller, req.session.userData.email])
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      ignoreTLS: false,
      secure: false,
      auth: {
        user: process.env.USER,
        pass: process.env.PASSWORD,
      },
    })
    try {
      const data = await ejs.renderFile(__dirname + '/accessEmail.ejs', { seller, user, userEmail });
      const mailOptions = {
        from: process.env.USER,
        to: userEmail,
        subject: 'Contact Details Requested',
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
}


)
router.post('/item/api', async (req, res) => {
  const { search } = req.body;

  try {
    const sql1 = await connection
      .promise()
      .query(`SELECT Name FROM products WHERE Name LIKE '%${search}%' AND advertize='on'`);
    res.json(sql1[0]);
  } catch (e) {

  }
});
router.post('/item/search', async (req, res) => {

  try {
    const sql1 = await connection
      .promise()
      .query('SELECT productID FROM products WHERE Name=?', [req.body.search]);
    let linkID = sql1[0][0].productID;
    res.redirect(`/products/item?productID=${linkID}`);
  } catch (e) {
    res.redirect('/products/home');
  }
});
router.get('/allItems/filters/:category', async (req, res) => {
  const homeSearch = 'false'
  const priceOptions = [
    { value: 'all', name: 'All Prices' },
    { value: '299', name: '>300' },
    { value: '599', name: '>1000' },
    { value: '1000+', name: '1000+' },
  ];
  const { price, rating } = req.query;
  let checked = req.params.category.toLowerCase();
  const categoriesList = [
    'All',
    'Sports_and_Fitness',
    'Clothing_and_Accessories',
    'Furniture',
    'Motor_Vehicles',
    'Books',
    'Console_and_Video_Games',
    'Mobile_Phones_and_Gadgets',
    'Appliances',
    'Others',
  ];
  let sql1;

  const cartProducts = await cartItems(req);
  let query = 'SELECT * FROM PRODUCTS WHERE';
  console.log(req.query.price);
  if (req.query.price !== undefined) {
    if (req.query.price != '1000+' && req.query.price != 'all') {
      query += ` Price<=${parseInt(req.query.price)}`;
    } else {
      query += ` Price>=1000`;
    }
    if (req.params.category.toLowerCase() != 'all') {
      query += ` AND Category='${req.params.category}'`;
    }
    if (req.query.rating) {
      query += ` AND Rating>=${req.query.rating}`;
    }
  } else {
    if (req.params.category) {
      if (req.params.category.toLowerCase() === 'all') {
        query += ` Category=Category`;
      } else {
        query += ` Category='${req.params.category}'`;
      }
      if (req.query.rating) {
        query += ` AND Rating>=${req.query.rating}`;
      }
    } else {
      if (req.query.rating) {
        query += ` Rating>=${req.query.rating}`;
      }
    }
  }
  try {
    console.log(query)
    sql1 = await connection.promise().query(query);
  } catch (e) {

  }
  const sql2 = await connection
    .promise()
    .query('SELECT publicId,product FROM IMAGES');
  const products = sql1[0];
  const allPictures = sql2[0];

  let ids = [];
  let mainPics = [];
  products.map((productItem) => {
    if (allPictures.length == 0) {
      productItem.picture =
        'https://res.cloudinary.com/dsxjfrucv/image/upload/v1643924761/default_ai4d4q.png?pgw=1';
    }
    for (let i = 0; i < allPictures.length; i++) {
      if (productItem.productID == allPictures[i].product) {
        productItem.picture = allPictures[i].publicId;
      }
      if (productItem.picture === undefined) {
        productItem.picture =
          'https://res.cloudinary.com/dsxjfrucv/image/upload/v1643924761/default_ai4d4q.png?pgw=1';
      }
    }
  });
  allPictures.map((product) => {
    if (ids.includes(product.product)) {
    } else {
      ids.push(product.product);
      mainPics.push(product.publicId);
    }
  });

  res.render('products.ejs', {
    homeSearch,
    products,
    req,
    cartProducts,
    categoriesList,
    checked,
    price,
    rating,
    user,
    priceOptions,
  });
});
router.post('/access', async (req, res) => {

  if (req.user) {

    if (req.body.choice === 'yes') {
      const sql1 = await connection.promise().query('INSERT INTO accessgiven VALUES(?,?)', [req.session.userData.email, req.body.user])

    }
    const sql2 = await connection.promise().query('DELETE FROM access WHERE userEmail=?', [req.body.user])

  }
  res.send('done')
})
router.get('/item', async (req, res, next) => {
  const homeSearch = 'false'
  const cartProducts = await cartItems(req);
  let sellerImage, sellerData;
  let email;
  let user;
  let firstName = req.session.firstName;

  if (req.user) {
    let { user, user_name } = userID(req);
    email = user;
  } else {
    email = false;
    user = false;
  }
  let sql1, sql2, sql3, coords;

  const { productID } = req.query;
  try {
    sql1 = await connection
      .promise()
      .query('SELECT * FROM PRODUCTS WHERE productID=?', [productID]);
    coords = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${sql1[0][0].City}.json?limit=1&types=place%2Cpostcode%2Caddress&access_token=pk.eyJ1Ijoic2FtZzAxMDkiLCJhIjoiY2tzendqOHVmMnh2ZzJxdGZ2c3FoZWR2eCJ9.NH4uz7dqmRkpvJmZsxBO9Q`)
    coords = coords.data.features[0].center
    req.session.productView = sql1[0][0]
    console.log(sql1[0][0])
    const sql2 = await connection.promise().query('SELECT `FirstName`,LastName,Age,email,phone,Country,State,City,rating,reviewsNo,bio,showContactDetails,emailChat,profilePicture,Image FROM users WHERE email=?', [sql1[0][0].Seller])
    sendEmail = sql2[0][0].emailChat
    console.log(sql2[0][0])
    sellerData = sql2[0][0]
    if (sql1[0] === undefined) {
      req.flash('error', 'No such product exists');
      res.redirect('/products/home');
    }
  } catch (e) {
    req.flash('error', 'Products does not exist');
    res.redirect('/products/home');
  }

  sql2 = await connection
    .promise()
    .query('SELECT publicId FROM Images WHERE Product=?', [productID]);
  const pictures = sql2[0];
  sql3 = await connection
    .promise()
    .query('SELECT * FROM comments WHERE ProductId=?', [productID]);
  console.log(sellerData)
  if (sellerData.Image === null) {
    sellerImage = 'https://www.svgrepo.com/show/1625/user.svg';
  } else {
    sellerImage = sellerData.Image;
  }


  let isProductAdded;
  if (req.user) {
    const sql4 = await connection
      .promise()
      .query('SELECT * FROM cart WHERE ProductID=? AND EmailId=?', [
        productID,
        email,
      ]);
    if (sql4[0].length !== 0) {
      isProductAdded = true;
    } else {
      isProductAdded = false;
    }
  } else {
    if (req.session.product) {
      const ids = cartProducts.map((product) => product.productID);

      if (ids.includes(productID)) {
        isProductAdded = true;
      } else {
        isProductAdded = false;
      }
    } else {
      isProductAdded = false;
    }
  }
  let isApproved;
  let underConsideration;
  if (req.user && req.session.productView.Seller !== req.session.userData.email) {
    const sql7 = await connection.promise().query('SELECT * FROM access WHERE userEmail=? AND SellerEmail=?', [req.session.userData.email, req.session.productView.Seller])
    const sql8 = await connection.promise().query('SELECT * FROM accessgiven WHERE userEmail=? AND SellerEmail=?', [req.session.userData.email, req.session.productView.Seller])
    if (sql7[0].length === 0) {
      underConsideration = false;
      if (sql8[0].length === 0) {
        isApproved = false
      } else {
        isApproved = true
      }
    } else {
      underConsideration = true
      isApproved = false
    }

  }
  const data = sql1[0][0];
  const comments = sql3[0];

  for (let i = 0; i < comments.length; i++) {
    const sql = await connection.promise().query('SELECT FirstName,LastName,Image FROM users WHERE username=?', [comments[i].Username])

    if (sql[0][0].Image === null) {
      comments[i].Image = 'https://www.svgrepo.com/show/361411/account.svg'
    } else {
      comments[i]['Image'] = sql[0][0].Image
    }
    comments[i].name = sql[0][0].FirstName.trim() + ' ' + sql[0][0].LastName.trim()
  }

  let avgRating = 0;
  let noOfRating = 0;
  for (let i = 0; i < comments.length; i++) {
    avgRating += comments[i].Rating;
    if (comments[i].Rating) {
      noOfRating += 1;
    }
  }
  const cookieAccept = req.session['Cookies-Accepted'];
  avgRating /= noOfRating;
  avgRating = Math.floor(avgRating);
  if (sql1[0][0] !== undefined) {
    if (req.session.productView.advertize === 'on') {
      res.render('productpage', {
        underConsideration,
        isApproved,
        homeSearch,
        sendEmail,
        cookieAccept,
        roomName: productID,
        req,
        data,
        email,
        pictures,
        comments,
        avgRating,
        isProductAdded,
        cartProducts,
        sellerData,
        sellerImage,
        firstName,
        user,
        coords
      })
    } else if (req.user) {
      if (req.session.productView.Seller === req.session.userData.email) {
        res.render('productpage', {
          homeSearch,
          cookieAccept,
          roomName: productID,
          req,
          data,
          email,
          pictures,
          comments,
          avgRating,
          isProductAdded,
          cartProducts,
          sellerData,
          sellerImage,
          firstName,
          user,
          underConsideration,
          isApproved,
          coords
        })
      } else {
        req.flash('error', 'Sorry,this product is not for sale')
        res.redirect('/products/allItems/filters/all')
      }
    }
    else {
      req.flash('error', 'Sorry,this product is not for sale')
      res.redirect('/products/allItems/filters/all')
    }
  } else {
    req.flash('error', 'Sorry,No such product')
    res.redirect('/products/allItems/filters/all')
  };
});
router.get('/newProduct', isLoggedIn, async (req, res, next) => {
  const homeSearch = 'false'
  const cartProducts = await cartItems(req);
  const { user } = userID(req);
  res.render('newProduct.ejs', { homeSearch, req, user, cartProducts });
});
router.post('/cart/data', async (req, res) => {
  if (req.user) {
    const { user } = userID(req);
    try {
      const sql1 = await connection
        .promise()
        .query('INSERT INTO cart VALUES(?,?,?)', [
          user,
          req.body.url,
          Date.now() / 1000,
        ]);
    } catch (error) {

    }
  } else {
    if (!req.session.product) {
      req.session.product = [req.body.url];
      console.log('hello')
      console.log(req.session.product);
    } else {
      if (!req.session.product.includes(req.body.url))
        console.log('hello')
      req.session.product.push(req.body.url);
    }
  }
  req.flash(
    'success',
    'Added to Cart.Let\'s go.🍾'
  );
  res.redirect(`/products/item?productID=${req.body.url}`);
});
router.post('/cookiesAccept', (req, res) => {
  req.session['Cookies-Accepted'] = true
  req.session.cookieyes = 'yes'
  req.session.save()
})
router.post('/newProduct', async (req, res) => {
  const { name, category, type, price, country, stock, description } = req.body;
  console.log(req.body)
  if (req.user && name !== '' && category !== '' && type !== '' && price !== '' && country !== '' && stock !== '' && description !== '') {

    let { user, user_name } = userID(req);
    let uploadTime = Date.now() / 1000;
    try {
      const sql1 = await connection
        .promise()
        .query("INSERT INTO Products VALUES(UUID(),?,?,?,?,?,?,?,?,?,0,'on',0)", [
          name,
          category.toLowerCase().replaceAll(' ', '_'),
          type,
          price,
          stock,
          description,
          user,
          uploadTime,
          country,
        ]);
      try {
        const sql2 = await connection.promise().query('INSERT INTO notifications VALUES(?,?,?)', [user, `${name} was successfully added to the website`, uploadTime])
      } catch (e) {

      }
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        ignoreTLS: false,
        secure: false,
        auth: {
          user: process.env.USER,
          pass: process.env.PASSWORD,
        },
      })
      if (req.session.userData.emailNewProduct === 'true') {
        try {
          const data = await ejs.renderFile(__dirname + '/productEmail.ejs', { user_name });
          const mailOptions = {
            from: process.env.USER,
            to: user,
            subject: 'New Product Added',
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

      try {
        const sql2 = await connection
          .promise()
          .query('SELECT * FROM Products WHERE uploadTime=? AND Seller=?', [
            uploadTime,
            user,
          ]);
        const { productID } = sql2[0][0];

        res.redirect(`/products/item?productID=${productID}`);
      } catch (e) {
        req.flash('error', 'Something went wrong! Try again after some time');
      }
    } catch (e) {
      req.flash('error', 'Something went wrong! Try again after some time');
    }
  } else {
    req.flash('error', 'Missing Details')
    res.redirect('/products/home')
  }
});

router.post('/images', async (req, res) => {
  const { url, id, public_id } = req.body;

  try {
    const sql1 = await connection
      .promise()
      .query('INSERT INTO Images VALUES(?,?,?)', [url, id, public_id]);
  } catch (e) {

  }
});
router.post('/comments', async (req, res) => {
  let { user } = userID(req);
  const { productID, sellerID } = req.query;
  const { rating, comment } = req.body;
  if (rating > 0 && comment.length > 0) {
    try {
      const sql1 = await connection
        .promise()
        .query('INSERT INTO Comments VALUES(?,?,?,?)', [
          user,
          productID,
          comment,
          rating,
        ]);
      const sql2 = await connection
        .promise()
        .query(
          `UPDATE users SET reviewsNo=reviewsNo+1,rating=rating+${rating} WHERE username=?`,
          [sellerID]
        );
      req.flash('success', 'Review Added👌');
    } catch (e) {
      req.flash('error', 'Something went wrong!');
    }
  } else {
    req.flash('error', 'Missing Fields')
  }
  res.redirect(`/products/item?productID=${productID}`);
});
// Update Routes
router.get('/updateItem/:productId', async (req, res) => {
  const homeSearch = 'false'
  const cartProducts = await cartItems(req);
  const { productId } = req.params;
  if (req.user) {
    let { user } = userID(req);
    const sql1 = await connection
      .promise()
      .query('SELECT * FROM products WHERE productID=?', [productId]); 4
    const data = sql1[0][0];
    if (data.Seller === user) {
      res.render('editProduct.ejs', { homeSearch, data, req, user, cartProducts });
    } else {
      req.flash('error', 'Action Not Allowed');
      res.redirect('/products');
    }
  } else {
    req.flash('error', 'You are not logged in.');
    res.redirect('/products');
  }
});
router.get('/home', async (req, res, next) => {
  const homeSearch = 'true'
  const sql1 = await connection.promise().query('SELECT productID,Name,Seller FROM `products` ORDER BY UploadTime DESC LIMIT 3')
  for (let i = 0; i < sql1[0].length; i++) {
    const sql2 = await connection.promise().query('SELECT publicId FROM images WHERE Product=?', [sql1[0][i].productID])
    const sql3 = await connection.promise().query('SELECT FirstName,LastName,Image FROM users WHERE username=?', sql1[0][i].Seller)
    if (sql2[0].length === 0) {
      sql1[0][i].image = 'https://res.cloudinary.com/dsxjfrucv/image/upload/v1643924761/default_ai4d4q.png?pgw=1'
    } else {
      sql1[0][i].image = sql2[0][0].publicId
    }
    sql1[0][i].Seller = sql3[0][0].FirstName.trim() + ' ' + sql3[0][0].LastName.trim()
  }
  const newProducts = sql1[0]

  const cartProducts = await cartItems(req);
  res.render('home.ejs', { homeSearch, req, cartProducts, newProducts });
});
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  const { name, category, type, price, country, stock, description } = req.body;
  let { user } = userID(req);
  if (req.user) {
    try {
      const sql1 = await connection
        .promise()
        .query(
          'UPDATE products SET `Name`=?,`Category`=?,`Type`=?,`Price`=?,`City`=?,`Stock`=?,`Description`=? WHERE `productID`=?',
          [name, category, type, price, country, stock, description, id]
        );
      req.flash('success', 'Item Updates successfully');
      res.redirect(`/products`);
    } catch (e) {
      req.flash('error', 'There was a problem.Try again later😢');
      res.redirect(`/products`);

    }
  }
});
////Like And Unlike Buttons:
router.post('/like', async (req, res) => {
  if (req.user) {
    const { user } = userID(req);
    try {
      const sql1 = await connection
        .promise()
        .query(`INSERT INTO liked VALUES(?,?)`, [user, req.body.id]);
      const sql2 = await connection
        .promise()
        .query('SELECT COUNT(*) AS likesNo FROM liked WHERE productID = ? ', [
          req.body.id,
        ]);
      const likesNo = sql2[0][0].likesNo;
      const sql3 = await connection
        .promise()
        .query('UPDATE products SET Likes=? WHERE productID=?', [
          likesNo,
          req.body.id,
        ]);
      req.session.likedProducts.push(req.body.id);
      res.send('liked')
    } catch (e) {

    }
  } else {
    res.send('Action Not Allowed');
  }
});
router.post('/unlike', async (req, res) => {
  if (req.user) {
    const { user } = userID(req);
    try {
      const sql1 = await connection
        .promise()
        .query(`DELETE FROM liked WHERE Username=? AND ProductID=?`, [
          user,
          req.body.id,
        ]);
      const sql2 = await connection
        .promise()
        .query('SELECT COUNT(*) AS likesNo FROM liked WHERE productID = ?', [
          req.body.id,
        ]);
      const likesNo = sql2[0][0].likesNo;
      const sql3 = await connection
        .promise()
        .query('UPDATE products SET Likes=? WHERE productID=?', [
          likesNo,
          req.body.id,
        ]);
      let index = req.session.likedProducts.indexOf(req.body.id);
      req.session.likedProducts = req.session.likedProducts.splice(index, 1);
      res.send('unlike')
    } catch (e) {

    }
  } else {
    res.send('Action Not Allowed');
  }
});
///DELETE ROUTES
router.delete('/deleteProduct/:id', async (req, res) => {
  if (req.user) {
    const { user } = userID(req);
    try {
      const sql2 = await connection
        .promise()
        .query('SELECT DeleteId FROM images WHERE Product=?', [req.params.id]);
      const sql5 = await connection
        .promise()
        .query('DELETE FROM comments WHERE ProductId=?', [req.params.id]);
      const sql4 = await connection
        .promise()
        .query('DELETE FROM cart WHERE ProductId=?', [req.params.id]);
      const sql6 = await connection
        .promise()
        .query('DELETE FROM cart WHERE ProductID=?', [req.params.id]);
      const sql3 = await connection
        .promise()
        .query('DELETE FROM images WHERE Product=?', [req.params.id]);
      const sql1 = await connection
        .promise()
        .query('DELETE FROM products WHERE productID=? AND Seller=?', [
          req.params.id,
          user,
        ]);
      for (let i = 0; i < sql2[0].length; i++) {
        cloudinary.uploader.destroy(sql2[0][i].DeleteId, function (result) { });
      }
      req.flash('success', 'Product Deleted Successfully!');
      res.redirect('/products/yourProducts')
    } catch (e) {

      req.flash(
        'error',
        'Action Unauthorized.You have been logged out due to suspicious account activity.'
      );
      req.logout();
      res.redirect('/products');
    }
  }
});
router.get('/yourProducts', async (req, res) => {
  const homeSearch = 'false'
  if (req.user) {
    const { user } = userID(req);
    const sql1 = await connection
      .promise()
      .query('SELECT productId,Name,advertize FROM products WHERE Seller=?', [
        user,
      ]);
    const productItemList = sql1[0];
    for (let i = 0; i < productItemList.length; i++) {
      const sql2 = await connection
        .promise()
        .query('SELECT publicId FROM images WHERE Product=? LIMIT 1', [
          productItemList[i].productId,
        ]);
      try {
        productItemList[i].image = sql2[0][0].publicId;
      } catch (e) {
        productItemList[i].image =
          'https://www.svgrepo.com/show/189983/trolley-items.svg';
      }
    }

    const cartProducts = await cartItems(req);

    res.render('yourProducts.ejs', { homeSearch, req, cartProducts, productItemList, user });
  } else {
    req.flash('success', 'You are not logged in.');
    res.redirect('/user/login');
  }
});
router.post('/advertise', async (req, res) => {
  let toggle;

  if (req.user) {

    if (req.body.value === false) {
      toggle = 'off';
    } else {
      toggle = 'on';
    }
    try {

      const sql1 = await connection
        .promise()
        .query('UPDATE products SET advertize=? WHERE productID=?', [
          toggle,
          req.body.id,
        ]);
    } catch (e) {

    }
  }

  res.send(req.body)
});
module.exports = cartItems;
module.exports = router;
