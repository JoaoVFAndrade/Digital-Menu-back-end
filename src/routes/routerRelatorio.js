const express = require('express');
const router = express.Router();
const token = require('../middleware/jwtToken');
const relatorioController = require('../controllers/relatorioController');

router.get('/relatorio/total', token, relatorioController.totalPedidos);
router.get('/relatorio/qtde/vendido', token, relatorioController.listarQtdeVendidaPorItem);
router.get('/relatorio/itens/mais/vendidos', token, relatorioController.listarItensMaisVendidos);
router.get('/relatorio/total/pedido/mes', token, relatorioController.totalPedidosPorMes);
router.get('/relatorio/itens/agrupados', token, relatorioController.listarItensPorPedidoAgrupado);
router.get('/relatorio/calcular/gorjeta', token, relatorioController.calcularGorjeta);

module.exports = router;
