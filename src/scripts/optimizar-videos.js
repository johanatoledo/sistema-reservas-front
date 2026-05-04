import fs from "fs";
import path from "path";
import ffmpeg from "fluent-ffmpeg";

// 🔥 IMPORTANTE: configurar ruta de FFmpeg
ffmpeg.setFfmpegPath(
  "C:\\Users\\sfeoa\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1-full_build\\bin\\ffmpeg.exe"
);

const inputDir = path.resolve("src/assets");
const outputDir = path.resolve("src/assets-optimized");

const videoExtensions = [".mp4", ".mov"];

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function optimizeVideo(filePath) {
  return new Promise((resolve, reject) => {
    const relativePath = path.relative(inputDir, filePath);
    const parsed = path.parse(relativePath);

    const outputFolder = path.join(outputDir, parsed.dir);
    ensureDir(outputFolder);

    const outputPath = path.join(outputFolder, `${parsed.name}-optimizado.mp4`);

    ffmpeg(filePath)
      .videoCodec("libx264")
      .outputOptions([
        "-crf 28",
        "-preset slow",
        "-movflags +faststart"
      ])
      .audioCodec("aac")
      .on("end", () => {
        console.log(`✅ Video optimizado: ${relativePath}`);
        resolve();
      })
      .on("error", (err) => {
        console.error("❌ Error:", err.message);
        reject(err);
      })
      .save(outputPath);
  });
}

async function walk(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      await walk(filePath);
      continue;
    }

    const ext = path.extname(filePath).toLowerCase();

    if (videoExtensions.includes(ext)) {
      await optimizeVideo(filePath);
    }
  }
}

ensureDir(outputDir);
await walk(inputDir);

console.log("🎬 Videos optimizados correctamente.");