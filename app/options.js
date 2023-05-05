const path = require('path');
module.exports =  {

  config: path.join(__dirname, 'app/config.json'),
  'migrations-path': path.join(__dirname, 'app/migrations'),
  'seeders-path': path.join(__dirname, 'app/seeders'),
  'models-path': path.join(__dirname, 'app/models'),
}