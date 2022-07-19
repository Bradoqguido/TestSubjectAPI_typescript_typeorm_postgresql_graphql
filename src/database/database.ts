const Pool = require('pg').Pool;
const pgConn = new Pool({
  user: 'postgresql',
  host: 'localhost',
  database: 'api',
  password: 'postgresql',
  port: 5432,
});