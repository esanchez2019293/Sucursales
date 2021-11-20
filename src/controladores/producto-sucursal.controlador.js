'use strict'

var ProductoSucursal =  require("../modelos/producto-sucursal.modelo")


function ejemploProductoSucursal(req, res){
    res.status(200).send({mensaje: ' Ejemplo desde control de sucursales'});
}

function agregarProductoSucursal(req, res){

     var productoSucursalModel = new ProductoSucursal();
     var params = req.body;

     if(req.user.rol != 'Admin'){
        return res.status(500).send({mensaje:'Solo el rol tipo admin puede agrtegra producto a las sucursales'});
    }

    if(params.nombreProductoSucursal && params.stockSucursal && params.cantidadVendida);
    productoSucursalModel.nombreProductoSucursal = params.nombreProductoSucursal;
    productoSucursalModel.stockSucursal = params.stockSucursal;
    productoSucursalModel.cantidadVendida = params.cantidadVendida;
    productoSucursalModel.sucursalProducto  = params.sucursalProducto;

    ProductoSucursal.find({
        $or:[
        {
            nombreProductoSucursal: productoSucursalModel.nombreProductoSucursal,
            stockSucursal: productoSucursalModel.stockSucursal,
            cantidadVendida: productoSucursalModel.cantidadVendida,
        }
        ]
    }).exec ((err, productoObtenido)=>{
        if(err) return res.status(500).send({mensaje: 'Error  en la peticion'})

        if(productoObtenido && productoObtenido.length >= 1){
            return res.status(500).send({mensaje: 'El producto que desea agregar ya existe'})
        } else {

            productoSucursalModel.save((err, productoObtenido)=>{
                if(err) return res.status(500).send({mensaje: 'Error  en la peticion'})

                if(productoObtenido){
                    res.status(200).send({productoObtenido})
                } else {
                    res.status(404).send({mensaje:'No ha podido agregar el producto'})
                }
            })
        }
    })
}


module.exports = {
    ejemploProductoSucursal,
    agregarProductoSucursal
}