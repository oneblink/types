export interface BaseKey {
  name: string
  privilege: {
    API_HOSTING?: 'DEPLOYMENT'
    PDF?: 'BUILDER'
    WEB_APP_HOSTING?: 'DEPLOYMENT'
    FORMS?: 'FaaS'
  }
  links: {
    organisations: string
  }
}

export interface NewKey extends BaseKey {
  secret: string
}

export interface Key extends BaseKey {
  customerSecretId: number
  id: string
}

export type DeveloperKeyAccess = {
  submissions?: {
    create: {
      formIds: number[]
    }
  }
  forms?: {
    read: {
      ids: number[]
    }
  }
  prefillData?: {
    read: {
      ids: string[]
    }
  }
}

export type DeveloperKeyJWTPayload = {
  'oneblink:access'?: DeveloperKeyAccess
}
