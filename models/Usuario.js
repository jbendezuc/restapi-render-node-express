const mongoose = require('mongoose'); //CONEXION A LA BD
const Schema = mongoose.Schema; //PERMITE CREAR CAMPOS EN LA BD

const usuariosSchema = new Schema({
    email:{
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    nombre:{
        type: String,
        required: 'Agrega tu Nombre'
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Usuarios', usuariosSchema); //CREAMOS EL MODELO, LO LLAMAMOS USUARIO , y le damos la tabla usauriosSchema