'use strict'

var express = require ("express")
var ProductoSucursal_controlador = require("../controladores/producto-sucursal.controlador");

var md_authorization = require("../middlewares/authenticated");

var api = express.Router();
api.get('/ejemploProductoSucursal', ProductoSucursal_controlador.ejemploProductoSucursal);
api.post('/agregarProductoSucursal', md_authorization.ensureAuth, ProductoSucursal_controlador.agregarProductoSucursal);

module.exports = api;