'use strict'

var Sucursal = require("../modelos/sucursal.modelo");

function ejemploSucursal(req, res){
    res.status(200).send({mensaje:' Ejemplo desde contraldor de sucursales'})
}

module.exports = {
  ejemploSucursal
}
