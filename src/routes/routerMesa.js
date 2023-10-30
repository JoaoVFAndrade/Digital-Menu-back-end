const express = require('express');
const router = express.Router();
const token = require('../middleware/token');
const mesaController = require('../controllers/mesaController');

router.use('/mesa/check', mesaController.checkMesas);
router.get('/mesas', (req, res) => {res.status(200).send('gg')});
router.get('/mesa/todas-mesas',  mesaController.listarTodasMesas);
router.get('/mesas/todas-mesas/ativas', token, mesaController.listarTodasAsMesasAtivadas);
router.get('/mesa/status', token, mesaController.listarPorStatus);
router.get('/mesa/dados', token, mesaController.listarPorId);
router.post('/mesa', token, mesaController.insertMesa);
router.put('/mesa/:idMesa', token, mesaController.ativarMesa);
router.delete('/mesa/:idMesa', token, mesaController.desativarMesa);

module.exports = router;