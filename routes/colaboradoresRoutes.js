var express = require('express');
var router = express.Router();
var uModel = require("../models/colaboradoresModel")

router.get('/', async function (req, res, next) {
  console.log("Sending all colaborators");
  let result = await uModel.getAllColaboradores();
  res.status(result.status).send(result.result);
});


router.get('/:id', async function (req, res, next) {
  let id = req.params.id;
  console.log("Sending colaborator with id:" + id);
  let result = await uModel.getColabById(id);
  res.status(result.status).send(result.result);
});

router.post('/login', async function (req, res, next) {
  let username = req.body.username;
  let password = req.body.pass;
  let result = await uModel.loginColaborador(username, password);
  res.status(result.status).send(result.result);
});

router.put('/pesa', async function (req, res, next) {
  let eventId = req.body.event;
  let utiId = req.body.uti;
  let lixo = req.body.lixo;
  let result = await uModel.pesarLixo(lixo, utiId, eventId);
  res.status(result.status).send(result.result);
});

router.get('/:id/events', async function (req, res, next) {
  let id = req.params.id;
  console.log("Sending colaborator events with colab id:" + id);
  let result = await uModel.getColabEventsById(id);
  res.status(result.status).send(result.result);
});

router.get('/user/lixo/', async function (req, res, next) {
  let uti = req.query.utiId;
  let eve = req.query.eveId;
  let result = await uModel.getUserLixo(uti,eve);
  res.status(result.status).send(result.result[0]);
});

module.exports = router;