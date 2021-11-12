'use strict'

var Admin = require("../modelos/admin.modelo");
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../servicios/jwt')

function ejemplo(req, res){
    res.status(200).send({mensaje: 'Ejemplo desde empresas'});
}

function empresaAdmin(req, res){
    
    var modelAdmin = new Admin();

    modelAdmin.usuario = 'AdminMc';
    modelAdmin.password = '123456';
    modelAdmin.rol = 'Admin';

    Admin.findOne({usuario: modelAdmin.usuario}, (err, adminCreado)=>{
        if(err) return res.status(500).send({mensaje: 'Error en la peticion'});
        if(adminCreado){
            return console.log('Error la empresa admin ya existe');
        } else{
            bcrypt.hash(modelAdmin.password, null, null, (err, passwordEncriptada)=>{
                if(err) return res.status(500).send({mensaje:'Error  en la peticion'});

                if(passwordEncriptada){
                    modelAdmin.password = passwordEncriptada;
                    modelAdmin.usuario = modelAdmin.usuario;
                    modelAdmin.rol = 'Admin'

                    modelAdmin.save((err,adminGuardado)=>{
                        if(err) return res.status(500).send({mensaje: 'Error  en la peticion al creae el administrador'});
                        if(adminGuardado){
                            return console.log('Se han guardado los datos del administrador correctamente');
                        
                             }else{
                                 return res.status(500).send({mensaje:'No se ha podido crear el usuario admin correctamente'});

                             }
                        })
                    }else{
                        return res.status(500).send({mensaje: 'No se han podido decoficar los datos de la contraseña'})
                    }
                })
            }
        })
    }

    function loginAdmin(req, res){
        var params = req.body;

        Admin.findOne({usuario: params.usuario}, (err, usuarioEncontrado)=>{
            if(err) return res.status(500).send({ mensaje: 'Error ne la peticion'});

            if(usuarioEncontrado){
                bcrypt.compare(params.password, usuarioEncontrado.password,(err, passVerificada) => {
                    if(passVerificada){
                        if(params.getToken === 'true'){
                            return res.status(200).send({
                                token: jwt.createToken(usuarioEncontrado)
                            })

                        }else{
                            usuarioEncontrado.password= undefined;
                            return res.status(200).send({ usuarioEncontrado});
                        }

                    }else{
                        return res.status(500).send({mensaje:'El usuario no se ha podido identificar'});
                    }
                })
            }else{
                return res.status(500).send({ mensaje: 'Error al buscar el usuario'});
            }
        })
    }





module.exports = {
    ejemplo,
    empresaAdmin,
    loginAdmin
}