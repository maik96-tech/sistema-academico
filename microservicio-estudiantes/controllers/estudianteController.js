const Estudiante = require('../models/estudianteModel');

const listarEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiante.listar();
        res.json(estudiantes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const crearEstudiante = async (req, res) => {
    try {
        const resultado = await Estudiante.crear(req.body);
        res.status(201).json({ mensaje: "Estudiante registrado con éxito", id: resultado.id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    listarEstudiantes,
    crearEstudiante
};

