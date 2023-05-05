module.exports = app => {
    const mail = require("../controllers/adminemailsetting.controller.js");

    var router = require("express").Router();

    // Create a new Mail
    router.post("/create", mail.create);
    router.put("/update/:id", mail.update);
    
    router.post("/sendmail", mail.sendmail);

    router.get("/all", mail.findAll);

    router.get("/:id", mail.findOne);

    app.use('/api/mail', router);
  };
