declare module 'cloudinary-upload' {
    export class CloudinaryUpload {
      constructor(cloudName: string, apiKey: string, apiSecret: string);
      upload(imageData: string): Promise<any>;
    }
  }
  