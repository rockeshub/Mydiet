const mongoose = require("mongoose");
const CONSTANTS = require("../constants");

const timePeriod = {from: Date, to: Date, diet: String}
// TODO Web Template Studio: The Cosmos Mongo Database is set up to hold a collection called ListItems which contains documents
// with the following schema. Define your own schema for the Cosmos MongoDB using mongoose (https://mongoosejs.com/docs/index.html).
const ListItem = mongoose.model(
  CONSTANTS.COSMOS.COLLECTION,
  new mongoose.Schema({
    mon: String,
    tue: String,
    wed: String,
    thu: String,
    fri: String,
    sat: String,
    sun: String,
    period: [timePeriod],
  })
);

module.exports = ListItem;
