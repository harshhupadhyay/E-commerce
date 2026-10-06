import ImageKit, { toFile } from "@imagekit/nodejs";
import { configs } from "../configs/config.js";

// Set up ImageKit
const imageKit = new ImageKit({
  publicKey: configs.IMAGEKIT_PUBLIC_KEY,
  privateKey: configs.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: configs.IMAGEKIT_URL_ENDPOINT
});

export const uploadImage = async (file) => {
  if (!file || !file.buffer) {
    throw new Error("No file or file buffer provided for upload");
  }

  const result = await imageKit.files.upload({

    file: await toFile(file.buffer, file.originalname),
    fileName: file.originalname,
    folder: 'snitchImages'
  });

  return result;
};
