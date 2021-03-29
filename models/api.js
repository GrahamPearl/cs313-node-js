const Database = require('../models/database.js')
const db = new Database();
const fs = require("fs");

class API extends Object {

  static async select_all_patrons(request, response) {
    const paramSQL = [];
    let dataDB = await db.search("SELECT * FROM Patrons;", paramSQL, null, response, response)
    let params = {
      data: dataDB
    }
    response.json(params);
    /*fs.writeFile("data/data.json", JSON.stringify(params.data), err => {    
      if (err) throw err;
      console.log("Done writing"); // Success
    });
    */    
  }

  static async select_all_patrons_JSON(request, response) {
    const paramSQL = [];
    let params = {
      data: await db.search("SELECT * FROM Patrons;", paramSQL, null, response, response)
    }
    response.json(params);
  }

  static async select_patron_by_id(request, response) {
    const id = request.query.id;
    const paramSQL = [id];
    const dataDB = await db.search('SELECT * FROM Patrons WHERE id=$1::int;', paramSQL, null, response, response);

    let params = {
      data: dataDB
    }
    response.json(params);
  }

  static async select_patron_by_last(request, response) {
    const findBy = request.query.name_last;
    const paramSQL = [findBy];
    const dataDB = await db.search('SELECT * FROM Patrons WHERE last like $1;', paramSQL, null, response, response);

    let params = {
      data: dataDB
    }
    response.json(params);
  }

  static async select_patron_by_first(request, response) {
    const findBy = request.query.name_first;
    const paramSQL = [findBy];
    const dataDB = await db.search('SELECT * FROM Patrons WHERE first like $1;', paramSQL, null, response, response);

    let params = {
      data: dataDB
    }
    response.json(params);
  }

  static async insert_patron(request, response) {
    const last = request.query.name_last;
    const first = request.query.name_first;
    const paramSQL = [last, first];
    const dataDB = await db.insert('INSERT INTO patrons(last,first) VALUES($1,$2);', paramSQL, null, response, response);

    let params = {
      data: dataDB
    }
    response.json(params);
  }
}

module.exports = API