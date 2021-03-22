require('dotenv').config();

const {
  Pool
} = require('pg')
const db_url = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: db_url
});

function searchBooks(filter, callback) {
  var sql = "";
  var params = [filter];
  pool.query(sql, params, function (err, db_result) {
    if (err) {
      throw err;
    } else {
      var result = {
        success: true,
        list: db_result.rows
      };
      callback(null, result);
    }
  });
}

module.exports = {
  query: (text, params) => pool.query(text, params),
}