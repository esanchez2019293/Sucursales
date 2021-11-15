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

function getProducto(req, res){

    if(req.user.rol != 'Admin'){
        return res.status(500).send({mensaje:'Solo el rol tipo admin puede crear productos'});
    }

    Producto.find().exec((err, productos)=>{
        if(err) return res.status(500).send({mensaje: 'Error  en la peticion'})
     
        if(!productos) return res.status(500).send({mensaje: 'Erro al obtener los productos'})

        return res.status(200).send({productos})
    }) 
}

function ObtenerProductoID(req, res){

    var ProductoID = req.params.idproducto;

    if(req.user.rol != 'Admin'){
        return res.status(500).send({mensaje:'Solo el rol tipo admin puede crear productos'});
    }

    Producto.findById(ProductoID, (err, ProductoEncontrado)=>{
        if(err) return res.status(500).send({mensaje: 'Error  en la peticion'})

        if(!ProductoEncontrado) return res.status(500).send({mensaje: 'Error al buscar el producto'})

        return res.status(200).send({ProductoEncontrado})
    })


}

function updateProducto(req, res){

    var idProducto = req.params.id;
    var params = req.body;

    if(req.user.rol != 'Admin'){
        return res.status(500).send({mensaje:'Solo el rol tipo admin puede crear productos'});
    }

    Producto.findByIdAndUpdate(idProducto, params,{new: true},(err, ProductoEditado)=>{
        if(err) return res.status(500).send({mensaje: 'Error  en la peticion'})

        if(!ProductoEditado) return res.status(500).send({mensaje: 'Error al editar el producto'})
    
        return res.status(200).send({ProductoEditado})
    })

    
}


function DeleteProducto(req, res){

    var idProducto = req.params.id;

    if(req.user.rol != 'Admin'){
        return res.status(500).send({mensaje:'Solo el rol tipo admin puede crear productos'});
    }

    Producto.findByIdAndDelete(idProducto, ((err, ProductoEliminado)=>{
        if(err) return res.status(500).send({mensaje: 'Error  en la peticion'})

        if(!ProductoEliminado) return res.status(500).send({mensaje: 'Error al eliminar el producto'})

        return res.status(200).send({ProductoEliminado})
    }))
}

module.exports = {
    ejemploProducto,
    AgregarProducto,
    getProducto,
    ObtenerProductoID,
    updateProducto,
    DeleteProducto
}