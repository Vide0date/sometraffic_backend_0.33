require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const moment = require("moment");
const app = express();

// var allowlist = [
//   'http://localhost:3000',
//   'https://sometraffic.com',
//   'https://remotehub.ai',
// ]
// var corsOptionsDelegate = function (req, callback) {
//   var corsOptions
//   console.log('req.header(Origin)', req.header('Origin'));
//   if (allowlist.indexOf(req.header('Origin')) !== -1) {
//     corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
//   } else {
//     corsOptions = { origin: false } // disable CORS for this request
//   }
//   callback(null, corsOptions) // callback expects two parameters: error and options
// }

app.use(
  cors({
    origin: "*",
  })
);
// app.use(express.static("public"));
// app.use(express.static("files"));

app.use(bodyParser.json({ limit: "50mb" }));

app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

// parse requests of content-type - application/json
app.use(express.json({ limit: "50mb" }));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ limit: "50mb", extended: true }));

const db = require("./app/models");
const User_Account = db.users_accounts;
db.sequelize.sync();

// In development, you may need to drop existing tables and re-sync database. Just use force: true as following code:
/*db.sequelize.sync({force: true}).then(()=>{
    console.log("Drop and re-sync db.");
});*/

// simple route
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
});
app.get("/api/users1/all", function (req, res) {
  User_Account.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        title: "Error!",
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
});
app.get("/api/files/:file", (req, res) => {
  const backupDate = moment().startOf("hour").format("YYYY-MM-DD_HH-mm-ss");
  const backupFileName = `backup_${backupDate}.sql`;

  res.download(`./public/${req.params.file}`, backupFileName);
});

require("./app/routes/auth.routes")(app);
require("./app/routes/account.routes")(app);
require("./app/routes/project.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/adminemailsetting.routes")(app);
require("./app/routes/trackingurl.routes")(app);
require("./app/routes/clickdata.routes")(app);
require("./app/routes/categoryitem.routes")(app);
require("./app/routes/informationitem.routes")(app);
require("./app/routes/task.routes")(app);
require("./app/routes/group.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 1212;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
// app.listen()
// module.exports = app;
