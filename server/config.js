const config = {
  dburl: process.env.DB_URL,
  dbhost: process.env.DB_HOST,
  dbuser: process.env.DB_USER,
  dbpassword: process.env.DB_PASSWORD,
  dbport: process.env.DB_PORT,
  dbname: process.env.DB_NAME,
};

console.log(config)

module.exports = config;
