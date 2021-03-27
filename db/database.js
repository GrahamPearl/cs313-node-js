require('dotenv').config();

const {
  response
} = require('express');
const {
  Pool,
  Client
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
  connectionTimeoutMillis: 0,
  idleTimeoutMillis: 0,
  max: 20,
  ssl: {
    rejectUnauthorized: false
  }
});

async function insert(sql, request, err, response) {
  try {
    console.log("Performing Insert - ASYNC");
    await pool.connect()
    await pool.query("BEGIN")
    await pool.query(sql)
    await pool.query("COMMIT")
  } catch (ex) {
    console.log('Error - ${ex} occurred')
    await pool.query("ROLLBACK")
  } finally {}
}

async function update(sql, request, err, response) {
  try {
    console.log("Performing Update - ASYNC");
    await pool.connect()
    await pool.query("BEGIN")
    await pool.query(sql)
    await pool.query("COMMIT")
  } catch (ex) {
    console.log('Error - ${ex} occurred')
    await pool.query("ROLLBACK")
  } finally {}
}

async function search(sql, request, err, response) {
  try {
    console.log("Performing Search - ASYNC");
    await pool.connect()
    let result = await pool.query(sql)
    //console.table(result.rows)
    return result.rows
  } catch (ex) {
    console.log('Error - ${ex} occurred')
    return []
  }
}

const searchWithPromise = (sql, request, err, response) => {
  console.log("Performing Search");

  pool.connect()
    .then(() => console.log("Connected to database"))
    .then(() => pool.query(sql)
      .then(result => console.table(result.rows))
      .catch(e => console.log(e)));
};

const searchWithResponse = (sql, request, err, response) => {
  console.log("Performing Search");
  pool.query(sql, function (err, result) {
    if (err) throw err;
    else {
      response.send(result.rows)
    }
  });
};

class Database extends Object {
  static find = searchWithResponse;

  search(sql, req, err, response) {
    return Database.find(sql, req, err, response)    
  }
}
/*
 */

module.exports = Database;