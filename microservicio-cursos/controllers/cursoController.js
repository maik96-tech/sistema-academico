const Curso = require('../models/cursoModel');

const listarCursos = async (req, res) => {
    try {
        const cursos = await Curso.listar();
        res.json(cursos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const crearCurso = async (req, res) => {
    try {
        const resultado = await Curso.crear(req.body);
        res.status(201).json({ mensaje: "Curso registrado con éxito", id: resultado ? resultado.id : null });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    listarCursos,
    crearCurso
};
