const db = require('../config/db');

const Estudiante = {
    init: async () => {
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

        // Procedimientos Almacenados completos para el CRUD
        await db.query(`DROP PROCEDURE IF EXISTS sp_crear_estudiante;`);
        await db.query(`CREATE PROCEDURE sp_crear_estudiante(IN p_codigo VARCHAR(20), IN p_nombres VARCHAR(100), IN p_apellidos VARCHAR(100), IN p_correo VARCHAR(100), IN p_carrera VARCHAR(100)) BEGIN INSERT INTO estudiantes (codigo, nombres, apellidos, correo, carrera) VALUES (p_codigo, p_nombres, p_apellidos, p_correo, p_carrera); SELECT LAST_INSERT_ID() AS id; END`);

        await db.query(`DROP PROCEDURE IF EXISTS sp_listar_estudiantes;`);
        await db.query(`CREATE PROCEDURE sp_listar_estudiantes() BEGIN SELECT * FROM estudiantes; END`);

        await db.query(`DROP PROCEDURE IF EXISTS sp_obtener_estudiante;`);
        await db.query(`CREATE PROCEDURE sp_obtener_estudiante(IN p_id INT) BEGIN SELECT * FROM estudiantes WHERE id = p_id; END`);

        await db.query(`DROP PROCEDURE IF EXISTS sp_actualizar_estudiante;`);
        await db.query(`CREATE PROCEDURE sp_actualizar_estudiante(IN p_id INT, IN p_codigo VARCHAR(20), IN p_nombres VARCHAR(100), IN p_apellidos VARCHAR(100), IN p_correo VARCHAR(100), IN p_carrera VARCHAR(100)) BEGIN UPDATE estudiantes SET codigo = p_codigo, nombres = p_nombres, apellidos = p_apellidos, correo = p_correo, carrera = p_carrera WHERE id = p_id; END`);

        await db.query(`DROP PROCEDURE IF EXISTS sp_eliminar_estudiante;`);
        await db.query(`CREATE PROCEDURE sp_eliminar_estudiante(IN p_id INT) BEGIN DELETE FROM estudiantes WHERE id = p_id; END`);
    },

    crear: async (d) => { const [rows] = await db.query('CALL sp_crear_estudiante(?, ?, ?, ?, ?)', [d.codigo, d.nombres, d.apellidos, d.correo, d.carrera]); return rows[0]; },
    listar: async () => { const [rows] = await db.query('CALL sp_listar_estudiantes()'); return rows[0]; },
    obtener: async (id) => { const [rows] = await db.query('CALL sp_obtener_estudiante(?)', [id]); return rows[0][0]; },
    actualizar: async (id, d) => { await db.query('CALL sp_actualizar_estudiante(?, ?, ?, ?, ?, ?)', [id, d.codigo, d.nombres, d.apellidos, d.correo, d.carrera]); },
    eliminar: async (id) => { await db.query('CALL sp_eliminar_estudiante(?)', [id]); }
};

module.exports = Estudiante;

