const {
  Pool
} = require("pg");

//let URI = 'postgres://eyrisxdztiubpj:c8ca45cbe5b9cf11038936746236f52eb49c76f384467bb2e27c7e4f7bc26bf0@ec2-54-242-43-231.compute-1.amazonaws.com:5432/dbadu7beav50j0'
let URI = "postgres://reg_user:family@localhost:5432/familyhistory";
const connectionString = process.env.DATABASE_URL || URI
const pool = new Pool({
  connectionString: connectionString
});

class Week10Team extends Object {
  static urlResponse = "pages/week10Team_report";

  static connect() {
    try {
      const pool = new Pool({
        connectionString: connectionString
      });
      return true;
    } catch (err) {
      console.log('Error - will need to resolve:', err);
      return false;
    }
  }

  static createTable() {}

  static getPerson(request, response) {
    const id = request.query.id;

    Week10Team.getPersonFromDb([id], function (error, result) {
      if (error || result == null || result.length != 1) {
        response.status(500).json({
          success: false,
          data: error
        });
      } else {
        const person = result[0];
        response.status(200).json(person);
      }
    });
  }


  static getPersonFromDb(params, callback) {
    console.log("Getting person from DB with params: " + params);

    //const sql = "SELECT id, first, last, birthdate FROM person WHERE last = $1 AND first = $2";
    const sql = "SELECT id, first, last, birthdate FROM person WHERE id = $1::int";

    pool.query(sql, params, function (err, result) {
      if (err) {
        console.log("Error in query: ")
        console.log(err);
        callback(err, null);
      }

      console.log("Found result: " + JSON.stringify(result.rows));
      callback(null, result.rows);
    });
  }

  static getTime() {
    return NOW();
  }

  execute(req, res) {
    try {
      var isConnected = Week10Team.connect();
      Week10Team.getPerson(req, res);
    } catch (err) {
      console.log('Error - will need to resolve:', err);
      //res.render("pages/error-report");
    }
  };
}

module.exports = Week10Team