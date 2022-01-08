export const loadEnv = (relativePath: string = '/../.env') => {
  if (process.env.NODE_ENV === 'production') {
    console.log('I am in prod mode mate')
    require('dotenv').config();
  } else {
    console.log('dev mode baby');
    const path = __dirname + relativePath;
    console.log('env path', path);
    const result = require('dotenv').config({
      path,
    });
    if (result.error) {
      throw result.error;
    }
  }
};
