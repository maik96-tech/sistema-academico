CREATE DATABASE IF NOT EXISTS sistema_academico;
USE sistema_academico;

-- =========================================================================
-- TABLAS CORREGIDAS SEGÚN ENUNCIADO
-- =========================================================================

CREATE TABLE IF NOT EXISTS estudiantes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nombres VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    correo VARCHAR(100) UNIQUE NOT NULL,
    carrera VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS cursos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    creditos INT NOT NULL,
    docente VARCHAR(100) NOT NULL
);

-- =========================================================================
-- PROCEDIMIENTOS ALMACENADOS (ESTUDIANTES)
-- =========================================================================
DELIMITER //

CREATE PROCEDURE sp_crear_estudiante(IN p_codigo VARCHAR(20), IN p_nombres VARCHAR(100), IN p_apellidos VARCHAR(100), IN p_correo VARCHAR(100), IN p_carrera VARCHAR(100))
BEGIN
    INSERT INTO estudiantes (codigo, nombres, apellidos, correo, carrera) VALUES (p_codigo, p_nombres, p_apellidos, p_correo, p_carrera);
    SELECT LAST_INSERT_ID() AS id;
END //

CREATE PROCEDURE sp_listar_estudiantes()
BEGIN
    SELECT * FROM estudiantes;
END //

CREATE PROCEDURE sp_obtener_estudiante(IN p_id INT)
BEGIN
    SELECT * FROM estudiantes WHERE id = p_id;
END //

CREATE PROCEDURE sp_actualizar_estudiante(IN p_id INT, IN p_codigo VARCHAR(20), IN p_nombres VARCHAR(100), IN p_apellidos VARCHAR(100), IN p_correo VARCHAR(100), IN p_carrera VARCHAR(100))
BEGIN
    UPDATE estudiantes SET codigo = p_codigo, nombres = p_nombres, apellidos = p_apellidos, correo = p_correo, carrera = p_carrera WHERE id = p_id;
END //

CREATE PROCEDURE sp_eliminar_estudiante(IN p_id INT)
BEGIN
    DELETE FROM estudiantes WHERE id = p_id;
END //

-- =========================================================================
-- PROCEDIMIENTOS ALMACENADOS (CURSOS)
-- =========================================================================

CREATE PROCEDURE sp_crear_curso(IN p_codigo VARCHAR(20), IN p_nombre VARCHAR(100), IN p_creditos INT, IN p_docente VARCHAR(100))
BEGIN
    INSERT INTO cursos (codigo, nombre, creditos, docente) VALUES (p_codigo, p_nombre, p_creditos, p_docente);
    SELECT LAST_INSERT_ID() AS id;
END //

CREATE PROCEDURE sp_listar_cursos()
BEGIN
    SELECT * FROM cursos;
END //

CREATE PROCEDURE sp_obtener_curso(IN p_id INT)
BEGIN
    SELECT * FROM cursos WHERE id = p_id;
END //

CREATE PROCEDURE sp_actualizar_curso(IN p_id INT, IN p_codigo VARCHAR(20), IN p_nombre VARCHAR(100), IN p_creditos INT, IN p_docente VARCHAR(100))
BEGIN
    UPDATE cursos SET codigo = p_codigo, nombre = p_nombre, creditos = p_creditos, docente = p_docente WHERE id = p_id;
END //

CREATE PROCEDURE sp_eliminar_curso(IN p_id INT)
BEGIN
    DELETE FROM cursos WHERE id = p_id;
END //

DELIMITER ;
