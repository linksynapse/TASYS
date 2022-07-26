var express = require('express');
var router = express.Router();

const users = require('../services/test');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try{
    res.json(await users.getUsers());
  }catch (err){
    console.error(err.message);
    next(err);
  }
});

module.exports = router;
