import db from "../config/db.js";

export const obtenerCertificado = async (codigo) => {
  const [rows] = await db.execute("SELECT * FROM certificados WHERE codigo = ?", [codigo]);
  return rows[0] || null;
};

export const guardarCertificado = async (nombre, curso, codigo, url_certificado) => {
  await db.execute(
    `INSERT INTO certificados (nombre_alumno, curso, codigo, url_certificado, fecha_emision)
     VALUES (?, ?, ?, ?, NOW())`,
    [nombre, curso, codigo, url_certificado]
  );
};
