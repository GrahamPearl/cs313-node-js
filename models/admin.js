class Admin extends Object {
  
  static doExecute(task, res) {    
    let urlResponse = "";
    switch (task) {
        case "1": urlResponse = "pages/postmail"; break;
        case "2": urlResponse = "pages/library"; break;
        case "3": urlResponse = "pages/books"; break;
        default: urlResponse = "pages/library";
    }
    res.render(urlResponse)
}

  execute(req, res) {
    try {
        Admin.doExecute(req.body.task, res);                

      } catch (err) {
        console.log('Error - will need to resolve:', err);
        //res.render("pages/error-report");
      }
  };
}

module.exports = Admin