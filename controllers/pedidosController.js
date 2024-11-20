const Pedidos = require('../models/Pedidos');

exports.nuevoPedido = async(req,res,next)=> {

    const pedido = new Pedidos(req.body);

    try {
        await pedido.save();

        res.json({mensaje: 'Se registro Correctamente'})
        
    } catch (error) {
        
        console.log(error);
        next();

    }

}

exports.mostrarPedidos = async(req,res,next)=>{

    try {
        //.populate('nombre del campo que se encuentra como ID que buscara informacion por referencia en su tabla creada')
        const pedidos = await Pedidos.find({}).populate('cliente').populate({
            path: 'pedido.producto',    //indica la ruta del campo q esta como ID 
            model: 'Productos'          //el model donde debe buscar la informacion anidada
        });

        res.json(pedidos);

    } catch (error) {
        
        console.log(error);
        next();

    }

}

exports.mostrarPedido = async(req,res,next) => {

    const pedido = await Pedidos.findById(req.params.idPedido).populate('cliente').populate({
        path: 'pedido.producto',
        model: 'Productos'
    });

    if(!pedido){
           res.json({mensaje: 'Ese Pedido no Existe'});
            next();
        }
        
        //mostrar un pedido en Json 
        res.json(pedido);

}

//Actualizar Pedido VIA ID
exports.actualizarPedido = async(req,res,next) => {

    try {
        let pedido = await Pedidos.findOneAndUpdate({_id : req.params.idPedido }, req.body,{
            new: true
        }).populate('cliente').populate({
            path:'pedido.producto',
            model: 'Productos'
        })

        res.json(pedido);

    } catch (error) {
        console.log(error);
        next();
    }

}

//Eliminar Pedido via ID
exports.eliminarPedido = async(req,res,next) =>{

    try {
        
        await Pedidos.findOneAndDelete({id: req.params.idPedido});
        res.json({mensaje: 'El pedido se Elimino Correctamente'});

    } catch (error) {
        console.log(error);
        next();
    }

}