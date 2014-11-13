var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var Film = require('../models/Film');

router
    .use(bodyParser.json())
    .route('/films')
    .get(function (req, res) {
        Film.find(null, function (err, data) {
            res.json(data);
        });
    });

router
    .param('id', function (req, res, next) {
        req.dbQuery = {id: req.params.id};
        next();
    })
    .route('/films/:id')
    .get(function (req, res) {
        Film.findOne(req.dbQuery, function (err, data) {
            res.json(data);
        });
    });
module.exports = router;