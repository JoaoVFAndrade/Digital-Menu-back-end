const express = require('express');
const router = express.Router();
const token = require('../middleware/jwtToken');
const pedidoController = require('../controllers/pedidoController');

router.get('/pedidos/all', token, pedidoController.listarPedido);
router.get('/pedidos/status', token, pedidoController.listarPedidoPorStatus);
router.get('/pedidos/dia', token, pedidoController.listarProdutoPorDia);
router.get('/pedidos/faixa-preco', token, pedidoController.listarProdutoPorFaixaDePreco);
router.get('/pedidos/faixa-dia', token, pedidoController.listarProdutoPorFaixaDia);
router.get('/pedidos/venda-por-dia', token, pedidoController.listarVendasPorDia);
router.post('/pedidos', token, pedidoController.adicionaPedido);
router.put('/pedidos/alterar-item', token, pedidoController.atualizaPedidoItemAlterado);
router.put('/pedidos/atualizar-vazio', token, pedidoController.atualizarPedidoVazio);
router.delete('/pedidos', token, pedidoController.deletarPedido);
router.post('/pedidos/cancelar', token, pedidoController.cancelarPedido);

module.exports = router;