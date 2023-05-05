const categoryitem = require("../controllers/categoryitem.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/category-items/all", categoryitem.findAll);

  app.get("/api/category-items/gettrackingurl", categoryitem.getTrackingURl);

  app.get('/api/category-items/id/:id', categoryitem.findOne);

  app.get(
    "/api/category-items/identifier/:id",
    categoryitem.findByUniqueIdentifier
  );

  app.get("/api/category-items/delete/:id", categoryitem.delete);

  app.post("/api/category-items/create", categoryitem.create);

  app.put("/api/category-items/update/:id", categoryitem.update);
};
