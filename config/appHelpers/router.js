const express = require("express");
const router = express.Router();
const { master } = require("../../svc");
const update = require("../../svc/update");
const service = require("../service");

router.post(`/${service}/:type`, trigger);
router.get(`/${service}/:type`, updateTrigger);

async function trigger(req, res, next) {
  console.log(`${service} triggered by ${req.params.type}`);
  const response = await master(req);
  res.send(response);
}

async function updateTrigger(req, res, next) {
  console.log("running updateTrigger");
  console.log(`${service} triggered by ${req.params.type}`);
  const response = await update(req);
  res.send(response);
}

module.exports = router;
