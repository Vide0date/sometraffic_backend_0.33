const { authJwt } = require("../middleware");
const users = require("../controllers/user.controller.js");

module.exports = function(app) {
  
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers", 
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get('/api/users/all', users.findAll);

  app.get('/api/users/download-db', users.downloadDatabase);

  app.post('/api/users/create', users.create);

  app.put('/api/users/update/:id', users.update);

  app.get('/api/users/:id', users.findOne);

  app.get('/api/users/delete/:id', users.delete);

  // app.get('/api/users/:id', [authJwt.verifyToken], users.findOne);
  // app.put('/api/users/:id', [authJwt.verifyToken], users.update);
  
  // Deactive Account 
  
  // app.post('/api/users/delete-account/', [authJwt.verifyToken], users.delete);
};
  