const request = require('supertest');
const app = require('../app');

describe('🧪 Pruebas del Microservicio de Estudiantes', () => {
    test('GET /estudiantes -> Debe listar los estudiantes', async () => {
        const res = await request(app).get('/estudiantes');
        expect(res.statusCode).toBe(200);
    });

    test('POST /estudiantes -> Debe registrar un estudiante con éxito', async () => {
        const nuevoEstudiante = {
            codigo: "A74632",
            nombres: "Michael Darwin",
            apellidos: "Cj Q",
            correo: "maik002@gmail.com",
            carrera: "Ingeniería de Sistemas"
        };
        const res = await request(app).post('/estudiantes').send(nuevoEstudiante);
        expect(res.statusCode).toBe(201);
    });
});
