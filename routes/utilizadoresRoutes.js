var express = require('express');
var router = express.Router();
var uModel = require("../models/utilizadoresModel")

router.get('/', async function (req, res, next) {
  console.log("Sending al users");
  let result = await uModel.getAllUsers();
  res.status(result.status).send(result.result);
});


router.get('/leaderboard', async function (req, res, next) {
  console.log("Sending users leaderboard");
  let result = await uModel.getLeaderboard();
  res.status(result.status).send(result.result);
});

router.get('/perfil/:username', async function (req, res, next) {
  let username = req.params.username;
  console.log("Sending user account with username:" + username);
  let result = await uModel.getUserByUsername(username);
  res.status(result.status).send(result.result);
});


router.get('/:id', async function (req, res, next) {
  let id = req.params.id;
  console.log("Sending users with event id:" + id);
  let result = await uModel.getUsersById(id);
  res.status(result.status).send(result.result);
});

router.post('/login', async function (req, res, next) {
  let username = req.body.username;
  let password = req.body.pass;
  let result = await uModel.loginStudent(username, password);
  res.status(result.status).send(result.result);
});

router.post('/:id/participa', async function (req, res, next) {
  let eventId = req.body.eventId;
  let utiId = req.body.utiId;
  let result = await uModel.enrollUser(utiId, eventId);
  res.status(result.status).send(result.result);
});

router.get('/historico/:id', async function (req, res, next) {
  let id = req.params.id;
  console.log("Sending user historial with id:" + id);
  let result = await uModel.getUserHistorico(id);
  res.status(result.status).send(result.result);
});


module.exports = router;