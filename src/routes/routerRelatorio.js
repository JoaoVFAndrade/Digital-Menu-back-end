const express = require('express');
const router = express.Router();
const token = require('../middleware/token');
const relatorioController = require('../controllers/relatorioController');

router.get('/relatorios/total', token, relatorioController.totalPedidos);
router.get('/relatorios/produto/mais/faturado', token , relatorioController.produtoMaisFaturado);
router.get('/relatorios/produto/mais/vendidos',token , relatorioController.produtoMaisVendido);
router.get('/relatorios/produto/arrecadado', token, relatorioController.arrecadacaoPedidoNoMes);

module.exports = router;
