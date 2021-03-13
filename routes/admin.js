//const Post = require('../models/postmail');

const Admin = require('../models/admin');

const router_admin = require('express').Router();
      router_admin.post('/execute', admin_execute);
      router_admin.get('/db', async (req, res) => {
        try {
          const client = await pool.connect();
          const result = await client.query('SELECT * FROM books');
          const results = { 'results': (result) ? result.rows : null};
          res.render('pages/db', results );
          client.release();
        } catch (err) {
          console.error(err);
          res.send("Error " + err);
        }
      });

function admin_execute(req, res) {
    try {
        const admin = new Admin();
              admin.execute(req, res);
    } catch (err) {
        console.log('Error - will need to resolve:', err);
        res.render("pages/error-report");
    }
}

module.exports = router_admin;