export interface AWSCredentials {
  AccessKeyId: string
  SecretAccessKey: string
  SessionToken: string
  Expiration: string
}

export interface FormS3Credentials {
  credentials: AWSCredentials
  s3: {
    bucket: string
    key: string
    region: string
  }
}

export type FormAttachmentS3Credentials = FormS3Credentials & {
  attachmentDataId: string
}
