const CONSTANTS = require("../constants");
const express = require("express");
const mongoService = require("../mongo/mongoService");
const sampleData = require("../sampleData");
const authenticationRequired =  require("../auth");


const router = express.Router();
// Grid Page Endpoint
router.get(CONSTANTS.ENDPOINT.GRID, authenticationRequired, (req, res) => {
  res.json(sampleData.textAssets);
});


//List Items
router.get(CONSTANTS.ENDPOINT.LIST, authenticationRequired,  function(req, res, next) {
  mongoService.get(req, res, next);
});

router.post(CONSTANTS.ENDPOINT.LIST, authenticationRequired,  function(req, res, next) {
  mongoService.create(req, res, next);
});

router.delete(CONSTANTS.ENDPOINT.LIST + "/:_id", authenticationRequired ,function(req, res, next) {
  mongoService.destroy(req, res, next);
});

// MasterDetail Page Endpoint
router.get(CONSTANTS.ENDPOINT.MASTERDETAIL, authenticationRequired, (req, res) => {
  res.json(sampleData.textAssets);
});


module.exports = router;
