const Joined_Group = require("../controllers/joinedgroups.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post("/api/joined-groups/create", Joined_Group.create);

  app.get("/api/joined-groups/all", Joined_Group.findAll);

  // app.get("/api/joined-groups/delete/:id", Joined_Group.delete);

  // app.get("/api/joined-groups/gettrackingurl", Joined_Group.getTrackingURl);

  //  app.get('/api/joined-groups/identifier/:id', Joined_Group.findByUniqueIdentifier);

  // app.get('/api/joined-groups/:id', Joined_Group.findOne);

  // app.put("/api/joined-groups/update/:id", Joined_Group.update);
};
