'use strict'

var express = require ("express");
var sucursal_controlador = require ("../controladores/sucursal.contralador");

var md_authorization = require("../middlewares/authenticated");

var api = express.Router();

api.get('/ejemploSucursal', sucursal_controlador.ejemploSucursal);
api.post('/AgregarSucursal', md_authorization.ensureAuth, sucursal_controlador.AgregarSucursal);
api.get('/getSucursal',md_authorization.ensureAuth, sucursal_controlador.getSucursal);
api.get('/getSucursalID/:idSucursal', md_authorization.ensureAuth, sucursal_controlador.getSucursalID);
api.put('/UpdateSucursal/:id', md_authorization.ensureAuth, sucursal_controlador.UpdateSucursal);
api.delete('/RemoveSucursal/:id', md_authorization.ensureAuth, sucursal_controlador.RemoveSucursal);

module.exports = api;