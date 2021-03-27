const Database = require('../db/database.js')

const getAllPatrons = (request, response) => {
    const db = new Database();  
    db.search("SELECT * FROM Patrons", null, response, response);
}

const getAPatron = (request, response) => {
  const db = new Database();  
  const id = request.query.id;
  const params = [id];
  db.search("SELECT * FROM Patrons WHERE id = "+id+"::int;", null, response, response);
  //db.search("SELECT * FROM Patrons WHERE id = $1::int;", null, response, response);
}

class Patrons extends Object {
  static urlResponse = "pages/patrons_report";
  //static searchEvent = getAllPatrons;
  static searchEvent = getAPatron;

  execute(req, res) {
    try {
      pool.on('error', (err, client) => {
        console.error('Unexpected error on idle client', err)
        process.exit(-1)
      })

      Patrons.searchEvent(req,res);
      
    } catch (err) {
      console.log('Error - will need to resolve:', err);      
    }
  };
}

module.exports = Patrons