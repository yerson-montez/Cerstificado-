-- Script para crear base y tabla localmente
CREATE DATABASE IF NOT EXISTS certificados_db;
USE certificados_db;

CREATE TABLE IF NOT EXISTS certificados (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre_alumno VARCHAR(100),
  curso VARCHAR(100),
  codigo VARCHAR(50) UNIQUE,
  url_certificado VARCHAR(255),
  fecha_emision DATETIME
);
