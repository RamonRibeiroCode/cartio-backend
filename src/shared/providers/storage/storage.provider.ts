import { FileUpload } from 'graphql-upload-ts'

export abstract class StorageProvider {
  abstract upload({
    createReadStream,
    filename,
    mimetype,
  }: FileUpload): Promise<string>

  abstract delete(key: string): Promise<boolean>

  abstract getSignedUrl(key: string): Promise<string>
}
