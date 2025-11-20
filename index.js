import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import certificadoRoutes from "./routes/certificadoRoutes.js";

dotenv.config();
const app = express();
const __dirname = path.resolve();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Archivos estáticos (public)
app.use(express.static(path.join(__dirname, "public")));

// Rutas API
app.use("/api/certificados", certificadoRoutes);

// Página principal: formulario de subida y verificación
app.get("/", (req, res) => {
  res.render("index");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en ${process.env.BASE_URL || "http://localhost:" + PORT}`);
});
