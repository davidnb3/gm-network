const Pool  = require('pg');

const pool = new Pool({
  user: 'david',
  host: 'localhost',
  database: 'gm_network',
  password: 'root',
  port: 5432,
});

module.exports = pool;