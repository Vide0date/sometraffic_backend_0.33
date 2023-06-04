const Task = require("../controllers/task.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/tasks/all", Task.findAll);
  app.get("/api/tasks/allWithItemId", Task.findAllWithItemId);

  // app.get('/api/tasks/:id', Task.findOne);

  app.get(
    "/api/tasks/gettrackingurl",
    Task.getTrackingURl
  );

  app.get("/api/tasks/identifier/:id", Task.findByTaskId);

  app.get("/api/tasks/delete/:id", Task.delete);

  app.post("/api/tasks/create", Task.create);

  app.put("/api/tasks/update/:id", Task.update);
};
