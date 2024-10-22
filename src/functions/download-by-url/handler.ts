import * as logger from "firebase-functions/logger";
import { onRequest } from "../../config";
import convertMusic from "./services/convert-music";


import fs from 'fs/promises';
import path from 'path';
// import uploadConvertedMusic from "./services/upload-converted-music";

const downloadByUrl = onRequest(async (request, response) => {
  try {
    if (request.method !== "POST") {
      response.status(403).send("Only POST requests are accepted");
    }

    if (!request.body.urls) {
      response.status(400).send("URL is required");
    }

    const urls = request.body.urls;

    await Promise.all(urls.map(async (url: string) => {
      return await convertMusic(url);
    }));

    const tmpDir = path.join(process.cwd(), 'tmp');

    await fs.rm(tmpDir, { recursive: true, force: true });
    logger.info('Temporary directory cleaned up successfully');

    response.status(200).send({ ok: true });
  } catch (e) {
    logger.error(e);
    response.status(500).send(e);
  }
});

export default downloadByUrl;
