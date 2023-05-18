const Account = require("../controllers/account.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/accounts/all", Account.findAll);

  app.get("/api/accounts/delete/:id", Account.delete);

  app.get("/api/accounts/gettrackingurl", Account.getTrackingURl);

   app.get('/api/accounts/identifier/:id', Account.findByUniqueIdentifier);

  app.get('/api/accounts/:id', Account.findOne);

  app.post("/api/accounts/create", Account.create);

  app.put("/api/accounts/update/:id", Account.update);
};
