const { Op } = require("sequelize");
const db = require("../models");

const Groups = db.users_groups;

exports.findAll = (req, res) => {
  let where = {};
  let conditions = {
    // include: Category_Item,
    order: [["createdAt", "ASC"]],
    where: {},
  };

  const ProjectId = req.query.ProjectId;
  const limit = req.query.limit;

  if (ProjectId) {
    // conditions.where.category_item_id = parseInt(item_id);
    Object.assign(where, { ProjectId: parseInt(ProjectId) });
  }
  conditions.where = where;

  if (limit) {
    conditions.limit = parseInt(limit);
  }
  console.log("Conditions groups: ", conditions);

  Groups.findAll(conditions)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log("err: ", err);
      res.status(500).send({
        message: err.message || "Some error occurred while groups.",
      });
    });
};

exports.create = async (req, res) => {
  if (!req.body.ProjectId || !req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  Groups.create(req.body)
    .then((data) => {
      res.status(200).send({
        message: "You have successfully added a group!",
        data,
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).send({
        message: err.message || "Some error occurred while saving the group.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Groups.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving group with id=" + id,
      });
    });
};

exports.findByTaskId = (req, res) => {
  const id = req.params.id;
  Groups.findOne({
    where: { task_id: id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving group with id=" + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  if (!req.body.ProjectId || !req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  Groups.update(req.body, { where: { unique_identifier: id }})
    .then((num) => {
      if (num == 1) {
        res.send({
          title: "Success!",
          message: "Group was updated successfully.",
        });
      } else {
        res.send({
          title: "Error!",
          message: `Cannot update group with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).send({
        message: err.message || "Some error occurred while saving the group.",
      });
    });
};

exports.delete = (req, res) => {
  const id = parseInt(req.params.id);
  Groups.findByPk(id)
    .then((data) => {
      Groups.destroy({
        where: { id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              title: "Success!",
              message: "Group was deleted successfully.",
            });
          } else {
            res.send({
              title: "Failed!",
              message: `Cannot delete group!`,
            });
          }
        })
        .catch((err) => {
          console.log("Error: ", err);
          res.status(500).send({
            title: "Failed!",
            message: `Could not delete group with id=` + id,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        title: "Find group failed!",
        message: "Could not find group with id=" + id,
      });
    });
};

exports.getTrackingURl = (req, res) => {
  Groups.findAll({
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

exports.findByUniqueIdentifier = (req, res) => {
  const id = req.params.id;
  Groups.findOne({
    where: { unique_identifier: id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving project item with id=" + id,
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