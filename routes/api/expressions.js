/**************************************
 *
 **************************************/

const express = require('express');

const router = express.Router();

/**************************************
 * @route       GET api/expressions/test
 * @desc        Tests expressions route
 * @access      Public
 **************************************/

router.get('/test', (req, res) => res.json({msg: "Expressions routing successfully"}));

module.exports = router;
