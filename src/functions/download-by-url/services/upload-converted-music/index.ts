import { logger } from "firebase-functions/v1";
import * as fs from "fs";
import { StorageConnection } from "../../../../infrastructure/storage";

async function uploadConvertedMusic(title: String): Promise<String> {
  try {
    const storage = StorageConnection.getInstance();
    const file = fs.readFileSync(`${title}.mp3`);

    await storage.uploadFile(`${title}.mp3`, file);

    const url = await storage.getDownloadUrl(`${title}.mp3`);

    return url;
  } catch (error) {
    logger.error(error);
    throw error;
  }
}

export default uploadConvertedMusic;
