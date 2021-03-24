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

const search = (sql, params, err, result) =>
{
  console.log("Performing Search");
  pool.query(sql, params, function(err, result) {		
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}
		
		console.log("Found result: " + JSON.stringify(result.rows));
		callback(null, result.rows);
	});
};

class Database extends Object {
  static find = search;  

  search(sql, params, err, result) {
    Database.find(sql, params, err, result);
  }
}
/*
*/

module.exports = Database;