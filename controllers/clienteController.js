const Clientes = require('../models/Clientes'); //Importamos el Model Cliente, para q reconozca la BD


//Agregar un nuevo Cliente
exports.nuevoCliente = async (req,res,next) => {    //nombre del metodo o funcion nuevoCliente

    const cliente = new Clientes(req.body);
    
    try {
    //Almacenar el registro        
    await cliente.save();

    res.json({mensaje: 'Se agrego un nuevo Cliente'});

    } catch (error) {

        res.json(error);    //mandar el error descubierton, si mandamos {error} se envuelve en otra capa de objeto MAL practica
        next();
    }

}

//Mostrar Clientes 
exports.mostrarClientes = async (req,res,next) => {    //nombre del metodo o funcion mostrarClientes

    try {
    //mostrar Registros        
        const clientes = await Clientes.find({});       //Metodo para traer todos los clientes
    
        res.json(clientes);

    } catch (error) {

        console.log(error);
        next();
    }

}

//Mostrar Un Cliente 
exports.mostrarCliente = async (req,res,next) => {    //nombre del metodo o funcion mostrarClientes

     
        const cliente = await Clientes.findById(req.params.idCliente);       //Metodo para traer un cliente
    
        if(!cliente){
            res.json({mensaje: 'Ese cliente no Existe'});
            next();
        }
        
        //mostrar un cliente en Json 
        res.json(cliente);
        
}

//Actualizar Un Cliente 
exports.actualizarCliente = async (req,res,next) => {    //nombre del metodo o funcion actualizarClientes

     
    try {
    //buscar un Registro
        const cliente = await Clientes.findOneAndUpdate({ _id : req.params.idCliente }, //Metodo para actualizar un cliente Busqueda por _id de la BD MONGOOSE
            req.body,{
                new: true           //Retorne el nuevo valor corregido
            }
        );       
    
        res.json(cliente);

    } catch (error) {

        res.json(error); //retornamos el error en json para q el api pueda revisarlo
        next();
    }
        
}

//Eliminar Un Cliente 
exports.eliminarCliente = async (req,res,next) => {    //nombre del metodo o funcion eliminarCliente

    try {
    //buscar un Registro
        const cliente = await Clientes.findOneAndDelete({ _id : req.params.idCliente }); //Metodo para eliminar un cliente Busqueda por _id de la BD MONGOOSE      
    
        res.json({mensaje: 'El cliente se ha eliminado'});

    } catch (error) {

        console.log(error);
        next();
    }
        
}