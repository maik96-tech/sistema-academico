const express = require('express');
const Estudiante = require('./models/estudianteModel');
const estudianteRoutes = require('./routes/estudianteRoutes');

const app = express();
app.use(express.json());

app.use('/estudiantes', estudianteRoutes);

const PORT = 3001;

// Inicializar BD y luego arrancar servidor
Estudiante.init()
    .then(() => {
        app.listen(PORT, () => console.log(`🚀 Microservicio Estudiantes corriendo en puerto ${PORT}`));
    })
    .catch(err => console.error("❌ Error de inicialización:", err));

module.exports = app;
