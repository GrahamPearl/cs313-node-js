const {
  Pool
} = require("pg");

//const uriHeroku = 'postgres://eyrisxdztiubpj:c8ca45cbe5b9cf11038936746236f52eb49c76f384467bb2e27c7e4f7bc26bf0@ec2-54-242-43-231.compute-1.amazonaws.com:5432/dbadu7beav50j0';
//const uriHeroku = 'postgres://eyrisxdztiubpj:c8ca45cbe5b9cf11038936746236f52eb49c76f384467bb2e27c7e4f7bc26bf0@ec2-54-242-43-231.compute-1.amazonaws.com:5432/dbadu7beav50j0';
const uriLocal = 'postgres://api_user:password@localhost:5432/books_api';

var URI = '';
if (process.env._.indexOf("heroku") === -1) {
  URI = uriLocal;
}

const connectionString = process.env.DATABASE_URL || URI;
const pool = new Pool({
  connectionString: connectionString
});

const getBranches = (request, response) => {
   pool.query('SELECT * FROM branch', (error, ress) => {
    if (error) {
      throw error
    }
    var params = {
      headers: ["id", "title", "email"],
      rows: new Array(4).fill(ress.rows)
    };

    response.render(Library.urlResponse, params);
    //response.status(200).json(ress.rows)
  })
}

const addBranch = (request, response) => {
  const {
    author,
    title
  } = request.body

  pool.query(
    'INSERT INTO branch (title, email) VALUES ($1, $2)',
    [title, email],
    (error) => {
      if (error) {
        throw error
      }
      response.status(201).json({
        status: 'success',
        message: 'Branch added.'
      })
    },
  )
}

class Library extends Object {
  static urlResponse = "pages/library_report";
  static insertEvent = addBranch;
  static selectEvent = getBranches;

  execute(req, res) {
    try {
      pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
      })

      Library.selectEvent(req,res);
      
    } catch (err) {
      console.log('Error - will need to resolve:', err);
        //res.render("pages/error-report");
    }
  };
}

module.exports = Library