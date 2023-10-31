const express = require('express');
const router = express.Router();
const token = require('../middleware/token');
const produtoController = require('../controllers/produtoController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads'); // Diretório onde os arquivos serão armazenados
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Nome do arquivo no destino
      console.log('file.originalname: ' + file.originalname);
     },
  });
  
const upload  = multer({ storage: storage });


    router.post('/produto', token, (req, res) => {
        upload.single('imagem')(req, res, (err) => {
            if (err) {
                // Trate o erro de upload aqui
                console.error(err);
                return res.status(400).json({ message: 'Erro no upload do arquivo' });
            }

            console.log('upload.single do router : ' + upload.single('imagem'));
            // Se chegou aqui, o upload foi bem-sucedido
            produtoController.criarPoduto(req, res);
        });
    });
    

router.get('/produto', token, produtoController.listarProduto);
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