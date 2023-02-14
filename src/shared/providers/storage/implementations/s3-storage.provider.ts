import { Injectable } from '@nestjs/common'
import * as AWS from 'aws-sdk'
import { FileUpload } from 'graphql-upload'
import { v4 as uuid } from 'uuid'
import { slugify } from '../../../../helpers/file'
import { StorageProvider } from '../storage.provider'

const {
  AWS_REGION,
  AWS_S3_BUCKET_NAME,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
} = process.env

AWS.config.update({ region: AWS_REGION })

@Injectable()
export class S3StorageProvider implements StorageProvider {
  private s3: AWS.S3

  constructor() {
    this.s3 = new AWS.S3({
      apiVersion: '2006-03-01',
      credentials: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
      },
    })
  }

  async upload({ createReadStream, filename }: FileUpload): Promise<string> {
    const stream = createReadStream()

    const filenameSlug = `${uuid()}-${slugify(filename)}`

    const result = await this.s3
      .upload({ Bucket: AWS_S3_BUCKET_NAME, Key: filenameSlug, Body: stream })
      .promise()

    return result.Location
  }

  async delete(key: string) {
    await this.s3
      .deleteObject({ Bucket: AWS_S3_BUCKET_NAME, Key: key })
      .promise()

    return true
  }
}
