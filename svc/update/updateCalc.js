"use strict";
const moment = require("moment-timezone");
const { Calc } = require("../../model");
const { runCalcs } = require("./runCalcs");
module.exports = { updateCalc, updateCalcFaulty };

async function updateCalc(core) {
  const { content_url, content_type } = core;
  const item = await runCalcs(core);
  const options = { upsert: true, new: true };
  return await Calc[`${content_type}s`].findOneAndUpdate(
    { content_url },
    item,
    options
  );
}

async function updateCalcFaulty(content_url, content_type) {
  const updated_at = moment().tz("America/Chicago").toISOString();
  const update = { $set: { is_faulty: true, updated_at } };
  const options = { upsert: true, new: true };
  return await Calc[`${content_type}s`].findOneAndUpdate(
    { content_url },
    update,
    options
  );
}
