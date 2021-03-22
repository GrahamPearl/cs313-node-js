const getTodo = (request, response) => { 
}

class Weeks extends Object {
    
  static urlResponse = "pages/personal";
  
  execute(req, res) {
    try {
      const search_params = req.searchParams;
      console.log("Week Tasks - Experiments");
      console.log("Request:" + req);
      console.log(" Params:" + req.searchParams);      
      
      response.render(Weeks.urlResponse, params);
    } catch (err) {
      console.log('Error - will need to resolve:', err);
    }
  };
}

module.exports = Weeks