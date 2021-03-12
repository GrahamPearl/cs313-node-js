const express = require('express');
const app = express();

const { Pool } = require("pg"); 
const connectionString = process.env.DATABASE_URL || "postgres://reg_user:family@localhost:5432/familyhistory";
const pool = new Pool({connectionString: connectionString});

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/getPerson', getPerson);
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// This function handles requests to the /getPerson endpoint
// it expects to have an id on the query string, such as: http://localhost:5000/getPerson?id=1
function getPerson(request, response) {
	const last_name = request.query.last_name;
    
	getPersonFromDb(last_name, function(error, result) {
		if (error || result == null || result.length != 1) {
			response.status(500).json({success: false, data: error});
		} else {
			const person = result[0];
			response.status(200).json(person);
		}
	});
}

function getPersonFromDb(last_name, callback) {
	console.log("Getting person from DB with last=" + last_name);

	//const sql = "SELECT id, first, last, birthdate FROM person WHERE id = $1::int";
	//const params = [id];
	const sql = "SELECT id, first, last, birthdate FROM person WHERE last = $1::text";
	const params = [last_name];

	pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("Error in query: ")
			console.log(err);
			callback(err, null);
		}

		console.log("Found result: " + JSON.stringify(result.rows));

		callback(null, result.rows);
	});

} // end of getPersonFromDb
