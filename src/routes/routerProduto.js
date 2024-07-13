const express = require('express');
const router = express.Router();
const multer = require('multer');
const token = require('../middleware/token');
const produtoController = require('../controllers/produtoController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'C:/quartosemestre/DigitalMenuBack/Digital-Menu-back-end/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname); 
    },
});

const fileFilter = (req, file, cb) => {
    const extensoesAceitas = ['image/png', 'image/jpg', 'image/jpeg'];
    
    if (extensoesAceitas.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});


router.post('/produto', upload.single('imagem'), token, produtoController.criarPoduto);
router.get('/produto', token, produtoController.listarProduto);
router.get('/produto/imagens', token, produtoController.listarProdutosComImagens);
router.get('/produto/nome', token, produtoController.listarProdutoPorId);
router.get('/produto/ativo', token, produtoController.listarProdutoAtivo);
router.get('/produto/preco', token, produtoController.listarProdutoPorFaixaDePreco);
router.get('/produto/descricao', token, produtoController.listarProdutoPorDescricao);
router.get('/produto/categoria', token, produtoController.listarProdutoPorCategoria);
router.get('/produto/status', token, produtoController.listarProdutoPorStatus);
router.put('/produto', token, produtoController.alterarProduto);
router.put('/produto/altera-preco', token, produtoController.alterarPrecoDoProduto);
router.delete('/produto/:idproduto', token, produtoController.deletarProduto);
module.exports = router;