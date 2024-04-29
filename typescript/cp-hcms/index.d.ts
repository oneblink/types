export type CPHCSMAccessTokenResponse = {
  token: {
    token_type: string
    access_token: string
    expires_in: number
    scope: string
    expires_at: number
  }
  appName: string
  baseUrl: string
  contentTypeName: string
}