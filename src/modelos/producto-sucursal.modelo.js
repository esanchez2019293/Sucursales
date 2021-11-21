'use strict'

var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var ProductoSucursalSchema = Schema({

    nombreProductoSucursal: String,
    stockSucursal: Number,
    cantidadVendida: String,
    sucursalProducto: {type: Schema.Types.String, ref:'sucursal'}
})

module.exports = mongoose.model('productoSucursal', ProductoSucursalSchema)