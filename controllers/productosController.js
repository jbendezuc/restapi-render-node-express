const Productos = require('../models/Productos'); //Importamos el Model Productos, para q reconozca la BD

const multer = require('multer');
const shortid = require('shortid');     //Importamos para generar ID seguros

//Configuracion de Multer para guardar archivos CARGADOS
const configuracionMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname + '../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Formato no válido'))
        }
    }
}

// Pasar la configiguración y el campo
const upload = multer(configuracionMulter).single('imagen');

// Sube un archivo
exports.subirArchivo = (req, res, next) => {
    upload(req, res, function (error) {
        if (error) {
            res.json({ mensaje: error })
        }
        return next();
    })
}

//Agregar un nuevo Producto
exports.nuevoProducto = async (req,res,next) => {    //nombre del metodo o funcion nuevoProducto

    const producto = new Productos(req.body);   //Agregamos un Producto

    try {

        if(req.file.filename){                      //Verificamos si hay un archivo subido en el body
            producto.imagen = req.file.filename
        }
        //Almacenar el registro        
        await producto.save();

        res.json({mensaje: 'Se agrego un nuevo Producto'});

    } catch (error) {

        console.log(error);
        next();
    }

}

//Mostrar Productos
exports.mostrarProductos = async (req,res,next) => {    //nombre del metodo o funcion mostrarProductos

    try {
     
        const productos = await Productos.find({}); //Buscamos todos los productos

        res.json(productos);

    } catch (error) {

        console.log(error);
        next();
    }

}

//Mostrar Productos
exports.mostrarProducto = async (req,res,next) => {    //nombre del metodo o funcion mostrarProducto
     
    const producto = await Productos.findById(req.params.idProducto);   //mostramos un producto ESPECIFICO

    if(!producto){
        res.json({mensaje: 'No existe ese Producto'});
        return next();
    }

    //Mostrar el Producto encontrado
    res.json(producto);


}


// Actualizar un producto por su id
exports.actualizarProducto = async (req, res, next) => {

    const { idProducto } = req.params;

    try {
        // Construir un nuevo producto
        let nuevoProducto = req.body;

        // Verificar si hay imagen nueva
        if (req.file) {
            nuevoProducto.imagen = req.file.filename;
        } else {
            let productoAnterior = await Productos.findById(idProducto);
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await Productos.findOneAndUpdate({ _id: idProducto },        //ACTUALIZAMOS EL PRODUCTO
            nuevoProducto, {
            new: true
        });

        res.json({
            producto,
            mensaje: 'Producto actualizado',
            status: 200
        });
    } catch (error) {
        console.log(error);
        next();
    }
}

exports.eliminarProducto = async (req,res,next) => {

    try {
        
        await Productos.findByIdAndDelete({_id : req.params.idProducto});   //Buscamos el producto y lo ELIMINAMOS

        res.json({mensaje: 'El Producto se ha eliminado Correctamente'})

    } catch (error) {
        console.log(error);
        next();
    }

}

exports.buscarProducto = async (req,res,next) => {
    try {
        
        //Obtenemos la query o consulta
        const {query} = req.params;
        const producto = await Productos.find({nombre: new RegExp(query,'i')}); //REALIZAR LA BUSQUEDA CON EXPRESIONES REGULARES INSENSITIVE, para que pueda encontrar el valor ya sea en
        //en mayuscula miniscula o la palabra similar al nombre Vue VU vueJs VueJS
        
        res.json(producto);

    } catch (error) {
        console.log(error);
        next();
    }
}

// Actualizar Producto
/* exports.actualizarProducto = async (req,res,next) => {

    try {
        
        //Construir un nuevo Producto (PASAMOS TODOS LOS DATOS DEL body a la variable)
        let nuevoProducto = req.body;
    console.log(req.body);
        //verificar si hay imagen nueva
        if(req.file){   //validmos si hay cargado ese campo
            nuevoProducto.imagen = req.file.filename;
        }else{
            let productoAnterior = await Productos.findById(req.params.idProducto);
            nuevoProducto.imagen = productoAnterior.imagen;
        }

        let producto = await Productos.findOneAndUpdate({_id : req.params.idProducto},
            nuevoProducto,{
                new:true
            }
        );

        res.json(producto);


    } catch (error) {
        console.log(error);
        next();
    }

} */