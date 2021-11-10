const { Pool } = require('pg');

const pool = new Pool({
  connectionString: `postgres://xhbuwbzf:uZ3J63X-KzPV6EZckyG6jntKlJF4kk23@fanny.db.elephantsql.com/xhbuwbzf`,
});



module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    // console.log(pool.query(text, params, callback));
    return pool.query(text, params, callback);
  },
};
