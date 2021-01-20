// @flow

import { NoU } from './misc'

type FormsAppBaseMenuItem = {
  label: string
  icon: string
}

export type FormsAppScreenMenuItem = FormsAppBaseMenuItem & {
  type: 'FORMS_LIST' | 'JOBS' | 'DRAFTS' | 'PENDING_SUBMISSIONS' | 'PROFILE'
  isHidden: boolean
  isDefault: boolean
}

export type FormsAppHrefMenuItem = FormsAppBaseMenuItem & {
  type: 'HREF'
  href: string
}

export type FormsAppMenuItem = FormsAppHrefMenuItem | FormsAppScreenMenuItem

export type BaseFormsAppStyles = {
  foregroundColour?: string
  highlightColour?: string
  contrastColour?: string
  customCss?: string
}

export type VolunteersStyles = BaseFormsAppStyles

export type TilesStyles = BaseFormsAppStyles & {
  logoUrl?: string
}

export type FormsListStyles = BaseFormsAppStyles & {
  logoUrl?: string
  menuItems: FormsAppMenuItem[]
}

export type AppleTouchStartupImage = {
  href: string
  media: {
    deviceWidthPixels: number
    deviceHeightPixels: number
    devicePixelRatio: number
  }
}

export type FormsAppHostnameConfiguration = {
  formsAppId: number
  createdAt: string
  updatedAt: string
  route53: {
    hostedZoneId: string
    hostedZoneNameServers: string[]
  }
  acm: {
    certificateArn: string
    dnsValidation: {
      name: string
      type: string
      value: string
    }
  }
  cloudFront: null | {
    distributionId: string
    distributionDomain: string
  }
  errorMessage: null | string
}

type FormsAppPWASettings = {
  homeScreenIconUrl?: string
  homeScreenName?: string
  splashScreenName?: string
  appleTouchStartupImages?: AppleTouchStartupImage[]
}

type _NewFormsApp = {
  name: string
  hostname: string
  oAuthClientId: string | NoU
  organisationId: string
  pwaSettings: FormsAppPWASettings
  welcomeEmail?: {
    body: string | void
    subject: string | void
  }
  hasSamlIdentityProvider: boolean
  formsAppEnvironmentId: number
  notificationEmailAddresses: string[]
}

export type NewVolunteersFormsApp = _NewFormsApp & {
  type: 'VOLUNTEERS'
  styles: VolunteersStyles
  categories: Array<{ label: string }>
  waiverUrl: string | null // nullable to allow creating solution without waiver
}

export type NewFormsListFormsApp = _NewFormsApp & {
  type: 'FORMS_LIST'
  slug: string
  formIds: number[]
  styles: FormsListStyles
}

type _BaseFormsAppTile = {
  icon: string
  title: string
}

export type FormTile = _BaseFormsAppTile & {
  type: 'FORM'
  formId: number
}

export type DraftTile = _BaseFormsAppTile & {
  type: 'DRAFT'
}

export type PendingTile = _BaseFormsAppTile & {
  type: 'PENDING_SUBMISSIONS'
}

export type JobsTile = _BaseFormsAppTile & {
  type: 'JOBS'
}

export type HrefTile = _BaseFormsAppTile & {
  type: 'HREF'
  url: string
}

export type ContainerTile = _BaseFormsAppTile & {
  type: 'CONTAINER'
  slug: string
  formIds: number[]
}

export type FormsAppTile =
  | FormTile
  | DraftTile
  | PendingTile
  | JobsTile
  | HrefTile
  | ContainerTile

export type NewTilesFormsApp = _NewFormsApp & {
  type: 'TILES'
  slug: string
  tiles: FormsAppTile[]
  styles: TilesStyles
}

export type NewFormsApp =
  | NewFormsListFormsApp
  | NewVolunteersFormsApp
  | NewTilesFormsApp

type _FormsApp = {
  id: number
  createdAt: string
  updatedAt: string
}

export type FormsListFormsApp = NewFormsListFormsApp & _FormsApp

export type VolunteersFormsApp = NewVolunteersFormsApp & _FormsApp

export type TilesFormsApp = NewTilesFormsApp & _FormsApp

export type SolutionsApp = VolunteersFormsApp
export type FormsApp = FormsListFormsApp | SolutionsApp | TilesFormsApp

export type OrganisationAppUser = {
  email: string
  formsAppIds: number[]
}

export type NewFormsAppUser = {
  generatePassword: boolean
  welcomeEmailParameters?: unknown
} & FormsAppUser

export type FormsAppUser = {
  id: number
  email: string
  formsAppId: number
  createdAt: string
}

export type NewFormsAppsDraft = {
  formsAppUserUsername: string
  formsAppId: number
  drafts: AppDraft[]
}

export type AppDraft = {
  preFillFormDataId: string
  draftId: string
  formId: number
  externalId?: string
  jobId?: string
  title: string
  updatedAt: string
}

export type FormsAppsDraft = {
  createdAt: string
  updatedAt: string
} & NewFormsAppsDraft

export type SendingAddress = {
  emailAddress: string
  formsAppId: number
  sesVerificationAttributes?: {
    VerificationStatus:
      | 'Pending'
      | 'Success'
      | 'Failed'
      | 'TemporaryFailure'
      | 'NotStarted'
  }
  createdAt: Date
  updatedAt: Date
}

export type FormsAppConfiguration = {
  type: FormsApp['type']
  organisationId: string
  formsAppId: number
  formsAppEnvironmentId: number
  formsOAuthClientId: string | NoU
  isTrialExpired: boolean
  formsHostname: string
  samlIdentityProviderName: string | NoU
  styles: BaseFormsAppStyles
  tiles?: FormsAppTile[]
  pwaSettings: FormsAppPWASettings | NoU
  isDraftsEnabled: boolean
  locale: string
  tz: string
  volunteers:
    | {
        categories: VolunteersFormsApp['categories']
        waiverUrl: VolunteersFormsApp['waiverUrl']
      }
    | undefined
  isGoogleLoginSupported: boolean
}
