const express = require('express');
const router = express.Router();
const token = require('../middleware/jwtToken');
const itemController = require('../controllers/itemController');

router.get('/pedidos/itens', token, itemController.listarItemPorPedido);
router.get('/pedidos/list/itens', token, itemController.listarPorId);
router.get('/itens/confirmado', token, itemController.listarItensConfirmadosPorPedido);
router.put('/itens/', token, itemController.atualizarItemParaCancelado);
router.post('/itens/add/admin', token, itemController.addItemAdmin);
router.post('/itens', token, itemController.insertItem);


module.exports = router;