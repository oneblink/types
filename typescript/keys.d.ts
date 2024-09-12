import { IdResource } from './misc'

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

export interface NewPowerAutomateKey extends BaseKey {
  type: 'POWER_AUTOMATE'
}

export interface NewSubmissionDataKey extends BaseKey {
  type: 'SUBMISSION_DATA'
  privilege: Record<string, unknown>
}

export type NewKey =
  | NewLegacyKey
  | NewDeveloperKey
  | NewPowerAutomateKey
  | NewSubmissionDataKey

export type Key = {
  customerSecretId: number
  id: string
} & NewKey

export type DeveloperKeyAccess = {
  submissions?: {
    read?: {
      formIds: number[]
    }
    create?: {
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

export interface DeveloperKeyReference {
  /** The id of the key */
  id: string
  /** The name of the key */
  name: string
  /** The username that represents the user that the key was used on behalf of */
  username?: string
}

export type NewFormKeyAssociation = {
  /** The id of the form having a key assigned to it */
  formId: number
  /** The id of the key being assigned to the form */
  keyId: string
}

export type FormKeyAssociation = NewFormKeyAssociation & IdResource
