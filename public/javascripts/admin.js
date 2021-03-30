function login() {
  alert('Logging In...');
	var username = $("#username").val();
	var password = $("#password").val();

	var params = {
		username: username,
		password: password
	};

	$.post("/login", params, function(res) {
		if (res && res.success) {
			$("#status").text("Successfully logged in.");
		} else {
			$("#status").text("Error logging in.");
		}
	});
}

function logout() {
  alert('Logging Out...');
	$.post("/logout", function(res) {
		if (res && res.success) {
			$("#status").text("Successfully logged out.");
		} else {
			$("#status").text("Error logging out.");
		}
	});
}

class Admin extends Object {
  static login = login;
  static logout = logout;

  
  static doExecute(task, res) {    
    let urlResponse = "";
    switch (task) {
        case "01": urlResponse = "/API/find_patrons_all"; break;
        case "02": urlResponse = "/API/find_patron_by_id"; break;
        case "03": urlResponse = ""; break;
        default: urlResponse = "";
    }
    res.render(urlResponse)
}

  execute(req, res) {
    try {
        Admin.doExecute(req.body.task, res);                

      } catch (err) {
        console.log('Error - will need to resolve:', err);        
      }
  };
}

module.exports = Admin