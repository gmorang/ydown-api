import * as logger from "firebase-functions/logger";
import { onRequest } from "../../config";
import convertMusic from "./services/convert-music";
import uploadConvertedMusic from "./services/upload-converted-music";

const downloadByUrl = onRequest(async (request, response) => {
  try {
    if (request.method !== "POST") {
      response.status(403).send("Only POST requests are accepted");
    }

    if (!request.body.url) {
      response.status(400).send("URL is required");
    }

    const url = request.body.url;

    const downloadAndGetTitle = await convertMusic(url);

    const upload = uploadConvertedMusic(downloadAndGetTitle);

    response.status(200).send({ upload });
  } catch (e) {
    logger.error(e);
    response.status(500).send(e);
  }
});

export default downloadByUrl;
