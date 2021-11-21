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


function obtenerProductoSucursal(req, res){

    if(req.user.rol != 'Admin'){
        return res.status(500).send({mensaje:'Solo el rol tipo admin puede agrtegra producto a las sucursales'});
    }

    ProductoSucursal.find().exec((err, productosSucursal)=>{
        if(err) return res.status(500).send({mensaje: 'Error  en la peticion'});

        if(!productosSucursal) return res.status(500).send({mensaje: 'No se han podido obtener los productos de la sucursal'});

        return res.status(200).send({productosSucursal});
    })
}

function obtenerProductoSucursalID(req, res){

  var productoSucursalID = req.params.idProductoSucursal;

  if(req.user.rol != 'Admin'){
    return res.status(500).send({mensaje:'Solo el rol tipo admin puede agrtegra producto a las sucursales'});
  }

  ProductoSucursal.findById(productoSucursalID, (err, productoCorrecto)=>{
    if(err) return res.status(500).send({mensaje: 'Error  en la peticion'});

    if(!productoCorrecto) return res.status(500).send({mensaje: 'Error al obtener el producto de la sucursal'});

    return res.status(200).send({ productoCorrecto });
  })
}


function venderProducto(req, res){
  
  var idProductoSucursal = req.params.id;
  var params = req.body;

  ProductoSucursal.findById(idProductoSucursal,{cantidadVendida:1},(err, productoReconocido)=>{
    if(err){ 
      return res.status(500).send({mensaje: 'Error  en la peticion'});
    } else if(productoReconocido){
      console.log(productoReconocido)

      var suma = Number(productoReconocido.cantidadVendida) + Number(params.cantidadVendida);

      var cantidadVendida = {cantidadVendida: suma};

      ProductoSucursal.findByIdAndUpdate(idProductoSucursal,cantidadVendida,{new: true},(err,ventaRealizada)=>{
        if(err){
          return res.status(500).send({mensaje: 'Error en la peticion'});
        } else if(productoReconocido){
          res.send({productoVendido: productoReconocido});
        } else{
          res.status(404).send({mensaje:'No se ha podido realizar la venta del producto'});
        }
      })
    } else{
      res.status(404).send({mensaje:'No se puedo encontrar el producto a vender'});
    }

    })
}

module.exports = {
    ejemploProductoSucursal,
    agregarProductoSucursal,
    obtenerProductoSucursal,
    obtenerProductoSucursalID,
    venderProducto
}