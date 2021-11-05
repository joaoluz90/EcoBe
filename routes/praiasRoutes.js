var express = require('express');
var router = express.Router();
var uModel = require("../models/praiasModel")

router.get('/', async function (req, res, next) {
  console.log("Sending all praias");
  let result = await uModel.getAllPraias();
  res.status(result.status).send(result.result);
});


router.get('/:id', async function (req, res, next) {
    let id = req.params.id;
    console.log("Sending beach with id:" + id);
    let result = await uModel.getPraiaById(id);
    res.status(result.status).send(result.result);
  });
  


module.exports = router;