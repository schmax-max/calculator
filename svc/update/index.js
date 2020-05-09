"use strict";
const moment = require("moment-timezone");
const { gateway } = require("../gateway");
const { Calc } = require("../../model");
const { updateCalc, updateCalcFaulty } = require("./updateCalc");
const getScan = require("./getScan");
module.exports = update;

async function update(req) {
  console.log("running update");
  if (gateway(req, "params")) {
    console.log("validated params in update");
    try {
      const content_types = [
        "article",
        // 'video',
        // 'podcast',
        // 'photo'
      ];
      const find = getUpdateFind();
      for (let i = 0; i < content_types.length; i++) {
        const content_type = content_types[i];
        const count = await Calc[`${content_type}s`].countDocuments(find);
        console.log({ count });
        return await updateLoop(content_type, find, count);
      }
    } catch (e) {
      console.log({ e });
      return;
    }
  } else {
    console.log("error in update");
    return;
  }
}

function getUpdateFind() {
  const faulty = { is_faulty: { $ne: true } };
  const date = getDateObject("updated_at", "$lt", 2);
  return Object.assign(faulty, date);
}

async function updateLoop(content_type, find, count, current = 0) {
  console.log("starting updateLoop");
  const contents = await Calc[`${content_type}s`].find(find).limit(10);
  const { length } = contents;
  if (length === 0) {
    return;
  } else {
    for (let i = 0; i < length; i++) {
      current += 1;
      console.log(`running update #${current} of ${count}`);
      if (i % 10 === 0) {
        console.log(`running update #${current} of ${count}`);
      }
      await updateGateway(content_type, contents[i]);
    }
    if (current < 5000) {
      return updateLoop(content_type, find, count, current);
    } else {
      return;
    }
  }
}

async function updateGateway(content_type, { core, content_url }) {
  if (!core) {
    const scan = await getScan(content_url, content_type);
    if (scan) {
      ({ core } = scan);
    }
  }
  if (core) {
    return await updateCalc(core);
  } else {
    return await updateCalcFaulty(content_url, content_type);
  }
}

function getDateObject(key, operator, days) {
  let date = moment()
    .tz("America/Chicago")
    .subtract(days, "days")
    .toISOString();
  // console.log({ date });

  const firstObj = {};
  const secondObj = {};
  const firstObjVal = {};
  firstObjVal[operator] = date;

  firstObj[key] = firstObjVal;
  secondObj[key] = { $exists: true };
  return {
    $and: [firstObj, secondObj],
  };
}
