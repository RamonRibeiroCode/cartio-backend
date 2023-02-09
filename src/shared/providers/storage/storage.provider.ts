import { FileUpload } from 'graphql-upload'

export abstract class StorageProvider {
  abstract upload({ createReadStream, filename }: FileUpload): Promise<string>
}
