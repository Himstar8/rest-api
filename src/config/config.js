export const config = {
  production: {},
  developement: {
    MONGO_URI: 'mongodb://root:root12345@ds023315.mlab.com:23315/rest-api',
    SECRET_KEY: 'A not so secure secret key'
  }
};

export const getConfig = env => config[env] || config.development;
