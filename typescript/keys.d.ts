export interface Key {
  id: string
  secret: string | void
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
  isSolutions: boolean
}

export type DeveloperKeyAccess = {
  submissions?: {
    create: {
      formIds: number[]
    }
  }
  prefillData?: {
    read: {
      ids?: string[]
    }
  }
}

export type DeveloperKeyJWTPayload = {
  'oneblink:access'?: DeveloperKeyAccess
}
