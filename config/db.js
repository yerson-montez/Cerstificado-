import mysql from "mysql2/promise";

export const db = await mysql.createConnection({
  host: "b1xlkbmpaoezy6hfkope-mysql.services.clever-cloud.com",
  user: "uqgwdbj7tpvqfmo3",
  password: "yFCFXLYyGwIfuQjaCtr4",
  database: "b1xlkbmpaoezy6hfkope",
  port: 3306
});

console.log("📌 MySQL conectado correctamente");
export default db;
