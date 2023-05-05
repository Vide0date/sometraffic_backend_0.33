require("dotenv").config();

const { Op } = require("sequelize");
const requestIp = require("request-ip");
const db = require("../models");
const Redirect = db.redirects;
const Click_Data = db.click_datas;

// Parse Language object
const parseLanguage = require("accept-language-parser");

// Used for device name extract name
const UAParser = require("ua-parser-js");
const parser = new UAParser();

// used to lookup location through ip address
// const geoip = require('geoip-lite');

const ipLocator = require("ip-locator");

// Create and Save a new Redirect
exports.create = async (req, res) => {
  if (
    !req.body.tracking_url &&
    !req.body.destination_url &&
    !req.body.task_id
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  const checkedURl = await Redirect.findAll({
    where: { tracking_url: req.body.tracking_url },
  });
  // check the tracking url in the database if is that url exit in here generate new url for that.
  if (checkedURl.length) {
    console.log("Checked url: ", checkedURl, req.body.tracking_url);
    Redirect.findAll({
      limit: 1,
      order: [["createdAt", "DESC"]],
    })
      .then(async (entries) => {
        let newTrURL = process.env.BASE_TRACKING_URL;
        if (entries.length > 0) {
          let queryParams = req.body.tracking_url.split("?");
          console.log("URL: ", queryParams);
          let arrayUrl = entries[0].tracking_url.split("/");
          let trackingID = await createTrackingURL(
            arrayUrl[arrayUrl.length - 1]
          );
          newTrURL =
            req.body.tracking_url.split("/").slice(0, 3).join("/") +
            "/" +
            trackingID;

          if (queryParams[1]) {
            newTrURL += `?${queryParams[1]}`;
          }
        }
        let obj = {
          tracking_url: newTrURL,
          destination_url: req.body.destination_url,
          task_id: req.body.task_id,
          seo_title: req.body.seo_title,
          seo_description: req.body.seo_description,
          seo_image_url: req.body.seo_image_url,
        };
        console.log("New url: ", newTrURL, obj);

        Redirect.create(obj)
          .then((data) => {
            res.status(200).send({
              data,
              message: "You have successfully added!",
            });
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "Some error occurred while saving the tracking url.",
            });
          });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error creating tracking URL",
        });
      });
  } else {
    console.log("Create tracking url: ", req.body);
    // let _body = req.body;
    // _body.tracking_url = req.body.tracking_url.split("?")[0];
    // console.log("_body: ", _body);
    Redirect.create(req.body)
      .then((data) => {
        res.status(200).send({
          data,
          message: "You have successfully added!",
        });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while saving the tracking url.",
        });
      });
  }
};

