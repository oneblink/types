export interface AWSCredentials {
  AccessKeyId: string
  SecretAccessKey: string
  SessionToken: string
  Expiration?: string
}

export interface S3Configuration {
  bucket: string
  key: string
  region: string
}
export interface FormS3Credentials {
  credentials: AWSCredentials
  s3: S3Configuration
}
export type S3ObjectCredentials = FormS3Credentials

export type FormAttachmentS3Credentials = S3ObjectCredentials & {
  attachmentDataId: string
  uploadedAt?: string
}

export type FormPdfConversionS3Credentials = FormS3Credentials & {
  pdfConversionId: string
}
