require('dotenv').config();

const {
  Pool
} = require('pg')
const uriLocal = 'postgres://api_user:password@localhost:5432/books_api';

var URI = '';
if (process.env._.indexOf("heroku") === -1) {
  URI = uriLocal;
} else {
  URI = process.env.DATABASE_URL
}

const pool = new Pool({
  connectionString: URI,
  ssl: {
    rejectUnauthorized: false
  }
});

const search = (sql, request, err, response) => {
  console.log("Performing Search");
  pool.query(sql, function (err, result) {
    if (err) throw err;
    else {
      response.send(result.rows)
    }
  });
};

class Database extends Object {
  static find = search;

  search(sql, req, err, result) {
    Database.find(sql, req, err, result);
  }  
}
/*
 */

module.exports = Database;