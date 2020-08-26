// @flow

declare type FormsBuilderSession = {
  formId: number,
  user: {
    email: string,
    picture?: string,
    name?: string,
  },
  dateTimeLocked?: string,
}

declare type AssetUploadCredentialsRequest = {
  assetPath: string,
  organisationId: string,
}
