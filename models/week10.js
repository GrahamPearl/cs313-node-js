class Week10 extends Object {
    static urlResponse = "pages/postmail_report";    
    static amount = 100;
  
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
  
  module.exports = Week10