'use strict';

require('dotenv').config();
var $ = require("jquery");
const fs = require('fs');
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

async function insert(sql, params, request, err, response) {
  try {
    console.log("Performing Insert - ASYNC");
    await pool.connect()
    await pool.query("BEGIN")
    await pool.query(sql, params)
    await pool.query("COMMIT")
  } catch (ex) {
    console.error('Error occurred - ' + ex.stack)
    await pool.query("ROLLBACK")
  } finally {}
}

async function update(sql, params, request, err, response) {
  try {
    console.log("Performing Update - ASYNC");
    await pool.connect()
    await pool.query("BEGIN")
    await pool.query(sql, params)
    await pool.query("COMMIT")
  } catch (ex) {
    console.error('Error occurred - ' + ex.stack)
    await pool.query("ROLLBACK")
  } finally {}
}

async function search(sql, params, request, err, response) {
  try {
    console.log("Performing Search - ASYNC");
    console.log("SQL=" + sql);
    await pool.connect()
    let result = await pool.query(sql, params)
    return result.rows
  } catch (ex) {
    console.error('Error occurred - ' + ex.stack)
    return []
  }
}

async function remove(sql, params, request, err, response) {
  try {
    console.log("Performing Insert - ASYNC");
    await pool.connect()
    await pool.query("BEGIN")
    await pool.query(sql, params)
    await pool.query("COMMIT")
  } catch (ex) {
    console.error('Error occurred - ' + ex.stack)
    await pool.query("ROLLBACK")
  } finally {}
}

const searchWithPromise = (sql, params, request, err, response) => {
  console.log("Performing Search");

  pool.connect()
    .then(() => console.log("Connected to database"))
    .then(() => pool.query(sql, params)
      .then(result => console.table(result.rows))
      .catch(e => console.error('Error occurred - ' + ex)));
};

const searchWithResponse = (sql, params, request, err, response) => {
  console.log("Performing Search");
  pool.query(sql, params, function (err, result) {
    if (err) throw err;
    else {
      response.send(result.rows)
    }
  });
};

const writeJSON = (filename, data) => {
  fs.writeFile(filename, JSON.stringify(data, null, 2),
    (err) => {
      if (err) throw err;
      console.log('Data written to file');
    });
}

class Database extends Object {
  static find = search;
  static add1 = insert;
  static del1 = remove;
  static edit = update;
  static save = writeJSON;

  search(sql, params, req, err, response) {
    return Database.find(sql, params, req, err, response)
  }

  insert(sql, params, req, err, response) {
    return Database.add1(sql, params, req, err, response)
  }

  update(sql, params, req, err, response) {
    return Database.edit(sql, params, req, err, response)
  }

  delete(sql, params, req, err, response) {
    return Database.del1(sql, params, req, err, response)
  }

  save(filename, data) {
    return Database.save(filename, data)
  }

}
/*
 */

module.exports = Database;