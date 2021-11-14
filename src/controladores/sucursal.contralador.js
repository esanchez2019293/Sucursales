'use strict'

var Sucursal = require("../modelos/sucursal.modelo");

function ejemploSucursal(req, res){
    res.status(200).send({mensaje:' Ejemplo desde controlador de sucursales'})
}


function AgregarSucursal(req, res){

  var sucursalModel = new Sucursal();
  var params = req.body;

  if(req.user.rol != 'Admin'){
      return res.status(500).send({mensaje:'Solo el rol tipo admin puede crear sucursales'});
  }

  if(params.nombre && params.direccion && params.telefono) {
    sucursalModel.nombre = params.nombre;
    sucursalModel.direccion = params.direccion;
    sucursalModel.telefono = params.telefono;
    sucursalModel.sucursalEmpresa = req.user.usuario;

    Sucursal.find({
      $or: [
        { 
          nombre: sucursalModel.nombre,
          direccion: sucursalModel.direccion,
          telefono: sucursalModel.telefono
        }
      ]
    }).exec((err, sucursalEncontrada)=>{
      if(err) return res.status(500).send({mensaje: 'Error  en la peticion'})

      if(sucursalEncontrada && sucursalEncontrada.length >= 1){
        return res.status(500).send({mensaje: 'La sucursal que desea crear ya existe actualmente'});
      } else{

          sucursalModel.save((err, sucursalGuardada)=>{
            if(err) return res.status(500).send({mensaje: 'Error  en la peticion'});

            if(sucursalGuardada){
              res.status(200).send({sucursalGuardada})
            } else{
              res.status(404).send({mensaje:'No ha sido posible guardar la sucursal'});
            }
          })
      }
    })
  }
}


function getSucursal(req, res){

  if(req.user.rol != 'Admin'){
    return res.status(500).send({mensaje: 'Solo el rol tipo admin puede obtener las sucursales'})
  }

  Sucursal.find().exec((err, sucursales)=>{
    if(err) return res.status(500).send({mensaje: 'Error en la peticion'})
    if(!sucursales) return res.status(500).send({mensaje: 'Error al obtener las sucursales'});

    return res.status(200).send({sucursales})
  })
}


function getSucursalID(req, res){

  var sucursalId = req.params.idSucursal;

  if(req.user.rol != 'Admin'){
    return res.status(500).send({mensaje: 'Solo el rol tipo admin puede obtener po ID las sucursales'});
  }

  Sucursal.findById(sucursalId,(err, sucursalEncontrada)=>{
    if (err) return res.status(500).send({mensaje: 'Error  en la peticion'})

    if(!sucursalEncontrada) return res.status(500).send({mensaje: 'Error al obtener los datos de la sucursal'})

    return res.status(200).send({ sucursalEncontrada })
  })
}


function UpdateSucursal(req, res){

  var idSucursal = req.params.id;
  var params = req.body;

  if(req.user.rol != 'Admin'){
    return res.status(500).send({mensaje: 'Solo el rol tipo admin puede editar las sucursales'});
  }

  Sucursal.findByIdAndUpdate(idSucursal, params, {new: true}, (err, sucursalEditada)=>{
    if(err) return res.status(500).send({mensaje: 'Error  en la peticion'})

    if(!sucursalEditada) return res.status(500).send({mensaje: 'No se ha podido editar las sucursal'})

    return res.status(200).send({ sucursalEditada })
  })
}

function RemoveSucursal(req, res){

  var idSucursal = req.params.id;

  if(req.user.rol != 'Admin'){
    return res.status(500).send({mensaje: 'Solo el rol tipo admin puede eliminar las sucursales'});
  }

  Sucursal.findByIdAndRemove(idSucursal, ((err, sucursalEliminada)=>{
    if(err) return res.status(500).send({mensaje: 'Error en la peticion'})

    if(!sucursalEliminada) return res.status(500).send({mensaje: 'No se ha podido eliminar la sucursal'})

    return res.status(200).send({ sucursalEliminada })
  }))
}

module.exports = {
  ejemploSucursal,
  AgregarSucursal,
  getSucursal,
  getSucursalID,
  UpdateSucursal,
  RemoveSucursal
  
}
