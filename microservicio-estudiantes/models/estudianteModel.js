const db = require('../config/db');

const Estudiante = {
    init: async () => {
        // Crear base de datos, tablas y SPs automáticamente si no existen
        await db.query(`CREATE DATABASE IF NOT EXISTS sistema_academico;`);
        await db.query(`USE sistema_academico;`);
        await db.query(`
            CREATE TABLE IF NOT EXISTS estudiantes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                codigo VARCHAR(20) UNIQUE NOT NULL,
                nombres VARCHAR(100) NOT NULL,
                apellidos VARCHAR(100) NOT NULL,
                correo VARCHAR(100) UNIQUE NOT NULL,
                carrera VARCHAR(100) NOT NULL
            );
        `);
        // Crear Procedimiento para listar si no existe
        await db.query(`DROP PROCEDURE IF EXISTS sp_listar_estudiantes;`);
        await db.query(`
            CREATE PROCEDURE sp_listar_estudiantes()
            BEGIN
                SELECT * FROM estudiantes;
            END
        `);
        await db.query(`DROP PROCEDURE IF EXISTS sp_crear_estudiante;`);
        await db.query(`
            CREATE PROCEDURE sp_crear_estudiante(IN p_codigo VARCHAR(20), IN p_nombres VARCHAR(100), IN p_apellidos VARCHAR(100), IN p_correo VARCHAR(100), IN p_carrera VARCHAR(100))
            BEGIN
                INSERT INTO estudiantes (codigo, nombres, apellidos, correo, carrera) VALUES (p_codigo, p_nombres, p_apellidos, p_correo, p_carrera);
                SELECT LAST_INSERT_ID() AS id;
            END
        `);
    },

    listar: async () => {
        await db.query(`USE sistema_academico;`);
        const [rows] = await db.query('CALL sp_listar_estudiantes()');
        return rows[0];
    },

    crear: async (datos) => {
        await db.query(`USE sistema_academico;`);
        const [rows] = await db.query('CALL sp_crear_estudiante(?, ?, ?, ?, ?)', [datos.codigo, datos.nombres, datos.apellidos, datos.correo, datos.carrera]);
        return rows[0][0];
    }
};

module.exports = Estudiante;
