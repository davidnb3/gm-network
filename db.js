const Pool  = require('pg').Pool;
require('dotenv').config();

const devConfig = {
  user: process.env.PG_User,
  host: process.env.PG_Host,
  database: process.env.PG_Database,
  password: process.env.PG_Password,
  port: process.env.PG_Port,
}

const proConfig = {
  connectionString: process.env.DATABASE_URL
};

const pool = new Pool(process.env.NODE_ENV === 'production' ? proConfig : devConfig);

module.exports = pool;