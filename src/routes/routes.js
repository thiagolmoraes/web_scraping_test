const express = require('express');
const asyncHandler = require('express-async-handler');
const { buscar } = require('../controllers/scraping');

const routes = express.Router();

routes.post('/buscar', asyncHandler(buscar));

module.exports = { routes };
