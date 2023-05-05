const { authJwt } = require("../middleware");
const trackingurl = require("../controllers/trackingurl.controller.js");

module.exports = function(app) {
  
//   app.use(function(req, res, next) {
//     res.header(
//       "Access-Control-Allow-Headers", 
//       "x-access-token, Origin, Content-Type, Accept"
//     );
//     next();
//   });

  app.get('/api/trackingurl/all', trackingurl.findAll);
  
  app.get('/api/trackingurl/gettrackingurl/', trackingurl.getTrackingURl);

  app.post('/api/trackingurl/get-meta', trackingurl.getMeta);
  
  app.post('/api/trackingurl/redirect', trackingurl.redirect);

  app.post('/api/trackingurl/create', trackingurl.create);

  app.put('/api/trackingurl/update/:id', trackingurl.update);

  app.get('/api/trackingurl/:id', trackingurl.findOne);

  app.get('/api/trackingurl/delete/:id', trackingurl.delete);

  // app.get('/api/trackingurl/:id', [authJwt.verifyToken], trackingurl.findOne);
  // app.put('/api/trackingurl/:id', [authJwt.verifyToken], trackingurl.update);
  
  // Deactive Account 
  
  // app.post('/api/trackingurl/delete-account/', [authJwt.verifyToken], trackingurl.delete);
};
  