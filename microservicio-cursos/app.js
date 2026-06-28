const express = require('express');
const Curso = require('./models/cursoModel');
const cursoRoutes = require('./routes/cursoRoutes');

const app = express();
app.use(express.json());

app.use('/cursos', cursoRoutes);

const PORT = 3002;

Curso.init()
    .then(() => {
        app.listen(PORT, () => console.log(`🚀 Microservicio Cursos corriendo en puerto ${PORT}`));
    })
    .catch(err => console.error("❌ Error de inicialización:", err));

module.exports = app;
