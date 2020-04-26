"use strict";
const mongoose = require("mongoose");
const { createModels } = require("./createModels");

const schema = new mongoose.Schema({
  _type: {
    type: "string",
    default: "Calc",
  },
  _id: {
    type: "ObjectId",
  },
  updated_at: {
    type: "date",
    format: "date-time",
  },
  content_url: {
    type: "string",
  },
  content_type: {
    type: "string",
  },
  algo_input: {
    type: "object",
  },
  calcs: {
    type: "object",
  },
  scores: {
    type: "object",
  },
  core: {
    type: "object",
  },
  is_faulty: {
    type: "boolean",
  },
});

schema.set("toJSON", { virtuals: true });

const collections = ["articles", "photos", "podcasts", "videos", "newsletters"];

module.exports = createModels("calc", schema, collections);
