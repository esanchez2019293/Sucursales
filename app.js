'use strict'

const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");

var empresa_rutas = require("./src/rutas/empresa.rutas");
var sucursal_rutas = require("./src/rutas/sucursal.rutas");
var producto_rutas = require("./src/rutas/producto.rutas");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(cors());

app.use('/api', empresa_rutas, sucursal_rutas, producto_rutas);

module.exports = app;