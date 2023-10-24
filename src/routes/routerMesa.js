const express = require('express');
const router = express.Router();
const token = require('../middleware/token');
const mesaController = require('../controllers/mesaController');

router.use('/mesa/check', mesaController.checkMesas);
router.get('/mesas', (req, res) => {res.status(200).send('gg')});
router.get('/mesa/todas-mesas',  mesaController.listarTodasMesas);
router.get('/mesa/status', token, mesaController.listarPorStatus);
router.get('/mesa/dados', token, mesaController.listarPorId);
router.post('/mesa', mesaController.insertMesa);
router.put('/mesa/:idMesa', mesaController.ativarMesa);
router.delete('/mesa/:idMesa', mesaController.desativarMesa);

module.exports = router;