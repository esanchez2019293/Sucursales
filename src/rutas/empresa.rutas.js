'use strict'

var express = require("express")
var empresa_controlador = require("../controladores/empresa.controlador");

var md_authorization = require("../middlewares/authenticated");

var api = express.Router();
 api.get('/ejemplo', empresa_controlador.ejemplo);
 api.get('/empresaAdmin', empresa_controlador.empresaAdmin);
 api.post('/loginAdmin', empresa_controlador.loginAdmin); 

 module.exports = api;

