import * as admin from "firebase-admin";
import { logger } from "firebase-functions/v1";

export class StorageConnection {
  private static instance: StorageConnection;
  private storage: admin.storage.Storage;

  private constructor() {
    if (!admin.apps.length) {
      admin.initializeApp();
    }

    this.storage = admin.storage();
  }

  public static getInstance(): StorageConnection {
    if (!StorageConnection.instance) {
      StorageConnection.instance = new StorageConnection();
    }
    return StorageConnection.instance;
  }

  public async getDownloadUrl(fileName: string): Promise<string> {
    const bucket = this.storage.bucket().name;

    const url = `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(`files/${fileName}`)}?alt=media&token=${fileName}`;

    return url;
  }

  public async uploadFile(fileName: string, file: Buffer): Promise<void> {
    const bucket = this.storage.bucket();

    const fileRef = bucket.file(`files/${fileName}`);

    await fileRef.save(file);

    logger.info(`File ${fileName} uploaded to storage`);

    fileRef.setMetadata({
      contentType: "application/pdf",
      firebaseStorageDownloadTokens: fileName,
    });
  }
}
