const jwt = require("jsonwebtoken");

module.exports = (req,res,next) =>{

    //autorizacion por el header, METODO PARA OBTENER LA AUTHORIZACION del HEAD -> GET
    const authHeader = req.get('Authorization');

    if(!authHeader){
        //Permite crear un error personalizado
        const error = new Error('No autenticado, no hay JWT');
        error.statusCode = 401; //Edita el estado a 401 error
        throw error; //Muestra el error, deja de ejecutarse el codigo
    }

    //Obtener el token
    const token = authHeader.split(' ')[1] //OBtenemos el token y cortamos el espacio, y obtenemos la posicion 1
    //cuando obtenemos el Token, obtenemos esto=> 
        // Authorization: Bearer 8476586454312155
    
    //Revisar Token
    let revisarToken;
    
    try {
        //Metodo para revisar token, con verify
        //ERRORES, EXPIRADO - LLAVE SECRETA DIFERENTE, OTRO TOKEN
        revisarToken = jwt.verify(token,'LLAVE_SECRETA')
    } catch (error) {
        error.statusCode = 500;
        throw error;
    }

    //Si es un token Valido, pero hay algun error
    if(!revisarToken){
        const error = new Error('No autenticado');
        error.statusCode = 401;
        throw error;
    }

    next();
}