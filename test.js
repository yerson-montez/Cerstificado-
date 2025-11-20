import { db } from "./config/db.js";

async function test() {
  const [rows] = await db.query("SELECT NOW() AS fecha");
  console.log("Conectado. Fecha MySQL:", rows[0].fecha);
}

test();
