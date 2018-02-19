var env = process.env.NODE_ENV || 'development';


if( env === 'development' || env === 'test') {
  console.log(env);
  var config = require('./config.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key) => {
    console.log(key);
    process.env[key] = envConfig[key];
  });
}
