const Post = require('../models/postmail');

const router_postmail = require('express').Router();
router_postmail.get('/', (req, res) => res.render('pages/postmail'));
router_postmail.post('/report', post_report);

function post_report(req, res) {
    try {
        const post = new Post();
              post.execute(req, res);
    } catch (err) {
        console.log('Error - will need to resolve:', err);
        res.render("pages/error-report");
    }
}

module.exports = router_postmail;