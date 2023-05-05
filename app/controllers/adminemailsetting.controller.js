const { Op } = require("sequelize");
var nodemailer = require("nodemailer");
const db = require("../models");
const Admin_Email_Setting = db.admin_email_settings;

// Create and Save a new Admin_Email_Setting
exports.sendmail = (req, res) => {
  // Validate request
  // console.log("========================");
  // console.log("RES: ", res);
  // console.log("========================");

  if (!req.body.email && !req.body.password && !req.body.sender && !req.body.incoming_mail && !req.body.outgoing_mail && !req.body.s_imap_port && !req.body.s_pop3_port && !req.body.s_smtp_port && !req.body.n_imap_port && !req.body.n_pop3_port && !req.body.n_smtp_port && !req.body.webmail_url && !req.body.technical_information) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const transporter = nodemailer.createTransport({
    port: req.body.s_smtp_port, // true for 465, false for other ports
    host: req.body.outgoing_mail,
    auth: {
      user: req.body.email,
      pass: req.body.password,
    },
    secure: true,
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mailData = {
    from: req.body.email, // sender address
    to: req.body.testmail, // list of receivers
    subject: req.body.technical_information,
    html: req.body.information,
  };

  // Save Mail in the database
  transporter.sendMail(mailData, function (err, info) {
    if (err) {
      console.log("ERROR: ", err);
      res.status(400).send({
        message: err,
      });
      return;
    } else {
      res.status(200).send({
        message: "Your email successfully sent!",
      });
      return;
    }
  });
};

// Create and Save a new Admin_Email_Setting
exports.create = (req, res) => {
  // Validate request
  // console.log("========================");
  // console.log("RES: ", res);
  // console.log("========================");

  if (!req.body.email && !req.body.password && !req.body.sender && !req.body.incoming_mail && !req.body.outgoing_mail && !req.body.s_imap_port && !req.body.s_pop3_port && !req.body.s_smtp_port && !req.body.n_imap_port && !req.body.n_pop3_port && !req.body.n_smtp_port && !req.body.webmail_url && !req.body.technical_information) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Save Admin_Email_Setting in the database
  Admin_Email_Setting.create(req.body).then((data) => {
    res.status(200).send({
      message: "You have successfully added your email setting!",
    });
  }).catch((err) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while saving the admin email setting.",
    });
  });
};

// Update the Admin_Email_Setting
exports.update = (req, res) => {
  // Validate request
  // console.log("========================");
  // console.log("RES: ", res);
  // console.log("========================");
  const id = req.params.id;

  if (!req.body.email && !req.body.password && !req.body.sender && !req.body.incoming_mail && !req.body.outgoing_mail && !req.body.s_imap_port && !req.body.s_pop3_port && !req.body.s_smtp_port && !req.body.n_imap_port && !req.body.n_pop3_port && !req.body.n_smtp_port && !req.body.webmail_url && !req.body.technical_information) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Save Admin_Email_Setting in the database
  Admin_Email_Setting.update(req.body, {where: {id: id} }).then(num => {
    if (num == 1) {
      res.send({
        title: 'Success!',
        message: 'Email Setting was updated successfully.'
      });
    } else {
      res.send({
        title: "Error!",
        message: `Cannot update email setting with id=${id}. Maybe User was not found or req.body is empty!`
      });
    }
  }).catch((err) => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while saving the admin email setting.",
    });
  });
};

// Retrieve all Mails from the database.
exports.findAll = (req, res) => {
  

  Admin_Email_Setting.findAll().then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving tags.",
    });
  });
};

// Find a single Admin_Email_Setting with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Admin_Email_Setting.findByPk(id).then((data) => {
    res.send(data);
  }).catch((err) => {
    res.status(500).send({
      message: "Error retrieving Admin_Email_Setting with id=" + id,
    });
  });
};
