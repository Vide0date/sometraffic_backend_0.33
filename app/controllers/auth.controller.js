const db = require('../models');
const config = require("../config/auth.config");
const Users_Account = db.users_accounts;
const bcrypt = require("bcrypt");

const { Op } = require('sequelize');

var jwt = require('jsonwebtoken');

exports.signup = (req, res) => {
    // Save Users_Account to Database
    const body = req.body;
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(body.password, salt, (err, hash) => {
            // Now we can store the password hash in db.
            const user = {
                userName: body.userName,
                password: hash,
                email: body.email,
                userType: 'Users_Account',
            };

            // Save Users_Account in the database
            Users_Account.create(user)
                .then(data => {
                    res.send({
                        title: 'Success!',
                        message: 'USER was registered successfully!'
                    })
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while creating the Users_Account."
                    });
                });
        });
    });
};


exports.signin = (req, res) => {
    console.log('----------RES--------------', req.body);
    Users_Account.findOne({
        where: {
            [Op.or]: [
                { email: req.body.email },
                { userName:  {
                    [Op.like]: `%${req.body.email}`
                }}
              ]
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({ message: "Users_Account Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            userId: user.id,
            userName: user.userName,
            email: user.email,
            userType: user.userType,
            accessToken: token,
            AccountId: user.AccountId
        });
    }).catch(err => {
        res.status(500).send({ message: err.message });
    })

};
