import ytdl from "ytdl-core";
import youtubedl from "youtube-dl-exec";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";
import { logger } from "firebase-functions/v1";
import path from "path";

const convertMusic = async (url: string): Promise<any> => {
  ffmpeg.setFfmpegPath(ffmpegInstaller.path);

  const info = await ytdl.getInfo(url);
  const musicName = info.videoDetails.title.replace(/\//g, '|');

  async function convertWebMToMP3(inputFilePath: string) {
    const outputFilePath = `${musicName}.mp3`;

    return new Promise((resolve, reject) => {
      ffmpeg(inputFilePath)
        .audioBitrate(128)
        .toFormat("mp3")
        .on("end", () => {
          logger.info("Conversion finished successfully");
          resolve(outputFilePath);
        })
        .on("error", (err) => {
          logger.error("Error during conversion:", err);
          reject(err);
        })
        .save(outputFilePath);
    });
  }

  const webmFilePath = path.join(process.cwd(), "tmp", `${musicName}.webm`);

  try {
    // Step 1: Download the audio as WebM
    const output = await youtubedl(url, {
      extractAudio: true,
      audioFormat: "mp3",
      preferFfmpeg: true,
      output: webmFilePath,
    });
    logger.log("Download completed:", output);

    // Step 2: Convert WebM to MP3
    const mp3Path = await convertWebMToMP3(webmFilePath);
    logger.log("MP3 saved to:", mp3Path);

    return mp3Path;
  } catch (err) {
    logger.error("Error:", err);
    throw err;
  }
};

export default convertMusic;
