/**************************************
 * /routes/api/expression.js
 **************************************/

const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Expression = require('../../models/Expression');
const validateExprInput = require('../../validation/expression.js');

/***************************************
 * @route       POST /api/expression
 * @desc        Create expression in current user's document
 * @access      Private
 **************************************/
router.post(
  '/',
  passport.authenticate('jwt',
    { session: false }),
    (req, res) => {
      const { errors, isValid } = validateExprInput(req.body);
      if (!isValid) return res.status(400).json(errors);
      const newExpr = new Expression({
        minute: req.body.minute,
        hour: req.body.hour,
        dayOfMonth: req.body.dayOfMonth,
        month: req.body.month,
        dayOfWeek: req.body.dayOfWeek,
        description: req.body.description,
      });
      newExpr.save().then(expression => res.json(expression));
    }
);

module.exports = router;
