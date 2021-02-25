// @flow

declare type AWSCredentials = {
  AccessKeyId: string
  SecretAccessKey: string
  SessionToken: string
  Expiration: string
}

declare type FormS3Credentials = {
  credentials: AWSCredentials
  s3: {
    bucket: string
    key: string
    region: string
  }
}
