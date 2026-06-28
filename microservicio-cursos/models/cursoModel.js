const db = require('../config/db');

const Curso = {
    init: async () => {
        await db.query(`USE sistema_academico;`);
        await db.query(`
            CREATE TABLE IF NOT EXISTS cursos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                codigo VARCHAR(20) UNIQUE NOT NULL,
                nombre VARCHAR(100) NOT NULL,
                creditos INT NOT NULL,
                docente VARCHAR(100) NOT NULL
            );
        `);

        // Procedimientos Almacenados completos para el CRUD
        await db.query(`DROP PROCEDURE IF EXISTS sp_crear_curso;`);
        await db.query(`CREATE PROCEDURE sp_crear_curso(IN p_codigo VARCHAR(20), IN p_nombre VARCHAR(100), IN p_creditos INT, IN p_docente VARCHAR(100)) BEGIN INSERT INTO cursos (codigo, nombre, creditos, docente) VALUES (p_codigo, p_nombre, p_creditos, p_docente); SELECT LAST_INSERT_ID() AS id; END`);

        await db.query(`DROP PROCEDURE IF EXISTS sp_listar_cursos;`);
        await db.query(`CREATE PROCEDURE sp_listar_cursos() BEGIN SELECT * FROM cursos; END`);

        await db.query(`DROP PROCEDURE IF EXISTS sp_obtener_curso;`);
        await db.query(`CREATE PROCEDURE sp_obtener_curso(IN p_id INT) BEGIN SELECT * FROM cursos WHERE id = p_id; END`);

        await db.query(`DROP PROCEDURE IF EXISTS sp_actualizar_curso;`);
        await db.query(`CREATE PROCEDURE sp_actualizar_curso(IN p_id INT, IN p_codigo VARCHAR(20), IN p_nombre VARCHAR(100), IN p_creditos INT, IN p_docente VARCHAR(100)) BEGIN UPDATE cursos SET codigo = p_codigo, nombre = p_nombre, creditos = p_creditos, docente = p_docente WHERE id = p_id; END`);

        await db.query(`DROP PROCEDURE IF EXISTS sp_eliminar_curso;`);
        await db.query(`CREATE PROCEDURE sp_eliminar_curso(IN p_id INT) BEGIN DELETE FROM cursos WHERE id = p_id; END`);
    },

    crear: async (d) => { const [rows] = await db.query('CALL sp_crear_curso(?, ?, ?, ?)', [d.codigo, d.nombre, d.creditos, d.docente]); return rows[0]; },
    listar: async () => { const [rows] = await db.query('CALL sp_listar_cursos()'); return rows[0]; },
    obtener: async (id) => { const [rows] = await db.query('CALL sp_obtener_curso(?)', [id]); return rows[0][0]; },
    actualizar: async (id, d) => { await db.query('CALL sp_actualizar_curso(?, ?, ?, ?, ?)', [id, d.codigo, d.nombre, d.creditos, d.docente]); },
    eliminar: async (id) => { await db.query('CALL sp_eliminar_curso(?)', [id]); }
};

module.exports = Curso;

