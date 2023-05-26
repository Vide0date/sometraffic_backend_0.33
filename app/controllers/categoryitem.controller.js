const { Op } = require("sequelize");
const db = require("../models");

const Category_Item = db.category_items;
const Information_Item = db.information_items;
const Task = db.tasks;
const Users_Groups = db.users_groups;
const Projects = db.projects;

exports.findAll = (req, res) => {
  let conditions = {}
  const url = req.query.url;
  const limit = req.query.limit;
  const accountId = req.query.accountId;

  if (url) {
    conditions.url_1_link = url;
  }
  if (limit) {
    conditions.limit = limit;
  }
  
  console.log("Conditions: ", conditions);
  let groupConditions = {
    // include: Category_Item,
    order: [["createdAt", "ASC"]],
    where: {},
  };
  let where = {};
  
  Projects.findAll({
    where: {
      AccountId: accountId
    }
  }).then((data) => {
    console.log('projects');
    const projectIds = data.map(project => project.id)
    console.log(projectIds);

  Object.assign(where, { ProjectId: projectIds });
  groupConditions.where = where;

  Users_Groups.findAll(groupConditions)
    .then((data) => {
      console.log('groups');
      const groupIds = data.map(group => group.id)
      console.log(groupIds);
      conditions.cat_group = groupIds
      Category_Item.findAll({
        include: Users_Groups,
        where: conditions,
        order: [["createdAt", "DESC"]],
      })
        .then((data) => {
          res.send(data);
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
  }).catch((err) => {
    console.log("err: ", err);      
  });
  
};

exports.getTrackingURl = (req, res) => {
  Category_Item.findAll({
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
      console.log("Error: ", error);
      res.status(500).send({
        message: "Error creating tracking URL",
      });
    });
};

exports.create = async (req, res) => {
  if (
    !req.body.category &&
    !req.body.item_title &&
    !req.body.username &&
    !req.body.unique_identifier
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  Category_Item.create(req.body)
    .then((data) => {
      res.status(200).send({
        message: "You have successfully added category item!",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while saving the category item.",
      });
    });
};

// Find a single category item with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Category_Item.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving category item with id=" + id,
      });
    });
};

// Find a single category item with an id
exports.findByUniqueIdentifier = (req, res) => {
  const id = req.params.id;
  Category_Item.findOne({
    where: { unique_identifier: id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving category item with id=" + id,
      });
    });
};

// Update the Redirect
exports.update = (req, res) => {
  const id = req.params.id;
  if (
    !req.body.category ||
    !req.body.item_title ||
    !req.body.username ||
    !req.body.unique_identifier
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Update the category item row in the database
  Category_Item.update(req.body, { where: { unique_identifier: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          title: "Success!",
          message: "Category item was updated successfully.",
        });
      } else {
        res.send({
          title: "Error!",
          message: `Cannot update category item with item id=${id}.`,
        });
      }
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).send({
        message:
          err.message || "Some error occurred while saving the category item.",
      });
    });
};

// Delete a category item with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;
  const item = await Category_Item.findByPk(id);

  if (item) {
    await Information_Item.destroy({
      where: { category_item_id: item.id },
    });
    await Task.destroy({
      where: { category_item_id: item.id },
    });

    await item.destroy();

    res.send({
      title: "Success!",
      message: "Category item was deleted successfully.",
    });
  } else {
    res.status(500).send({
      title: "Failed!",
      message: `Could not delete category item with id=` + id,
    });
  }
  // Category_Item.findByPk(id)
  //   .then((data) => {
  //     Category_Item.destroy({
  //       where: { id: id },
  //     })
  //       .then((num) => {
  //         if (num == 1) {
  //           res.send({
  //             title: "Success!",
  //             message: "Category item was deleted successfully.",
  //           });
  //         } else {
  //           res.send({
  //             title: "Faild!",
  //             message: `Cannot delete category item!`,
  //           });
  //         }
  //       })
  //       .catch((err) => {
  //         console.log("Error: ", err);
  //         res.status(500).send({
  //           title: "Faild!",
  //           message: `Could not delete category item with id=` + id,
  //         });
  //       });
  //   })
  //   .catch((err) => {
  //     res.status(500).send({
  //       title: "Find Faild!",
  //       message: "Could not find category item with id=" + id,
  //     });
  //   });
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
