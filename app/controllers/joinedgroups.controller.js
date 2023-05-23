const { Op } = require("sequelize");
const db = require("../models");
const { Sequelize, DataTypes } = require('sequelize');

const Joined_Group = db.joined_groups;

exports.create = async (req, res) => {

  Joined_Group.create(req.body)
    .then((data) => {
      res.status(200).send({
        message: "You have successfully added an joined group!",
        data,
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).send({
        message: err.message || "Some error occurred while saving the joined group.",
      });
    });
};


exports.findAll = (req, res) => {
    let conditions = {
    order: [["createdAt", "ASC"]],
  };
  const createdAt = Date.now()
  console.log(createdAt);
  const limit = req.query.limit;
  
  if (limit) {
    conditions.limit = parseInt(limit);
  }
  console.log("Conditions joined_ roups: ", conditions);

  let date = new Date();
  const TODAY_START = new Date().setTime(date.getTime() - (24 * 60 * 60 * 1000));
  const NOW = new Date();
  Joined_Group.findAll({
    where: {
      createdAt: { 
        [db.Sequelize.Op.gt]: TODAY_START,
        [db.Sequelize.Op.lt]: NOW
      },
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("err: ", err);
      res.status(500).send({
        message: err.message || "Some error occurred while joined_ roups.",
      });
    });
};

// // Find a single category item with an id
// exports.findByUniqueIdentifier = (req, res) => {
//   const id = req.params.id;
//   Joined_Group.findOne({
//     where: { unique_identifier: id },
//   })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error retrieving joined group item with id=" + id,
//       });
//     });
// };

// exports.findOne = (req, res) => {
//   const id = req.params.id;
//   Joined_Group.findByPk(id)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error retrieving joined group with id=" + id,
//       });
//     });
// };

// exports.update = (req, res) => {
//   const id = req.params.id;
//   if (!req.body.createdBy || !req.body.name) {
//     res.status(400).send({
//       message: "Content can not be empty!",
//     });
//     return;
//   }

//   Joined_Group.update(req.body, { where: { unique_identifier: id }})
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           title: "Success!",
//           message: "Account was updated successfully.",
//         });
//       } else {
//         res.send({
//           title: "Error!",
//           message: `Cannot update joined group with id=${id}.`,
//         });
//       }
//     })
//     .catch((err) => {
//       console.log("Error: ", err);
//       res.status(500).send({
//         message: err.message || "Some error occurred while saving the joined group.",
//       });
//     });
// };

// exports.delete = (req, res) => {
//   const id = parseInt(req.params.id);
//   Joined_Group.findByPk(id)
//     .then((data) => {
//       Joined_Group.destroy({
//         where: { id },
//       })
//         .then((num) => {
//           if (num == 1) {
//             res.send({
//               title: "Success!",
//               message: "Account was deleted successfully.",
//             });
//           } else {
//             res.send({
//               title: "Failed!",
//               message: `Cannot delete joined group!`,
//             });
//           }
//         })
//         .catch((err) => {
//           console.log("Error: ", err);
//           res.status(500).send({
//             title: "Failed!",
//             message: `Could not delete joined group with id=` + id,
//           });
//         });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         title: "Find joined group failed!",
//         message: "Could not find joined group with id=" + id,
//       });
//     });
// };

// async function createTrackingURL(code) {
//   let currentCode = code.split(""); // Convert code to an array
//   for (let j = currentCode.length - 1; j >= 0; j--) {
//     // Loop through each digit from right to left
//     if (currentCode[j] === "9") {
//       // If digit is 9, change to a
//       currentCode[j] = "a";
//       break; // Move on to next digit
//     } else if (currentCode[j] === "z") {
//       // If digit is z, change to 0 and carry over to next digit
//       currentCode[j] = "0";
//     } else {
//       // Otherwise, increment the digit and stop
//       currentCode[j] = String.fromCharCode(currentCode[j].charCodeAt(0) + 1);
//       break;
//     }
//   }
//   code = currentCode.join(""); // Convert code back to a string
//   // console.log('------- code ------ ', code); // Output the code

//   return code;
// }