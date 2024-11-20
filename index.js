const express = require('express'); //Importamos el servidor express
const routes = require('./routes')  //Importamos Routas
const mongoose = require('mongoose'); //Importamos mongoose, conectar la  BD 
const bodyParser = require('body-parser'); //Importamos elbodyParser para leer datos
//const path = require('path');
require('dotenv').config({path:'variables.env'}); //Importamos el dotenv para PODER USAR LAS VARIABLES DE ENTORNO process.env.VARIABLE_ENTORNO

const cors = require('cors');   //Importamos Cors para darle acceso a otras APP q se conecten a nuestra API
//const { callbackify } = require('util');

//Conectar BD Mongoose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {});

/* mongoose.connect('mongodb://localhost/restapi',{
    useNewUrlParser: true                   //YA NOSE UTILIZA esto, porq fue deprecado, ahora es automatico, ya se INCLUYE
}); */


//Crear el servidor o App
const app = express();

//habilitar bodyparser
app.use(bodyParser.json()); //Permite leer json
app.use(bodyParser.urlencoded({extended:true})); //permite leer los valores en texto plano

//Habilitar la carpeta Publica para q puedan ingresar, en este caso. uploads
app.use(express.static('uploads'));

//Definir que Dominios pueden recibir la peticion de la WEB (cuando se despliega)
const whiteList = [process.env.FRONTEND_URL];    //Lista de URLs aceptadas en el servidor para peticiones

const corsOptions = {                            //Opciones de configuracion cuand ose ejecute el programa
    origin: (origin,callback)=>{                    //el Origin sera la URL definida abajo, listen(5000)
        //console.log(origin); //Corre en el puerto 5173, muestra ese PUERTO
        //Revisar si la peticion viene de un servidor que esta en whiteList
        const existe = whiteList.some(dominio => dominio === origin);
        if (existe) {
            callback(null,true); //Si existe, normal sigue el siguiente middleware
        }else{
            callback(new Error('No permitido por CORS')); //ssi es falso, se corta el SERVIDOR
        }
    }
}

//Habilitar Cors [SE HABILITA AL FINAL EL CORS para q CAPTURE TODA LA CONFIGURACION Y CARGA DE ARCHIVOS del FLUJO]
app.use(cors(corsOptions)); //Permite darle acceso a otros APP a nuestra API para q sean CONSUMIDAS


//Routas de la App
app.use('/', routes() );


//Puerto para USARLO LOCALMENTE
//app.listen(5000); 
//Puerto para INICIAR APP
const port = process.env.PORT || 5000;
const host = process.env.HOST || '0.0.0.0';

app.listen(port,host,() => {
    console.log('El server esta funcionando')
})

