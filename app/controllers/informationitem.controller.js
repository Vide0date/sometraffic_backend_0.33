const { Op } = require("sequelize");
const db = require("../models");

const Information_Item = db.information_items;
const Category_Item = db.category_items;
const Users_Groups = db.users_groups;

exports.findAllByItemId = async (req, res) => {
  let conditions = {
    include: Category_Item,
    order: [["createdAt", "DESC"]],
  };

  const item_id = req.query.itemid;
  const url = req.query.url;
  const limit = req.query.limit;

  if (url) {
    conditions.where = {
      url_1_link: url,
    };
  }
  if (item_id) {
    conditions.where = {
      category_item_id: parseInt(item_id),
    };
  }

  if (limit) {
    conditions.limit = parseInt(limit);
  }
  console.log("Conditions info item: ", conditions);

  const count = await Information_Item.count(conditions);

  Information_Item.findAll(conditions)
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
};


exports.findAll = async (req, res) => {
  let conditions = {
    include: Category_Item,
    order: [["createdAt", "DESC"]],
  };

  const projectId = req.query.projectId;
  const url = req.query.url;
  const limit = req.query.limit;

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
          const count = await Information_Item.count(conditions);

        Information_Item.findAll(conditions)
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
  Information_Item.findAll({
    limit: 1,
    order: [["createdAt", "DESC"]],
  })
    .then(async (entries) => {
      let newTrURL = process.env.BASE_TRACKING_URL;
      if (entries.length > 0) {
        let identifier = entries[0].item_id;
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
  if (!req.body.item_id || !req.body.category_item_id || !req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  Information_Item.create(req.body)
    .then((data) => {
      res.status(200).send({
        message: "You have successfully added information item!",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while saving the information item.",
      });
    });
};

// Find a single information item with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Information_Item.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving information item with id=" + id,
      });
    });
};

// Find a single information item with an id
exports.findByItemId = (req, res) => {
  const id = req.params.id;
  Information_Item.findOne({
    where: { item_id: id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving information item with item id=" + id,
      });
    });
};

// Update the information item
exports.update = (req, res) => {
  const id = req.params.id;
  if (!req.body.item_id || !req.body.category_item_id || !req.body.username) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Update the information item row in the database
  Information_Item.update(req.body, { where: { item_id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          title: "Success!",
          message: "Information item was updated successfully.",
        });
      } else {
        res.send({
          title: "Error!",
          message: `Cannot update information item with item id=${id}.`,
        });
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while saving the information item.",
      });
    });
};

// Delete a information item with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Information_Item.findByPk(id)
    .then((data) => {
      Information_Item.destroy({
        where: { id },
      })
        .then((num) => {
          if (num == 1) {
            res.send({
              title: "Success!",
              message: "Information item was deleted successfully.",
            });
          } else {
            res.send({
              title: "Failed!",
              message: `Cannot delete information item!`,
            });
          }
        })
        .catch((err) => {
          res.status(500).send({
            title: "Faild!",
            message: `Could not delete information item with id=` + id,
          });
        });
    })
    .catch((err) => {
      res.status(500).send({
        title: "Find Faild!",
        message: "Could not find information item with id=" + id,
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
