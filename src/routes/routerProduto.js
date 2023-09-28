const express = require('express');
const router = express.Router();
const token = require('../middleware/jwtToken');
const produtoController = require('../controllers/produtoController');


router.post('/produto', token, produtoController.criarPoduto );
router.get('/produto', token, produtoController.listarProduto);
router.get('/produto/nome', token, produtoController.listarProdutoPorNome);
router.get('/produto/ativo', token, produtoController.listarProdutoAtivo);
router.get('/produto/preco', token, produtoController.listarProdutoPorFaixaDePreco);
router.get('/produto/descricao', token, produtoController.listarProdutoPorDescricao);
router.get('/produto/categoria', token, produtoController.listarProdutoPorCategoria);
router.get('/produto/status', token, produtoController.listarProdutoPorStatus);
router.put('/produto', token, produtoController.alterarProdutoPeloNome);
router.delete('/produto', token, produtoController.deletarProduto);
module.exports = router;