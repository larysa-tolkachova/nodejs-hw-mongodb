import cloudinary from 'cloudinary';

import { getEnvVar } from '../utils/getEnvVar.js';

cloudinary.v2.config({
  cloud_name: getEnvVar('CLOUDINARY_CLOUD_NAME'),
  api_key: getEnvVar('CLOUDINARY_CLOUD_KEY'),
  api_secret: getEnvVar('CLOUDINARY_CLOUD_SECRET'),
});

export function uploadToCloudinary(filePath) {
  return cloudinary.v2.uploader.upload(filePath);
}

// filePath - шлях до картинки яку треба завантажити
