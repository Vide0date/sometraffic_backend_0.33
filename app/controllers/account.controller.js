const { Op } = require("sequelize");
const db = require("../models");

const Accounts = db.accounts;

exports.create = async (req, res) => {
  if (!req.body.createdBy || !req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  Accounts.create(req.body)
    .then((data) => {
      res.status(200).send({
        message: "You have successfully added an account!",
        data,
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).send({
        message: err.message || "Some error occurred while saving the account.",
      });
    });
};

exports.getTrackingURl = (req, res) => {
  Accounts.findAll({
    limit: 1,
    order: [["createdAt", "DESC"]],
  })
    .then(async (entries) => {
      let newTrURL = process.env.BASE_TRACKING_URL;
      if (entries.length > 0) {
        let identifier = entries[0].unique_identifier;
        newTrURL = await createTrackingURL(identifier);
      }
      res.send({ newTrackingURl: newTrURL });
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).send({
        message: "Error creating tracking URL",
      });
    });
};

exports.findAll = (req, res) => {
    let conditions = {
    order: [["createdAt", "ASC"]],
  };

  const limit = req.query.limit;

  if (limit) {
    conditions.limit = parseInt(limit);
  }
  console.log("Conditions accounts: ", conditions);

  Accounts.findAll(conditions)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("err: ", err);
      res.status(500).send({
        message: err.message || "Some error occurred while accounts.",
      });
    });
};

// Find a single category item with an id
exports.findByUniqueIdentifier = (req, res) => {
  const id = req.params.id;
  Accounts.findOne({
    where: { unique_identifier: id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving account item with id=" + id,
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Accounts.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving account with id=" + id,
      });
    });
};

// exports.findByTaskId = (req, res) => {
//   const id = req.params.id;
//   Accounts.findOne({
//     where: { task_id: id },
//   })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error retrieving account with id=" + id,
//       });
//     });
// };

exports.update = (req, res) => {
  const id = req.params.id;
  if (!req.body.createdBy || !req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  Accounts.update(req.body, { where: { unique_identifier: id }})
    .then((num) => {
      if (num == 1) {
        res.send({
          title: "Success!",
          message: "Account was updated successfully.",
        });
      } else {
        res.send({
          title: "Error!",
          message: `Cannot update account with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).send({
        message: err.message || "Some error occurred while saving the account.",
      });
    });
};

exports.delete = (req, res) => {
  const id = parseInt(req.params.id);
  Accounts.findByPk(id)
    .then((data) => {
      Accounts.destroy({
        where: { id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              title: "Success!",
              message: "Account was deleted successfully.",
            });
          } else {
            res.send({
              title: "Failed!",
              message: `Cannot delete account!`,
            });
          }
        })
        .catch((err) => {
          console.log("Error: ", err);
          res.status(500).send({
            title: "Failed!",
            message: `Could not delete account with id=` + id,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        title: "Find account failed!",
        message: "Could not find account with id=" + id,
      });
    });
};

async function createTrackingURL(code) {
  let currentCode = code.split(""); // Convert code to an array
  for (let j = currentCode.length - 1; j >= 0; j--) {
    // Loop through each digit from right to left
    if (currentCode[j] === "9") {
      // If digit is 9, change to a
      currentCode[j] = "a";
      break; // Move on to next digit
    } else if (currentCode[j] === "z") {
      // If digit is z, change to 0 and carry over to next digit
      currentCode[j] = "0";
    } else {
      // Otherwise, increment the digit and stop
      currentCode[j] = String.fromCharCode(currentCode[j].charCodeAt(0) + 1);
      break;
    }
  }
  code = currentCode.join(""); // Convert code back to a string
  // console.log('------- code ------ ', code); // Output the code

  return code;
}