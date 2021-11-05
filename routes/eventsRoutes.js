var express = require('express');
var router = express.Router();
var uModel = require("../models/eventsModel")

router.get('/', async function (req, res, next) {
  console.log("Sending all events");
  let result = await uModel.getAllEvents();
  res.status(result.status).send(result.result);
});

router.get('/:id', async function (req, res, next) {
  let id = req.params.id;
  console.log("Sending event with id:" + id);
  let result = await uModel.getEventById(id);
  res.status(result.status).send(result.result);
});

router.get('/estado/:estado', async function (req, res, next) {
  let estado = req.params.estado;
  console.log("Sending event with state:" + estado);
  let result = await uModel.getEventByState(estado);
  res.status(result.status).send(result.result);
});

router.get('/lista/filter/', async function(req, res, next) {
  let estado = req.query.estado;
  let local = req.query.local;
  let result = await uModel.getEventsFilteredBy(estado,local);
  res.status(result.status).send(result.result);
});

module.exports = router;