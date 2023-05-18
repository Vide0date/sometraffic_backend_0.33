const { exec } = require("child_process");
const bcrypt = require("bcrypt");

const db = require("../models");
const User_Account = db.users_accounts;

// Create and Save a new User_Account
exports.create = (req, res) => {
  // Validate request
  console.log("---- REQ indide create -----", req.body);
  const body = req.body;
  if (!(body.email && body.password && body.userName && body.AccountId)) {
    res.status(400).send({
      message: "You Carefully fill the Rigistration Form!",
    });
    return;
  }
  // Create a User_Account
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(body.password, salt, (err, hash) => {
      // Now we can store the password hash in db.
      var user = {
        userName: body.userName,
        password: hash,
        email: body.email,
        userType: body.userType,
        AccountId: body.AccountId,
      };
      console.log("---- REQ indide create bcrypt -----", user);
      // Save User_Account in the database
      User_Account.create(user)
        .then((data) => {
          res.send({
            title: "Success!",
            message: "USER was created successfully.",
          });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message ||
              "Some error occurred while creating the User_Account.",
          });
        });
    });
  });
};

// Update a User_Account by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  const body = req.body;

  if (body.password) {
    console.log("inside if ");
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, (err, salt) => {
      bcrypt.hash(body.password, salt, (err, hash) => {
        // Now we can store the password hash in db.
        var user = {
          userName: body.userName,
          password: hash,
          email: body.email,
          userType: body.userType,
          AccountId: body.AccountId
        };
        console.log("USER.UPDATE: ", user);
        User_Account.update(user, {
          where: { id: id },
        })
        .then((num) => {
          if (num == 1) {
            res.send({
              title: "Success!",
              message: "USER was updated successfully.",
            });
          } else {
            res.send({
              title: "Error!",
              message: `Cannot update User_Account with id=${id}. Maybe User_Account was not found or req.body is empty!`,
            });
          }
          })
          .catch((err) => {
            res.status(500).send({
              title: "Error!",
              message: "Error updating User_Account with id=" + id,
            });
          });
        });
      });
    } else {
      console.log("inside else ");
      var user = {
        userName: body.userName,
        email: body.email,
        userType: body.userType,
        AccountId: body.AccountId
      };

    User_Account.update(user, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({
            title: "Success!",
            message: "USER was updated successfully.",
          });
        } else {
          res.send({
            title: "Error!",
            message: `Cannot update User_Account with id=${id}. Maybe User_Account was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          title: "Error!",
          message: "Error updating User_Account with id=" + id,
        });
      });
  }
};

// Retrieve all users from the database.
exports.findAll = (req, res) => {
  User_Account.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        title: "Error!",
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};

// Find a single User_Account with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User_Account.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User_Account with id=" + id,
      });
    });
};

// Delete a User_Account with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  console.log("---- Delete request-----", req.params);
  User_Account.findByPk(id)
    .then((data) => {
      console.log("---- Finding User_Account -----", data);
      User_Account.destroy({
        where: { id: id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              title: "Success!",
              message: "USER was deleted successfully.",
            });
          } else {
            res.send({
              title: "Faild!",
              message: `Cannot delete ${data.userType} with id=${id}. Maybe ${data.userType} was not found!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            title: "Faild!",
            message: `Could not delete ${data.userType}  with id=` + id,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        title: "Find Faild!",
        message: "Could not find User_Account with id=" + id,
      });
    });
};

exports.downloadDatabase = (req, res) => {
  console.log("Try to export database.");
  let dumpFile = "public/dump.sql";
  // Execute a MySQL Dump and redirect the output to the file in dumpFile variable.
  // exec(
  //   `mysqldump -u ${process.env.DB_USERNAME} -p ${process.env.DB_PASSWORD} -h ${process.env.DB_HOST} --compact ${process.env.DB_DATABASE} > ${dumpFile}`,
  //   (err, stdout, stderr) => {
  //     if (err) {
  //       console.error(`exec error:`, err);
  //       console.log("stderr: ", stderr);

  //       return res.status(500).json(err);
  //     }

  //     return res.status(200).send(stdout);
  // console.log(
  //   `Now, importing data to the ${process.env.DB_DATABASE} database`
  // );

  // Import the database.
  // exec(
  //   `mysql -u${process.env.DB_USERNAME} -p${process.env.DB_PASSWORD} -h${process.env.DB_HOST} ${process.env.DB_DATABASE} < ${dumpFile}`,
  //   (err, stdout, stderr) => {
  //     if (err) {
  //       console.error(`exec error: ${err}`);
  //       return;
  //     }

  //     console.log(`The import has finished.`);
  //   }
  // );
  // }
  // );

  // exec(
  //   `mysqldump -u ${process.env.DB_USERNAME} -p ${process.env.DB_PASSWORD} --single-transaction --quick ${process.env.DB_DATABASE} > ${dumpFile}`,
  //   (error, stdout, stderr) => {
  //     if (error) {
  //       console.log(`error: ${error.message}`);
  //       return res.status(500).json(error);
  //     }
  //     if (stderr) {
  //       console.log(`stderr: ${stderr}`);
  //       return res.status(500).json(stderr);
  //     }
  //     console.log(`stdout: ${stdout}`);
  //     return res.json(stdout)
  //   }
  // );

  const dbUser = process.env.DB_USERNAME;
  const dbPassword = process.env.DB_PASSWORD;
  const dbName = process.env.DB_DATABASE;

  const backupCommand = `mysqldump -u${dbUser} -p${dbPassword} ${dbName} > ${dumpFile}`;

  exec(backupCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Error output: ${stderr}`);
      return;
    }
    console.log(`Success: ${stdout}`);
  });

  // return res.send("Test");
};
