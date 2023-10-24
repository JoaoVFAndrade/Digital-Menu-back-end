const express = require('express');
const router = express.Router();
const token = require('../middleware/token');
const categoriaController = require('../controllers/CategoriaController');

router.get('/categorias/listar', token, categoriaController.listarCategoria);
router.get('/categorias/listar/ativas', token, categoriaController.listarCategoriaAtivas);
router.get('/categorias/listar/status', token, categoriaController.listarCategoriaPorStatus);
router.get('/categorias/listar-por-id', token, categoriaController.listarPorId);
router.get('/categorias/listar/nome', token, categoriaController.listarPorNome);
router.post('/categorias/criar', categoriaController.criarCategoria);
router.put('/categorias/atualizar', categoriaController.updateCategoria);
router.put('/categorias/ativar/:idCategoria', token, categoriaController.ativarCategoria);
router.delete('/categorias/deletar/:idCategoria',token, categoriaController.deleteCategoria);
router.post('/categorias/criar', token, categoriaController.criarCategoria);
router.put('/categorias/atualizar', token, categoriaController.updateCategoria);
router.put('/categorias/ativar/:idCategoria', token, categoriaController.ativarCategoria);
router.delete('/categorias/deletar/:idCategoria', token, categoriaController.deleteCategoria);


module.exports = router;