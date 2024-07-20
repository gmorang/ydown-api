import ytdl from "@distube/ytdl-core";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import ffmpeg from "fluent-ffmpeg";
import { logger } from "firebase-functions/v1";

const convertMusic = async (url: string): Promise<String> => {
  ffmpeg.setFfmpegPath(ffmpegInstaller.path);
  try {
    const isValid = ytdl.validateURL(url);

    if (!isValid) throw new Error("Invalid URL");

    const info = await ytdl.getInfo(url);

    logger.info(`Title: ${info.videoDetails.title}`);

    let stream = ytdl(url, {
      quality: `highestaudio`,
    });

    let start = Date.now();

    const file = await new Promise((resolve, reject) => {
      ffmpeg(stream)
        .audioBitrate(320)
        .save(`${info.videoDetails.title}.mp3`)
        .on("error", (e) => {
          reject(e);
        })
        .on("progress", (p) => {
          logger.info(`Processing: ${p.targetSize} KB converted`);
        })
        .on("end", () => {
          console.log(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
          resolve(info.videoDetails.title);
        });
    });

    return file as string;
  } catch (e) {
    logger.error(e);
    throw e;
  }
};

export default convertMusic;
