
<p align="center">
  <img width="300" height="300" src="https://i.ibb.co/02f118S/Shop.png">
  <h1>Buy And Sell</h1>
</p>


This project aims at combining several features of social media and shopping websites to improve user experience.

## Technologies Used
ExpressJs,VanillaJs,MySQL,CSS,EJS,WebSockets and a range of APIs such as ThreeJS and MapBox
## Features of the Website
<li>Encrypted Passwords</li><li>Email Verification</li>
<li>Forgot Password</li>
<li>Google OAuth Login</li>
<li>Change Password</li>
<li>Add profile picture</li>
<li>Add/Modify/Delete Products</li>
<li>Delist Porducts when not in stock</li>
<li>Privacy Settings like email approvals required to share contact details</li>
<li>Add Product Images(Hosted on the cloud)</li>
<li>Dedicated Chat Rooms for each product using WebSockets</li>
<li>Real Time Notifications as well as Notification Settings</li>

## Screenshots
<p align='center'>
  <img width="800" height="450" src="https://res.cloudinary.com/dsxjfrucv/image/upload/v1653149312/Screenshot_30_eehw7y.png">
  <img width="800" height="450" src="https://res.cloudinary.com/dsxjfrucv/image/upload/v1653149313/Screenshot_31_gc3us1.png">
    <img width="800" height="450" src="https://res.cloudinary.com/dsxjfrucv/image/upload/v1653149312/Screenshot_32_youcp0.png">
    <img width="800" height="450" src="https://res.cloudinary.com/dsxjfrucv/image/upload/v1653149312/Screenshot_29_ioifff.png">
    <img width="800" height="450" src="https://res.cloudinary.com/dsxjfrucv/image/upload/v1653149312/Screenshot_33_bpphk0.png">
   <img width="800" height="450" src="https://res.cloudinary.com/dsxjfrucv/image/upload/v1653149313/Screenshot_36_qg553n.png">
   <img width="800" height="450" src="https://res.cloudinary.com/dsxjfrucv/image/upload/v1653149313/Screenshot_37_lf2aqi.png">
   <img width="800" height="450" src="https://res.cloudinary.com/dsxjfrucv/image/upload/v1653149314/Screenshot_40_jczfs7.png">
</p>


## Run Locally
Note: Ensure NodeJs and local/hosted MySql database is available
<br>  
Clone the project

```bash
  git clone https://github.com/SakshamGoelUK/Buy-And-Sell.git
```

Go to the project directory

```bash
  cd my-project
```
Install dependencies

```bash
  npm install
```
Setting Up MySQL Database
<br>
Configure your database details in database.js and then run all files in the schemas folder (node <filename>.js)
```
cd schemas
```
Start the server after moving back to the parent project folder
```bash
  npm run start
```

Create an Issue if this doesn't work for you.

## Hosted Website
  The website is hosted at this link: <a href="https://ecommercebuysell.herokuapp.com/products/home">Buy And Sell</a>
  <br/>
  Note : Due to limitations of a free hosting plan,the website might not perform well and be unpredicatable at times.In particular, the database access and websockets seem to be affected by this.All of them work flawlessly locally.
## LICENSE

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/SakshamGoelUK/Buy-And-Sell/blob/Saksham/LICENSE)

 The website has an MIT License so everyone is free to use the code and make changes to it as they please.

