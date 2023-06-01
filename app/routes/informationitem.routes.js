const Informationitem = require("../controllers/informationitem.controller.js");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/information-items/all", Informationitem.findAll);
  app.get("/api/information-items/allByItemId", Informationitem.findAllByItemId);

  // app.get('/api/information-items/:id', informationitem.findOne);

  app.get(
    "/api/information-items/gettrackingurl",
    Informationitem.getTrackingURl
  );

  app.get("/api/information-items/identifier/:id", Informationitem.findByItemId);

  app.get("/api/information-items/delete/:id", Informationitem.delete);

  app.post("/api/information-items/create", Informationitem.create);

  app.put("/api/information-items/update/:id", Informationitem.update);
};
