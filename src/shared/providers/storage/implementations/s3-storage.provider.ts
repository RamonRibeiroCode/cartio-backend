import { Injectable } from '@nestjs/common'
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
} from '@aws-sdk/client-s3'
import { FileUpload } from 'graphql-upload-ts'
import { v4 as uuid } from 'uuid'
import { slugify } from '../../../../helpers/file'
import { StorageProvider } from '../storage.provider'
import { Stream } from 'node:stream'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import * as sharp from 'sharp'

const {
  AWS_REGION,
  AWS_S3_BUCKET_NAME,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
} = process.env

async function streamToBuffer(stream: Stream): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    const _buf: any[] = []

    stream.on('data', (chunk) => _buf.push(chunk))
    stream.on('end', () => resolve(Buffer.concat(_buf)))
    stream.on('error', (err) => reject(err))
  })
}

@Injectable()
export class S3StorageProvider implements StorageProvider {
  private s3: S3Client

  constructor() {
    this.s3 = new S3Client({
      region: AWS_REGION,
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    })
  }

  async upload({
    createReadStream,
    filename,
    mimetype,
  }: FileUpload): Promise<string> {
    const stream = createReadStream()

    const fileBuffer = await streamToBuffer(stream)

    const fileBufferResized = await sharp(fileBuffer)
      .resize({ width: 172, height: 172, fit: 'contain' })
      .toBuffer()

    const filenameKey = `${uuid()}-${slugify(filename)}`

    const uploadParams = {
      Bucket: AWS_S3_BUCKET_NAME,
      Body: fileBufferResized,
      Key: filenameKey,
      ContentType: mimetype,
    }

    await this.s3.send(new PutObjectCommand(uploadParams))

    return filenameKey
  }

  async delete(key: string) {
    await this.s3.send(
      new DeleteObjectCommand({ Bucket: AWS_S3_BUCKET_NAME, Key: key }),
    )

    return true
  }

  async getSignedUrl(key: string) {
    const getParams = {
      Bucket: AWS_S3_BUCKET_NAME,
      Key: key,
    }

    return await getSignedUrl(this.s3, new GetObjectCommand(getParams), {
      expiresIn: 60, // 60 SECONDS
    })
  }
}