// Update the Redirect
exports.update = (req, res) => {
  const id = req.params.id;
  if (
    !req.body.tracking_url &&
    !req.body.destination_url &&
    !req.body.task_id
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  // Update the Redirect row in the database
  Redirect.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          title: "Success!",
          message: "Tracking URL was updated successfully.",
        });
      } else {
        res.send({
          title: "Error!",
          message: `Cannot update tracking URL with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while saving the tracking url.",
      });
    });
};

// Retrieve all Mails from the database.
exports.findAll = (req, res) => {
  Redirect.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tracking URLS.",
      });
    });
};

async function createTrackingURL(code) {
  let currentCode = code.split(""); // Convert code to an array
  for (let j = currentCode.length - 1; j >= 0; j--) {
    // Loop through each digit from right to left
    if (currentCode[j] === "9") {
      // If digit is 9, change to a
      currentCode[j] = "a";
      break; // Move on to next digit
    } else if (currentCode[j] === "z") {
      // If digit is z, change to 0 and carry over to next digit
      currentCode[j] = "0";
    } else {
      // Otherwise, increment the digit and stop
      currentCode[j] = String.fromCharCode(currentCode[j].charCodeAt(0) + 1);
      break;
    }
  }
  code = currentCode.join(""); // Convert code back to a string
  // console.log('------- code ------ ', code); // Output the code

  return code;
}

exports.getTrackingURl = (req, res) => {
  // get last record of redirects table base
  Redirect.findAll({
    limit: 1,
    order: [["createdAt", "DESC"]],
  })
    .then(async (entries) => {
      let newTrURL = process.env.BASE_TRACKING_URL;
      if (entries.length > 0) {
        const parsedUrl = entries[0].tracking_url.includes("?")
          ? entries[0].tracking_url.split("?")[0]
          : entries[0].tracking_url;
        const arrayUrl = parsedUrl.split("/");
        // createTrackingURL is function to generate new uniqui tracking url
        newTrURL = await createTrackingURL(arrayUrl[arrayUrl.length - 1]);
      }
      // send uniqui new tracking url back
      res.send({ newTrackingURl: newTrURL });
    })
    .catch((err) => {
      console.log("Error tracking url: ", err);
      res.status(500).send({
        message: "Error creating tracking URL",
      });
    });
};

exports.getMeta = async (req, res) => {
  const checkedURl = await Redirect.findAll({
    where: {
      [Op.or]: [
        {
          tracking_url: {
            [Op.like]: `%${req.body.tracking_url}`,
          },
        },
        {
          tracking_url: {
            [Op.like]: `%${req.body.tracking_url}?fbprev=yes`,
          },
        },
      ],

      // tracking_url: {
      //   [Op.like]: `%${req.body.tracking_url}`,
      // },
    },
  });

  console.log("Result: ", checkedURl);
  res.json(checkedURl);
};

// Redirect to destination url
exports.redirect = async (req, res) => {
  console.log("Reached...", req.body.tracking_url);
  const clientIp = req.body.ip || requestIp.getClientIp(req);

  const start = Date.now();
  // getting device name
  const languages = parseLanguage.parse(
    req.body.language ? req.body.language : req.headers["accept-language"]
  );
  const language = languages[0]?.code;

  const userAgent = req.body.user_agent ? req.body.user_agent : req.headers["user-agent"];
  const result = parser.setUA(userAgent).getResult();
  const deviceName =
    (await result.device.type) != undefined ? result.device.type : "PC";

  // getting ip address

  // const ip =
  //   req?.headers["x-forwarded-for"]?.split(",")?.pop() || // From proxy headers, can be spoofed if you don't have a proxy in front of your app, so drop it if your app is naked.
  //   req.connection.remoteAddress ||
  //   req.socket.remoteAddress || // socket is an alias to connection, just delete this line
  //   req.connection.socket.remoteAddress; // no idea where this might be a thing, just delete this line

  // probably add a default at the end here, although there shouldn't be a case when req.connection.remoteAddress is unset.

  const ip = req.body.ip ? req.body.ip : clientIp;
  console.log(`Your IP sddress is ${clientIp}. and body:`, req.body);

  // getting destination url from database
  let destination_url = "";
  const checkedURl = await Redirect.findAll({
    where: {
      tracking_url: {
        [Op.like]: `%${req.body.tracking_url}`,
      },
    },
  });
  console.log("checkedURl: ", checkedURl);

  let click_data_obj = {
    device: deviceName,
    browser: result.browser?.name,
    browser_language: language,
    operating_system: result.os?.name,
    screen_resolution: req?.body?.screen_resolution,
    network_speed: req?.body?.network_speed,
    referrer_url: req?.body?.referrer_url,
    ip_address:
      ip != "::1" ? ip?.split(":")[ip?.split(":").length - 1] : "127.0.0.1",
  };
  if (checkedURl.length > 0) {
    checkedURl.forEach((element) => {
      click_data_obj.tracking_id = element.dataValues.id;
      click_data_obj.task_id = element.dataValues.task_id;
      destination_url = element.dataValues.destination_url;
      click_data_obj.timestamp = new Date();
    });
    console.log("Clickdata: ", click_data_obj);

    saveClickData(click_data_obj);
    res.status(200).send({
      redirect: checkedURl,
      destination_url: destination_url,
      click_data_obj: click_data_obj,
      message: "You have successfully added!",
    });
  } else {
    res.status(500).send({
      message: "Some error occurred while saving the click data.",
    });
  }
};

async function saveClickData(click_data_obj) {
  // finding the location base of ip address '46.177.213.226'
  let trackingIP =
    click_data_obj.ip_address != "127.0.0.1"
      ? click_data_obj.ip_address
      : process.env.TESTING_IP;
  ipLocator.getDomainOrIPDetails(
    trackingIP,
    "json",
    function (err, locationObject) {
      if (locationObject) {
        click_data_obj.city = locationObject.city;
        click_data_obj.ip_lookup_status = locationObject.status;
        click_data_obj.region = locationObject.region;
        click_data_obj.region_name = locationObject.regionName;
        click_data_obj.country = locationObject.country;
        click_data_obj.country_code = locationObject.countryCode;
        click_data_obj.isp = locationObject.isp;
        click_data_obj.zipcode = locationObject.zip;
        click_data_obj.latitude = locationObject.lat;
        click_data_obj.longtitude = locationObject.lon;
        click_data_obj.connection_type = locationObject.org;
      }

      console.log("=== locationObject ===", locationObject);
      // store that clicked information to database
      Click_Data.create(click_data_obj)
        .then((data) => {
          return {
            id: data.id,
            locationObject: locationObject,
            click_data_obj: click_data_obj,
            message: "You have successfully added!",
          };
        })
        .catch((err) => {
          return {
            message:
              err.message || "Some error occurred while saving the click data.",
          };
        });

      if (err) {
        console.log("Get domain/ip details: ", err);
        return {
          message: "Some error getting details from IP address." + click_data_obj.ip_address,
        };
      }
    }
  );
}

async function updateIpData(id, click_data_obj) {
  // finding the location base of ip address '46.177.213.226'
  let trackingIP =
    click_data_obj.ip_address != "127.0.0.1"
      ? click_data_obj.ip_address
      : process.env.TESTING_IP;
  ipLocator.getDomainOrIPDetails(
    trackingIP,
    "json",
    function (err, locationObject) {
      if (locationObject) {
        click_data_obj.city = locationObject.city;
        click_data_obj.ip_lookup_status = locationObject.status;
        click_data_obj.region = locationObject.region;
        click_data_obj.region_name = locationObject.regionName;
        click_data_obj.country = locationObject.country;
        click_data_obj.country_code = locationObject.countryCode;
        click_data_obj.isp = locationObject.isp;
        click_data_obj.zipcode = locationObject.zip;
        click_data_obj.latitude = locationObject.lat;
        click_data_obj.longtitude = locationObject.lon;
        click_data_obj.connection_type = locationObject.org;
      }

      console.log("=== UPDATE locationObject ===", locationObject);
      // store that clicked information to database
      Click_Data.create(click_data_obj)
        .then((data) => {
          return {
            id: data.id,
            locationObject: locationObject,
            click_data_obj: click_data_obj,
            message: "You have successfully added!",
          };
        })
        .catch((err) => {
          return {
            message:
              err.message || "Some error occurred while saving the click data.",
          };
        });

      Click_Data.update(click_data_obj, { where: { id } })
        .then((num) => {
          if (num == 1) {
            res.send({
              title: "Success!",
              message: "Group was updated successfully.",
            });
          } else {
            res.send({
              title: "Error!",
              message: `Cannot update group with id=${id}.`,
            });
          }
        })
        .catch((err) => {
          console.log("Error: ", err);
          res.status(500).send({
            message:
              err.message || "Some error occurred while saving the group.",
          });
        });

      if (err) {
        console.log("Get domain/ip details: ", err);
        return {
          message: err || "Some error occurred while saving the click data.",
        };
      }
    }
  );
}

exports.updateClickData = async (req, res) => {
  const clientIp = requestIp.getClientIp(req);
  // getting device name
  const languages = parseLanguage.parse(req.headers["accept-language"]);
  const language = languages[0]?.code;

  const userAgent = req.headers["user-agent"];
  const result = parser.setUA(userAgent).getResult();
  const deviceName =
    (await result.device.type) != undefined ? result.device.type : "PC";

  const ip = clientIp;

  let click_data_obj = {
    device: deviceName,
    browser: result.browser?.name,
    browser_language: language,
    operating_system: result.os?.name,
    screen_resolution: req?.body?.screen_resolution,
    network_speed: req?.body?.network_speed,
    referrer_url: req?.body?.referrer_url,
    ip_address:
      ip != "::1" ? ip?.split(":")[ip?.split(":").length - 1] : "127.0.0.1",
  };

  updateIpData(req.body.id, click_data_obj);
  res.status(200).send({
    redirect: checkedURl,
    destination_url: destination_url,
    click_data_obj: click_data_obj,
    message: "You have successfully updated!",
  });
};

// Find a single Redirect with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Redirect.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving tracking URL with id=" + id,
      });
    });
};

// Delete a Redirect with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  const item = await Redirect.findByPk(id);

  if (item) {
    await Click_Data.destroy({
      where: { tracking_id: item.id },
    });

    await item.destroy();
    res.send({
      title: "Success!",
      message: "Tracking url deleted successfully.",
    });
  } else {
    res.status(500).send({
      title: "Find Failed!",
      message: "Could not find tracking url with id=" + id,
    });
  }
};
