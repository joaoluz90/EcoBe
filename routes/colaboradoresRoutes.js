var express = require('express');
var router = express.Router();
var uModel = require("../models/colaboradoresModel")

router.get('/', async function(req, res, next) {
    console.log("Sending all colaborators");
    let result = await uModel.getAllColaboradores();
    res.status(result.status).send(result.result);
  });


  router.get('/:id', async function(req, res, next) {
    let id = req.params.id;
    console.log("Sending colaborator with id:" + id);
    let result = await uModel.getColabById(id);
    res.status(result.status).send(result.result);
  });

module.exports = router;