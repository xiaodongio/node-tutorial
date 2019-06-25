const path = require('path');
const fs = require('fs');
const configPath = path.join(__dirname, 'config.json');



module.exports = async () => {
  const mongoConfig = {
    mongoDBName: 'jest',
    mongoUri: 'mongodb://localhost/mydatabase'
  };

  // Write global config to disk because all tests run in different contexts.
  fs.writeFileSync(configPath, JSON.stringify(mongoConfig));
  console.log('Config is written');

  // Set reference to mongod in order to close the server during teardown.
  // global.__MONGOD__ = mongod;
  process.env.MONGO_URL = mongoConfig.mongoUri;
};