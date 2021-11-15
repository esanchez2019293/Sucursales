'use strict'

var express = require ("express");
var producto_controlador = require("../controladores/producto.controlador");

var md_authorization = require("../middlewares/authenticated");

var api = express.Router();

api.get('/ejemploProducto',producto_controlador.ejemploProducto);
api.post('/AgregarProducto',md_authorization.ensureAuth, producto_controlador.AgregarProducto);
api.get('/getProducto',md_authorization.ensureAuth, producto_controlador.getProducto);
api.get('/getProductoID/:idproducto',md_authorization.ensureAuth, producto_controlador.ObtenerProductoID);
api.put('/updateProducto/:id',md_authorization.ensureAuth, producto_controlador.updateProducto);
api.delete('/DeleteProducto/:id', md_authorization.ensureAuth, producto_controlador.DeleteProducto);


module.exports = api;