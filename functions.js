

function isLoggedIn(req, res, next) {
  if (req.user) {
    if (global.userstatus != "Active") {
      req.flash("error", "You are registered but your account is not active.");
      res.redirect("/user/verify");
    } else {
      next();
    }
  } else {
    res.redirect("/user/login");
  }
}
const userID = (req) => {
  try {
    if (typeof req.user[0][0].email != undefined) {
      let user = req.user[0][0].email;
      let user_name = req.user[0][0].FirstName;
      let person = { user, user_name };
      return person;
    }
  } catch (e) {
    if (typeof req.user.email != undefined) {

      let user = req.user.email;
      let user_name = req.user.given_name;
      let person = { user, user_name };
      return person;
    }
  }
};
module.exports = { isLoggedIn, userID };
