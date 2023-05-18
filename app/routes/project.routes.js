const Project = require("../controllers/project.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/projects/all", Project.findAll);

  app.get('/api/projects/identifier/:id', Project.findByUniqueIdentifier);

  app.get("/api/projects/delete/:id", Project.delete);

  // app.get('/api/projects/:id', Project.findOne);

  app.get("/api/projects/gettrackingurl", Project.getTrackingURl);

  app.post("/api/projects/create", Project.create);

  app.put("/api/projects/update/:id", Project.update);
};
