'use strict'

var express = require ("express")
var ProductoSucursal_controlador = require("../controladores/producto-sucursal.controlador");

var md_authorization = require("../middlewares/authenticated");

var api = express.Router();
api.get('/ejemploProductoSucursal', ProductoSucursal_controlador.ejemploProductoSucursal);
api.post('/agregarProductoSucursal', md_authorization.ensureAuth, ProductoSucursal_controlador.agregarProductoSucursal);
api.get('/obtenerProductoSucursal', md_authorization.ensureAuth, ProductoSucursal_controlador.obtenerProductoSucursal);
api.get('/obtenerProductoSucursalId/:idProductoSucursal', md_authorization.ensureAuth, ProductoSucursal_controlador.obtenerProductoSucursalID);
api.put('/venderProducto/:id', md_authorization.ensureAuth, ProductoSucursal_controlador.venderProducto)

module.exports = api;