'use strict'

var express = require ("express");
var sucursal_controlador = require ("../controladores/sucursal.contralador");

var md_authorization = require("../middlewares/authenticated");

var api = express.Router();

api.get('/ejemploSucursal', sucursal_controlador.ejemploSucursal);

module.exports = api;