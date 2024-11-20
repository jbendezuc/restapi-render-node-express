const Usuarios = require('../models/Usuario');
const jwt = require('jsonwebtoken'); //Importamos la libreria JWT
const bcrypt = require('bcrypt'); //IMPORTAMOS la libreria ENCRIPTAR


exports.registrarUsuario = async (req , res) => {
    
    //leer los datos del usuario y colocar en Usuarios
    const usuario = new Usuarios(req.body);
    usuario.password = await bcrypt.hash(req.body.password,12); //haseheamos el password antes de almacenarlo, 12 saltos de seguridad

    try{

        await usuario.save();
        res.json({mensaje:'Usuario Creado Correctamente'});

    }catch(error){

        console.log(error);
        res.json({mensaje: 'hubo un error'});
    }

}

exports.autenticarUsuario = async(req,res,next) => {

    //Destructuramos las variables q recibimos del req.body
    const {email,password}  = req.body;
    
    //Buscar el usuario
    const usuario = await Usuarios.findOne({email: email});  //Buscaremos por el campo email

    if(!usuario){
        
        //Si el usuario no existe
        await res.status(401).json({mensaje:'El usuario no existe'});
        next();

    }else{
        //El usuario existe
        if(!bcrypt.compareSync(password, usuario.password)){    //Metodo de compracion de password y usuario password de la bd
            //Si el password es incorrecto
            await res.status(401).json({mensaje: 'Password Incorrecto'});
            next();
        }else{
            //Si el password Existe, Firmar un Token (creaos un token, introducimos informacion, llave secreta y tiempo expirar)
            const token = jwt.sign({
                //Payload
                email : usuario.email,
                nombre : usuario.nombre,
                id : usuario._id
            },
            //SecretKey
                'LLAVE_SECRETA',
            {
            //Header - Option
                expiresIn : '1h'
            });

            //Retornar el TOKEN
            res.json({ token });
        }

    }
}