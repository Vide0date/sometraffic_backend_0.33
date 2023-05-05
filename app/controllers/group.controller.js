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

  const user_id = req.query.userid;
  const item_id = req.query.itemid;
  const status = req.query.status;
  const limit = req.query.limit;

  if (status) {
    // where.status = status;
    Object.assign(where, { status });
  }
  if (user_id) {
    // conditions.where.category_item_id = parseInt(item_id);
    Object.assign(where, { user_id: parseInt(user_id) });
  }
  if (item_id) {
    // conditions.where.category_item_id = parseInt(item_id);
    Object.assign(where, { category_item_id: parseInt(item_id) });
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
  if (!req.body.user_id || !req.body.name) {
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
  if (!req.body.user_id || !req.body.name) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  Groups.update(req.body, { where: { id } })
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
