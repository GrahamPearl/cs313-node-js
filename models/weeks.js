const getWeek = (request, response) => { 
}

class Weeks extends Object {
    
  static urlResponse = "pages/weeks";
  
  execute(req, res) {
    try {
      const search_params = req.searchParams;
      console.log("Week Tasks - Experiments");
      console.log("Request:" + req);
      console.log(" Params:" + req.searchParams);      
    } catch (err) {
      console.log('Error - will need to resolve:', err);
    }
  };
}

module.exports = Weeks