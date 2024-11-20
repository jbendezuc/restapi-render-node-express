const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const productosController = require('../controllers/productosController');
const pedidosController = require('../controllers/pedidosController');
const usuariosController = require('../controllers/usuariosController');

// MIDDLEWARE para proteger las rutas
const auth = require('../middleware/auth');

module.exports = function (){

/* ----------------- CLIENTES --------------------- */
    //Agregar nuevos Clientes via POST
    router.post('/clientes', auth, clienteController.nuevoCliente);

    //Obtener todos los Clientes via GET
    router.get('/clientes', auth, clienteController.mostrarClientes);

    //Mostrar un Cliente en Especifico (ID) via GET
    router.get('/clientes/:idCliente', auth, clienteController.mostrarCliente);

    //Actualizar un Cliente en Especifico (ID) via PUT
    router.put('/clientes/:idCliente', auth, clienteController.actualizarCliente);

    //Eliminar un Cliente en Especifico (ID) via DELETE
    router.delete('/clientes/:idCliente', auth, clienteController.eliminarCliente);


/* ----------------- PRODUCTOS --------------------- */
    router.post('/productos', auth, productosController.subirArchivo, productosController.nuevoProducto);

    router.get('/productos', auth, productosController.mostrarProductos);

    router.get('/productos/:idProducto', auth, productosController.mostrarProducto);

    router.put('/productos/:idProducto', auth, productosController.subirArchivo, productosController.actualizarProducto);

    router.delete('/productos/:idProducto', auth, productosController.eliminarProducto);

    //Buscar Productos con las caracteristicas
    router.post('/productos/busqueda/:query',auth, productosController.buscarProducto)

/* ----------------- PEDIDOS --------------------- */
    router.post('/pedidos/nuevo/:id', auth, pedidosController.nuevoPedido);

    router.get('/pedidos', auth, pedidosController.mostrarPedidos);

    router.get('/pedidos/:idPedido', auth, pedidosController.mostrarPedido);

    router.put('/pedidos/:idPedido', auth, pedidosController.actualizarPedido);

    router.delete('/pedidos/:idPedido', auth, pedidosController.eliminarPedido);

/* -----------------  USUARIOS ------------------------ */
    router.post('/crear-cuenta', auth, usuariosController.registrarUsuario);
    router.post('/iniciar-sesion',usuariosController.autenticarUsuario)
    
    
    return router;
}