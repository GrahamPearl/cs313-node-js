function login() {
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
	$.post("/logout", function(res) {
		if (res && res.success) {
			$("#status").text("Successfully logged out.");
		} else {
			$("#status").text("Error logging out.");
		}
	});
}

function getServerTime() {
	$.get("/getServerTime", function(res) {
		if (res && res.success) {
			$("#status").text("Server time: " + res.time);
		} else {
			$("#status").text("Got a res back, but it wasn't a success. Your reponse should have had a 401 status code.");
		}
	}).fail(function(res) {
		$("#status").text("Could not get server time.");
	});
}