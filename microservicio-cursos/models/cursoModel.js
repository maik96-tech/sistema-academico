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
        await db.query(`DROP PROCEDURE IF EXISTS sp_listar_cursos;`);
        await db.query(`
            CREATE PROCEDURE sp_listar_cursos()
            BEGIN
                SELECT * FROM cursos;
            END
        `);
        await db.query(`DROP PROCEDURE IF EXISTS sp_crear_curso;`);
        await db.query(`
            CREATE PROCEDURE sp_crear_curso(IN p_codigo VARCHAR(20), IN p_nombre VARCHAR(100), IN p_creditos INT, IN p_docente VARCHAR(100))
            BEGIN
                INSERT INTO cursos (codigo, nombre, creditos, docente) VALUES (p_codigo, p_nombre, p_creditos, p_docente);
                SELECT LAST_INSERT_ID() AS id;
            END
        `);
    },

    listar: async () => {
        await db.query(`USE sistema_academico;`);
        const [rows] = await db.query('CALL sp_listar_cursos()');
        return rows[0];
    },

    crear: async (datos) => {
        await db.query(`USE sistema_academico;`);
        const [rows] = await db.query('CALL sp_crear_curso(?, ?, ?, ?)', [datos.codigo, datos.nombre, datos.creditos, datos.docente]);
        return rows[0][0];
    }
};

module.exports = Curso;
