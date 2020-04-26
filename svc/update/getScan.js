"use strict";
const mongoose = require("mongoose");
const { createModels } = require("../../model/createModels");

const schema = new mongoose.Schema({
  content_url: {
    type: "string",
  },
  core: {
    type: "object",
  },
});

schema.set("toJSON", { virtuals: true });

const collections = ["articles", "photos", "podcasts", "videos", "newsletters"];

const Scan = createModels("scan", schema, collections);

async function getScan(content_url, content_type) {
  return await Scan[`${content_type}s`].findOne({ content_url });
}

module.exports = getScan;
