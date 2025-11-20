import express from "express";
import multer from "multer";
import path from "path";
import { verificarCertificado, registrarCertificado } from "../controllers/certificadoController.js";

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("public", "certificados"));
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const safeName = file.originalname.replace(/\s+/g, "-");
    cb(null, `${timestamp}-${safeName}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
  fileFilter: (req, file, cb) => {
    // Solo PDF
    if (file.mimetype === "application/pdf") cb(null, true)
    else cb(new Error("Solo se permiten archivos PDF"), false)
  }
});

router.get("/:codigo", verificarCertificado);
router.post("/", upload.single("archivo"), registrarCertificado);

export default router;
