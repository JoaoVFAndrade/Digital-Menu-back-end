const express = require('express');
const router = express.Router();
const token = require('../middleware/token');
const itemController = require('../controllers/itemController');

router.get('/pedidos/itens', token, itemController.listarItemPorPedido);
router.get('/pedidos/list/itens', token, itemController.listarPorId);
router.get('/itens/confirmado', token, itemController.listarItensConfirmadosPorPedido);
router.get('/itens/pedidos/:idPedido',  itemController.listarItemDosPedido);
router.put('/itens/:iditem', token, itemController.atualizarItemParaCancelado);
router.put('/itens/pedidos/quantidades/:iditem',  itemController.atualizaQuantidade)
router.post('/itens/add/admin', token, itemController.addItemAdmin);
router.post('/itens', token, itemController.insertItem);


module.exports = router;