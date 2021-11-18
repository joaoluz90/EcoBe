var express = require('express');
var router = express.Router();
var uModel = require("../models/staffModel")

router.get('/', async function (req, res, next) {
  console.log("Sending all colaborators");
  let result = await uModel.getAllStaff();
  res.status(result.status).send(result.result);
});


router.get('/:id', async function (req, res, next) {
  let id = req.params.id;
  console.log("Sending colaborator with id:" + id);
  let result = await uModel.getStaffById(id);
  res.status(result.status).send(result.result);
});

router.post('/login', async function (req, res, next) {
  let username = req.body.username;
  let password = req.body.pass;
  let result = await uModel.loginStaff(username, password);
  res.status(result.status).send(result.result);
});

module.exports = router;