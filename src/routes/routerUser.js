const express = require('express');
const router = express.Router();
const UserController = require('../controllers/userController');
const token = require('../middleware/jwtToken')
router.get('/', (req,res) => {res.status(200).send("Bem-vindo à minha API")});

//login e registros:
router.use('/login', UserController.login);
router.post('/register', UserController.register);

//Rotas protegidas que requerem token JWT válido:


router.get('/user/nome', token, UserController.getByName);
router.get('/user', token, UserController.getAll);
router.get('/active', token, UserController.getAllUsersActives);
router.get('/user/catch', token, UserController.getCategoriaPorNome);
router.delete('/user',token, UserController.delete);
router.put('/user', token, UserController.put);
router.post('/verifica-token', UserController.verificaToken);

module.exports = router;
