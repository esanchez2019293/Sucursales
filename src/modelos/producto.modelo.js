'use strict'
var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var ProductoSchema = Schema({

    nombreProducto: String,
    nombreProveedor: String,
    stock: Number

})

module.exports = mongoose.model('producto', ProductoSchema)