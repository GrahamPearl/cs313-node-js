class Week10Team extends Object {
    static urlResponse = "pages/w10team_report";    
    
    connect()
    {

    }

    createTable()
    {
        
    }

    getPerson(id) {
        console.log('Person Data: ');
    }
  
    execute(req, res) {
      try {
        var amountOwed = Week10Team.amount;
        var params = {
          amount: amountOwed
        };
        res.render(Week9.urlResponse, params);
      } catch (err) {
        console.log('Error - will need to resolve:', err);
        //res.render("pages/error-report");
      }
    };
  }
  
  module.exports = Week10Team