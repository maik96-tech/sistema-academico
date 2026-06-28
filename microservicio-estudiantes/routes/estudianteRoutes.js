const express = require('express');
const router = express.Router();
const controller = require('../controllers/estudianteController');

router.get('/', controller.listarEstudiantes);
router.post('/', controller.crearEstudiante);

module.exports = router;
