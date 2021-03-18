require("dotenv").config();
const express = require('express');
const config = require("../config");
const router = express.Router();
const mongoose = require('mongoose');

const memberSchema = require('../models/member.model');

module.exports = router;