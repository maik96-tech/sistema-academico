const Estudiante = require('../models/estudianteModel');

exports.registrar = async (req, res) => {
    try { const r = await Estudiante.crear(req.body); res.status(201).json({ mensaje: "Estudiante registrado con éxito", id: r.id }); } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.listar = async (req, res) => {
    try { res.json(await Estudiante.listar()); } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.consultar = async (req, res) => {
    try { const r = await Estudiante.obtener(req.params.id); r ? res.json(r) : res.status(404).json({ mensaje: "Estudiante no encontrado" }); } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.actualizar = async (req, res) => {
    try { await Estudiante.actualizar(req.params.id, req.body); res.json({ mensaje: "Estudiante actualizado" }); } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.eliminar = async (req, res) => {
    try { await Estudiante.eliminar(req.params.id); res.json({ mensaje: "Estudiante eliminado con éxito" }); } catch (e) { res.status(500).json({ error: e.message }); }
};

