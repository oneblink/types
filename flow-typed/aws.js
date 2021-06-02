// @flow

declare type AWSCredentials = {
  AccessKeyId: string,
  SecretAccessKey: string,
  SessionToken: string,
  Expiration: string,
}

declare type FormS3Credentials = {
  credentials: AWSCredentials,
  s3: {
    bucket: string,
    key: string,
    region: string,
  },
}
export type S3ObjectCredentials = FormS3Credentials

export type FormAttachmentS3Credentials = S3Credentials & {
  attachmentDataId: string,
}
