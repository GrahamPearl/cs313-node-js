const Database = require('../db/database.js')

const getPatrons = (request, response) => {
    const db = new Database();  
    db.search("SELECT * FROM Books", null, null, null);
}

class Patrons extends Object {
  static urlResponse = "pages/patrons_report";
  static searchEvent = getPatrons;

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