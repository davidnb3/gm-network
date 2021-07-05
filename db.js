const Pool  = require('pg').Pool;
require('dotenv').config();

// Use this config when running locally
const devConfig = {
  user: process.env.PG_User,
  host: process.env.PG_Host,
  database: process.env.PG_Database,
  password: process.env.PG_Password,
  port: process.env.PG_Port,
}

// Use this config when running in production (Heroku)
const proConfig = {
  connectionString: process.env.DATABASE_URL,
  // Bad idea, but for now it wasn't asked to renew the certificate and use HTTPS
  ssl: {rejectUnauthorized: false}
};

const pool = new Pool(process.env.NODE_ENV === 'production' ? proConfig : devConfig);

module.exports = pool;