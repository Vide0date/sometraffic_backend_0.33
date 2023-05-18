const Group = require("../controllers/group.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/groups/all", Group.findAll);

  app.get("/api/groups/delete/:id", Group.delete);

  app.get('/api/groups/identifier/:id', Group.findByUniqueIdentifier);

  app.get("/api/groups/gettrackingurl", Group.getTrackingURl);

  app.get('/api/groups/:id', Group.findOne);

  app.post("/api/groups/create", Group.create);

  app.put("/api/groups/update/:id", Group.update);
};
