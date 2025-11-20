import QRCode from "qrcode";
import fs from "fs";
import path from "path";

export const generarQR = async (url, codigo) => {
  const qrsDir = path.join("public", "qrs");
  if (!fs.existsSync(qrsDir)) fs.mkdirSync(qrsDir, { recursive: true });

  const filePath = path.join(qrsDir, `${codigo}.png`);
  await QRCode.toFile(filePath, url, {
    margin: 2,
    width: 300
  });
  return `/qrs/${codigo}.png`;
};
