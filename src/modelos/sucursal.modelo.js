'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var SucursalSchema = Schema({
      
    nombre: String,
    direccion: String,
    telefono: Number,
    sucursalEmpresa: {type:Schema.Types.String, ref:'admin'}
})

module.exports = mongoose.model('sucursal', SucursalSchema)