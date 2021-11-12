
const mongoose = require("mongoose")
const app = require("./app")
var Empresa = require("./src/controladores/empresa.controlador")

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/dbSucursales', {useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    
    Empresa.empresaAdmin()

    console.log('Se encuentra conectado a la base de datos');

    app.listen(3000, function() {
        console.log("Servidor corriendo en el puerto 3000");
    })
}).catch(err => console.log(err))