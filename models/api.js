const Database = require('../models/database.js')
const db = new Database();
const fs = require("fs");

class API extends Object {

  static async select_all_patrons(request, response) {
    const paramSQL = [];
    let dataDB = await db.search("SELECT * FROM Patrons;", paramSQL, null, response, response)
    let params = {
      dataDB
    }
    // test later as may be needed: see [ https://stackoverflow.com/questions/19696240/proper-way-to-return-json-using-node-or-express ]
    // response.setHeader('Content-Type', 'application/json')
    response.json(params);
  }

  static async select_all_patrons_JSON(request, response) {
    const paramSQL = [];
    let params = {
      data: await db.search("SELECT * FROM Patrons;", paramSQL, null, response, response)
    }

    fs.writeFile("data/data.json", JSON.stringify(params.data), err => {
      if (err) throw err;
      console.log("Done writing"); // Success
    });
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

  //==================================================================================================================

  static async select_all_books(request, response) {
    const paramSQL = [];
    let dataDB = await db.search("SELECT * FROM Books;", paramSQL, null, response, response)
    let params = {
      data: dataDB
    }
    response.json(params);
  }

  static async select_all_books_JSON(request, response) {
    const paramSQL = [];
    let params = {
      data: await db.search("SELECT * FROM Books;", paramSQL, null, response, response)
    }

    fs.writeFile("data/data.json", JSON.stringify(params.data), err => {
      if (err) throw err;
      console.log("Done writing"); // Success
    });
    response.json(params);
  }

  static async select_book_by_id(request, response) {
    const id = request.query.id;
    const paramSQL = [id];
    const dataDB = await db.search('SELECT * FROM books WHERE id=$1::int;', paramSQL, null, response, response);

    let params = {
      data: dataDB
    }
    response.json(params);
  }

  static async select_book_by_isbn(request, response) {
    const isbn = request.query.isbn;
    const paramSQL = [isbn];
    const dataDB = await db.search('SELECT * FROM books WHERE isbn-10=$1 OR isbn-13=$1;', paramSQL, null, response, response);

    let params = {
      data: dataDB
    }
    response.json(params);
  }

  static async select_book_by_author(request, response) {
    const findBy = request.query.author;
    const paramSQL = [findBy];
    const dataDB = await db.search('SELECT * FROM books WHERE author like $1;', paramSQL, null, response, response);

    let params = {
      data: dataDB
    }
    response.json(params);
  }

  static async select_book_by_title(request, response) {
    const findBy = request.query.title;
    const paramSQL = [findBy];
    const dataDB = await db.search('SELECT * FROM books WHERE title like $1;', paramSQL, null, response, response);

    let params = {
      data: dataDB
    }
    response.json(params);
  }

  static async insert_book(request, response) {
    const author = request.query.author;
    const title = request.query.title;
    const paramSQL = [author, title];
    const dataDB = await db.insert('INSERT INTO books(author,title) VALUES($1,$2);', paramSQL, null, response, response);

    let params = {
      data: dataDB
    }
    response.json(params);
  }

  //==================================================================================================================

  static async select_all_branches(request, response) {
    const paramSQL = [];
    let dataDB = await db.search("SELECT * FROM branch;", paramSQL, null, response, response)
    let params = {
      data: dataDB
    }
    response.json(params);
  }

  static async select_all_branches_JSON(request, response) {
    const paramSQL = [];
    let params = {
      data: await db.search("SELECT * FROM branch;", paramSQL, null, response, response)
    }

    response.json(params);
    fs.writeFile("data/data.json", JSON.stringify(params.data), err => {
      if (err) throw err;
      console.log("Done writing"); // Success
    });
  }

  static async select_branch_by_id(request, response) {
    const id = request.query.id;
    const paramSQL = [id];
    const dataDB = await db.search('SELECT * FROM branch WHERE id=$1::int;', paramSQL, null, response, response);

    let params = {
      data: dataDB
    }
    response.json(params);
  }

  static async select_branch_by_title(request, response) {
    const findBy = request.query.title;
    const paramSQL = [findBy];
    const dataDB = await db.search('SELECT * FROM branch WHERE title like $1;', paramSQL, null, response, response);

    let params = {
      data: dataDB
    }
    response.json(params);
  }

  static async select_branch_by_email(request, response) {
    const findBy = request.query.email;
    const paramSQL = [findBy];
    const dataDB = await db.search('SELECT * FROM branch WHERE email like $1;', paramSQL, null, response, response);

    let params = {
      data: dataDB
    }
    response.json(params);
  }

  static async insert_branch(request, response) {
    const title = request.query.title;
    const email = request.query.email;
    const paramSQL = [title, emai];
    const dataDB = await db.insert('INSERT INTO branch(title, email) VALUES($1,$2);', paramSQL, null, response, response);

    let params = {
      data: dataDB
    }
    response.json(params);
  }

//==================================================================================================================
//==================================================================================================================

static async select_all_ratings(request, response) {
  const paramSQL = [];
  let dataDB = await db.search("SELECT * FROM rating;", paramSQL, null, response, response)
  let params = {
    data: dataDB
  }
  response.json(params);
}

static async select_all_ratings(request, response) {
  const paramSQL = [];
  let params = {
    data: await db.search("SELECT * FROM rating;", paramSQL, null, response, response)
  }

  response.json(params);
  fs.writeFile("data/data.json", JSON.stringify(params.data), err => {
    if (err) throw err;
    console.log("Done writing"); // Success
  });
}


}

module.exports = API