export interface BaseKey {
  links: {
    organisations: string
  }
  name: string
}

export interface NewLegacyKey extends BaseKey {
  type: 'LEGACY'
  privilege: {
    API_HOSTING?: 'DEPLOYMENT'
    PDF?: 'BUILDER'
    WEB_APP_HOSTING?: 'DEPLOYMENT'
    FORMS?: 'FaaS'
  }
}

export interface NewDeveloperKey extends BaseKey {
  type: 'ROLE'
  privilege: {
    roleId: number
  }
}

export type NewKey = {
  secret: string
} & (NewLegacyKey | NewDeveloperKey)

export type Key = {
  customerSecretId: number
  id: string
} & (NewLegacyKey | NewDeveloperKey)

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
