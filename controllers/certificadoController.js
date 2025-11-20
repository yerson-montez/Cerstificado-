import { obtenerCertificado, guardarCertificado } from "../models/certificadoModel.js";
import { generarQR } from "../services/qrService.js";
import path from "path";
import fs from "fs";

export const verificarCertificado = async (req, res) => {
  try {
    const codigo = req.params.codigo;
    const certificado = await obtenerCertificado(codigo);
    res.render("resultado", { certificado });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error interno");
  }
};

export const registrarCertificado = async (req, res) => {
  try {
    const { nombre, curso, codigo } = req.body;
    const archivo = req.file;

    if (!nombre || !curso || !codigo || !archivo) {
      return res.status(400).json({ mensaje: "Faltan datos o archivo" });
    }

    // Guardamos el PDF en public/certificados (multer ya lo hizo)
    const url_certificado = `/certificados/${archivo.filename}`;

    // URL de verificación pública (usa BASE_URL si está en env)
    const baseUrl = process.env.BASE_URL || `${req.protocol}://${req.get("host")}`;
    const url_verificacion = `${baseUrl}/api/certificados/${codigo}`;

    // Guardar en DB
    await guardarCertificado(nombre, curso, codigo, url_certificado);

    // Generar QR y guardarlo
    const qrPath = await generarQR(url_verificacion, codigo);

    return res.json({
      mensaje: "Certificado guardado correctamente",
      codigo,
      url_certificado,
      qr: qrPath,
      url_verificacion
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ mensaje: "Error al guardar certificado", error: err.message });
  }
};
