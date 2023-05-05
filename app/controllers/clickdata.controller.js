const { Op } = require("sequelize");
const db = require("../models");
const Redirect = db.redirects;

const Click_Data = db.click_datas;
 

// Retrieve all Mails from the database.
exports.findAll = (req, res) => {


  Click_Data.findAll({
    order: [['createdAt', 'DESC']],
    include:
    [{ model: Redirect}]
  }).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving click datas.",
    });
  });
};
// Retrieve all Mails from the database.
exports.findByTaskID = (req, res) => {
  const id = req.params.id;
  Click_Data.findAll({
    where: { task_id: id },
    order: [['createdAt', 'DESC']],
    include:
    [{ model: Redirect}]
  }).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving click datas.",
    });
  });
};

// Find a single Click_Data with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Click_Data.findByPk(id).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      message: "Error retrieving click data with id=" + id,
    });
  });
};

// Delete a Click_Data with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  // console.log('---- Delete request-----', req.params);
  Click_Data.findByPk(id)
    .then(data => {
      // console.log('---- Finding Click_Data -----', data)
      Click_Data.destroy({
        where: { id: id }
      }).then(num => {
        if (num == 1) {
          res.send({
            title: 'Success!',
            message: 'Click data was deleted successfully.'
          })
        } else {
          res.send({
            title: "Faild!",
            message: `Cannot delete with id=${id}. Maybe ${id} was not found!`
          });
        }
      }).catch(err => {
        res.status(500).send({
          title: "Faild!",
          message: `Could not delete with id=` + id
        });
      });

    }).catch(err => {
      res.status(500).send({
        title: "Find Faild!",
        message: "Could not find Click_Data with id=" + id
      });
    });

};
