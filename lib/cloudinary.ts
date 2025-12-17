import { v2 as cloudinary } from 'cloudinary'
import { Readable } from 'stream'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export interface UploadResult {
  public_id: string
  secure_url: string
  resource_type: string
  format: string
  width?: number
  height?: number
  duration?: number
  bytes: number
  created_at: string
}

export async function uploadToCloudinary(
  file: Buffer | string,
  options: {
    folder: string
    resource_type?: 'image' | 'video' | 'raw' | 'auto'
    public_id?: string
    tags?: string[]
    timeout?: number  // Custom timeout option
  }
): Promise<UploadResult> {
  try {
    // Default timeout is set to 60 seconds if not provided
    const timeout = options.timeout || 60 * 1000; 

    const uploadOptions = {
      folder: options.folder,
      resource_type: options.resource_type || 'auto',
      public_id: options.public_id,
      tags: options.tags,
      timeout: timeout, // Apply timeout option here
    }

    let result: any

    console.log('Starting Cloudinary upload...');

    if (typeof file === 'string') {
      // when file is a string (path or URL) use uploader.upload
      console.log('Uploading file from URL or path...');
      result = await cloudinary.uploader.upload(file, uploadOptions)
    } else {
      // when file is a Buffer, use upload_stream and pipe a readable stream
      console.log('Uploading file as Buffer...');
      result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(uploadOptions, (error, res) => {
          if (error) {
            console.error('Stream upload error:', error);
            return reject(error);
          }
          resolve(res);
        })
        Readable.from([file]).pipe(uploadStream)
      })
    }

    console.log('Cloudinary upload completed successfully.');

    return {
      public_id: result.public_id,
      secure_url: result.secure_url,
      resource_type: result.resource_type,
      format: result.format,
      width: result.width,
      height: result.height,
      duration: result.duration,
      bytes: result.bytes,
      created_at: result.created_at,
    }
  } catch (error) {
    console.error('Cloudinary upload error:', error)
    throw new Error('Failed to upload to Cloudinary');
  }
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  try {
    console.log(`Deleting resource with public_id: ${publicId}`);
    await cloudinary.uploader.destroy(publicId)
    console.log(`Resource with public_id: ${publicId} deleted successfully.`);
  } catch (error) {
    console.error('Cloudinary delete error:', error)
    throw new Error('Failed to delete from Cloudinary')
  }
}

export async function getCloudinaryResource(publicId: string) {
  try {
    console.log(`Fetching resource details for public_id: ${publicId}`);
    return await cloudinary.api.resource(publicId)
  } catch (error) {
    console.error('Cloudinary fetch error:', error)
    throw new Error('Failed to fetch from Cloudinary')
  }
}
