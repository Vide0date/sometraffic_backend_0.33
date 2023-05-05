const db = require("../models");
const User_Account = db.users_accounts;

checkDuplicateUsernameOrEmail = (req, res, next) => {
    // Username
    // console.log('userName and body', req.body);
    
    User_Account.findOne({
      where: {
        userName: req.body.uname
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Username is already in use!"
        });
        return;
      }
  
      // Email
      User_Account.findOne({
        where: {
          email: req.body.email
        }
      }).then(user => {
        if (user) {
          res.status(400).send({
            message: "Failed! Email is already in use!"
          });
          return;
        }
  
        next();
      });
    });
};

const verifySignUp = {
    checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail
};

module.exports = verifySignUp;