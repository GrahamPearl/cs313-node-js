const {
  Pool
} = require("pg");

//const uriHeroku = 'postgres://eyrisxdztiubpj:c8ca45cbe5b9cf11038936746236f52eb49c76f384467bb2e27c7e4f7bc26bf0@ec2-54-242-43-231.compute-1.amazonaws.com:5432/dbadu7beav50j0';
//const uriHeroku = 'postgres://eyrisxdztiubpj:c8ca45cbe5b9cf11038936746236f52eb49c76f384467bb2e27c7e4f7bc26bf0@ec2-54-242-43-231.compute-1.amazonaws.com:5432/dbadu7beav50j0';
const uriLocal = 'postgres://reg_user:family@localhost:5432/familyhistory';

var URI = '';
if (process.env._.indexOf("heroku") === -1) {
  URI = uriLocal;
}

const connectionString = process.env.DATABASE_URL || URI;
const pool = new Pool({
  connectionString: connectionString
});

class Week10Team extends Object {
  static urlResponse = "pages/week10Team_report";

  static getPerson(request, response) {
    const id = request.query.id;

    Week10Team.getPersonFromDb([1], function (error, result) {
      if (error || result == null || result.length != 1) {
        response.status(500).json({
          success: false,
          data: error
        });
      } else {

        //var params = { result: JSON.stringify(result[0]) };
        //response.render(Week10Team.urlResponse, params);        

        const matches = result[0];
        response.status(200).json(matches);
      }
    });
  }


  static getPersonFromDb(params, callback) {
    console.log("Getting person from DB with params: " + params);

    //const sql = "SELECT id, first, last, birthdate FROM person WHERE last = $1 AND first = $2";
    const sql = "SELECT id, first, last, birthdate FROM person WHERE id = $1::int";

    (async () => {
      const client = await pool.connect()
      try {
        const res = await client.query(sql, params)
          .then(res => {
            var params = {
              headers: ["id", "last", "first"],
              rows: new Array(4).fill(undefined)
            };

            res.render(Week10Team.urlResponse, params);
          })
        console.table(res.rows)



      } finally {
        client.release()
      }
    })().catch(err => console.log(err.stack))
  }

  execute(req, res) {
    try {
      pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
      })

      Week10Team.getPerson(req, res);

      /*
      
     */

    } catch (err) {
      console.log('Error - will need to resolve:', err);
      //res.render("pages/error-report");
    }
  };
}

module.exports = Week10Team