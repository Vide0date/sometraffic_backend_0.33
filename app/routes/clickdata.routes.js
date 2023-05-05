const { authJwt } = require("../middleware");
const clickdata = require("../controllers/clickdata.controller.js");

module.exports = function(app) {
  
//   app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers", 
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

  app.get('/api/clickdata/all', clickdata.findAll);

  app.get('/api/clickdata/:id', clickdata.findOne);
  app.get('/api/clickdata/bytaskid/:id', clickdata.findByTaskID);

  app.get('/api/clickdata/delete/:id', clickdata.delete);

  // app.get('/api/clickdata/:id', [authJwt.verifyToken], clickdata.findOne);
  // app.put('/api/clickdata/:id', [authJwt.verifyToken], clickdata.update);
  
  // Deactive Account 
  
  // app.post('/api/clickdata/delete-account/', [authJwt.verifyToken], clickdata.delete);
};
  