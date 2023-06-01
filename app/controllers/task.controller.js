const { Op } = require("sequelize");
const db = require("../models");

const Task = db.tasks;
const Category_Item = db.category_items;
const Users_Groups = db.users_groups;


exports.findAll = async (req, res) => {
  let conditions = {
    include: Category_Item,
    order: [["createdAt", "DESC"]],
  };

  const projectId = req.query.projectId;
  const url = req.query.url;
  const limit = req.query.limit;
  const status = req.query.status;

  if (url) {
    conditions.where = {
      url_1_link: url,
    };
  }

  if (limit) {
    conditions.limit = parseInt(limit);
  }
  console.log("Conditions info item: ", conditions);
  let groupConditions = {
    // include: Category_Item,
    order: [["createdAt", "ASC"]],
    where: {},
  };
  let where = {};
  Object.assign(where, { ProjectId: parseInt(projectId) });
  groupConditions.where = where;
  Users_Groups.findAll(groupConditions)
    .then((data) => {
      console.log('groups');
      const groupIds = data.map(group => group.id)
      console.log(groupIds);
      // catconditions.cat_group = groupIds
      Category_Item.findAll({
        include: Users_Groups,
        where: {
          cat_group : groupIds
        },
        order: [["createdAt", "DESC"]],
      })
        .then(async (data) => {
          const catIds = data.map(cat => cat.id)
          conditions.where = {
            category_item_id: catIds,
          };
          if (status) {
            // where.status = status;
            conditions.where.status = status
          }
          const count = await Task.count(conditions);

        Task.findAll(conditions)
          .then((data) => {
            res.send({ data, count });
          })
          .catch((err) => {
            console.log("err: ", err);
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while retrieving information items.",
            });
          });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving category items.",
          });
        });
    })
    .catch((err) => {
      console.log("err: ", err);      
    });
};

exports.getTrackingURl = (req, res) => {
  Task.findAll({
    limit: 1,
    order: [["createdAt", "DESC"]],
  })
    .then(async (entries) => {
      let newTrURL = process.env.BASE_TRACKING_URL;
      if (entries.length > 0) {
        let identifier = entries[0].task_id;
        newTrURL = await createTrackingURL(identifier);
      }
      res.send({ newTrackingURl: newTrURL });
    })
    .catch((err) => {
      console.log("err: ", err);
      res.status(500).send({
        message: "Error creating tracking URL",
      });
    });
};

exports.create = async (req, res) => {
  if (!req.body.task_id || !req.body.category_item_id || !req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  Task.create(req.body)
    .then((data) => {
      res.status(200).send({
        message: "You have successfully added task!",
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while saving the task.",
      });
    });
};

// Find a single task with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Task.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving task with id=" + id,
      });
    });
};

// Find a single task with an id
exports.findByTaskId = (req, res) => {
  const id = req.params.id;
  Task.findOne({
    where: { task_id: id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving task with task id=" + id,
      });
    });
};

// Update the task
exports.update = (req, res) => {
  const id = req.params.id;
  if (!req.body.task_id || !req.body.category_item_id || !req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Update the task row in the database
  Task.update(req.body, { where: { task_id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          title: "Success!",
          message: "Task was updated successfully.",
        });
      } else {
        res.send({
          title: "Error!",
          message: `Cannot update task with task id=${id}.`,
        });
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).send({
        message: err.message || "Some error occurred while saving the task.",
      });
    });
};

// Delete a task with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Task.findByPk(id)
    .then((data) => {
      Task.destroy({
        where: { id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              title: "Success!",
              message: "Task was deleted successfully.",
            });
          } else {
            res.send({
              title: "Failed!",
              message: `Cannot delete task!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            title: "Faild!",
            message: `Could not delete task with id=` + id,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        title: "Find Faild!",
        message: "Could not find task with id=" + id,
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
