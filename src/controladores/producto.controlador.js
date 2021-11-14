'use strict'

var Producto = require("../modelos/producto.modelo");

function ejemploProducto(req, res){
    res.status(200).send({mensaje: ' Ejemplo desde controlador de productos'})
}

function AgregarProducto(req, res){

    var productoModel = new Producto();
    var params = req.body;

    if(req.user.rol != 'Admin'){
        return res.status(500).send({mensaje:'Solo el rol tipo admin puede crear productos'});
    }

    if(params.nombreProducto && params.nombreProveedor && params.stock){
        productoModel.nombreProducto = params.nombreProducto;
        productoModel.nombreProveedor = params.nombreProveedor;
        productoModel.stock = params.stock;

        Producto.find({
            $or: [
                {
                    nombreProducto: productoModel.nombreProducto,
                    nombreProveedor: productoModel.nombreProveedor,
                    stock: productoModel.stock
                }
            ]
        }).exec((err, productoGuardado)=>{
            if(err) return res.status(500).send({mensaje: 'Error  en la peticion'});

            if(productoGuardado && productoGuardado.length >= 1){
                return res.status(500).send({mensaje: 'El producto que desea crear ya existe actualmente'});
            } else {

                productoModel.save((err, productoGuardado)=>{
                    if(err) return res.status(500).send({mensaje: 'Error  en la peticion'});

                    if(productoGuardado){
                        res.status(200).send({productoGuardado})
                    } else {
                        res.status(404).send({mensaje:'No ha sido posible guardar el producto'});
                    }
                })
            }
        })
    }
}

module.exports = {
    ejemploProducto,
    AgregarProducto
}