const Curso = require('../models/cursoModel');

exports.registrar = async (req, res) => {
    try { const r = await Curso.crear(req.body); res.status(201).json({ mensaje: "Curso registrado con éxito", id: r.id }); } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.listar = async (req, res) => {
    try { res.json(await Curso.listar()); } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.consultar = async (req, res) => {
    try { const r = await Curso.obtener(req.params.id); r ? res.json(r) : res.status(404).json({ mensaje: "Curso no encontrado" }); } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.actualizar = async (req, res) => {
    try { await Curso.actualizar(req.params.id, req.body); res.json({ mensaje: "Curso actualizado" }); } catch (e) { res.status(500).json({ error: e.message }); }
};
exports.eliminar = async (req, res) => {
    try { await Curso.eliminar(req.params.id); res.json({ mensaje: "Curso eliminado" }); } catch (e) { res.status(500).json({ error: e.message }); }
};

