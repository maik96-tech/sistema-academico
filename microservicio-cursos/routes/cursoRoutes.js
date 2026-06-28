const express = require('express');
const router = express.Router();
const controller = require('../controllers/cursoController');

router.get('/', controller.listarCursos);
router.post('/', controller.crearCurso);

module.exports = router;
