import { IntegrationMailGun } from './integrations'
import { NoU } from './misc'
import { FormsAppDraft } from './submissions'

type FormsAppBaseMenuItem = {
  label: string
  icon: string
}

export type FormsAppScreenMenuItem = FormsAppBaseMenuItem & {
  type: 'FORMS_LIST' | 'JOBS' | 'DRAFTS' | 'PENDING_SUBMISSIONS' | 'PROFILE'
  isHidden: boolean
  isDefault: boolean
}

export type FormsAppContainerMenuItem = FormsAppBaseMenuItem & {
  type: 'CONTAINER'
  formIds: number[]
}

export type FormsAppFormMenuItem = FormsAppBaseMenuItem & {
  type: 'FORM'
  formId: number
}

export type FormsAppHrefMenuItem = FormsAppBaseMenuItem & {
  type: 'HREF'
  href: string
}

export type FormsAppMenuItem =
  | FormsAppHrefMenuItem
  | FormsAppContainerMenuItem
  | FormsAppFormMenuItem
  | FormsAppScreenMenuItem

export type BaseFormsAppStyles = {
  foregroundColour?: string
  highlightColour?: string
  contrastColour?: string
  customCss?: string
}

export type VolunteersStyles = BaseFormsAppStyles
export type ApprovalsStyles = BaseFormsAppStyles
export type FormStoreStyles = BaseFormsAppStyles

export type FormsListStyles = BaseFormsAppStyles & {
  logoUrl?: string
  menuItems: FormsAppMenuItem[]
  buttons?: {
    submit?: {
      icon?: string
      label?: string
    }
    cancel?: {
      icon?: string
      label?: string
    }
    saveDraft?: {
      icon?: string
      label?: string
    }
    cancelPromptYes?: {
      icon?: string
      label?: string
    }
    cancelPromptNo?: {
      icon?: string
      label?: string
    }
  }
}

export type TilesStyles = FormsListStyles

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
}

type FormsAppPWASettings = {
  homeScreenIconUrl?: string
  homeScreenName?: string
  splashScreenName?: string
  appleTouchStartupImages?: AppleTouchStartupImage[]
}

type _NewFormsApp = {
  name: string
  description?: string
  hostname: string
  oAuthClientId: string | NoU
  organisationId: string
  pwaSettings: FormsAppPWASettings
  welcomeEmail?: {
    body: string | void
    subject: string | void
  }
  hasSamlIdentityProvider: boolean
  enableSamlIdentityProviderLogout?: boolean
  formsAppEnvironmentId: number
  notificationEmailAddresses: string[]
  isClientLoggingEnabled: boolean
  recaptchaIntegrationDomainId?: string
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

export type NewTilesFormsApp = _NewFormsApp & {
  type: 'TILES'
  slug: string
  styles: TilesStyles
}

export type NewApprovalsApp = _NewFormsApp & {
  type: 'APPROVALS'
  styles: ApprovalsStyles
}

export type FormStoreAppForm = {
  formId: number
  groups: string[]
}

export type NewFormStoreApp = _NewFormsApp & {
  type: 'FORM_STORE'
  forms: FormStoreAppForm[]
  styles: FormStoreStyles
}

export type NewFormsApp =
  | NewFormsListFormsApp
  | NewVolunteersFormsApp
  | NewTilesFormsApp
  | NewApprovalsApp
  | NewFormStoreApp

type _FormsApp = {
  id: number
  createdAt: string
  updatedAt: string
}

export type FormsListFormsApp = NewFormsListFormsApp & _FormsApp

export type VolunteersFormsApp = NewVolunteersFormsApp & _FormsApp
export type ApprovalsApp = NewApprovalsApp & _FormsApp
export type FormStoreApp = NewFormStoreApp & _FormsApp

export type TilesFormsApp = NewTilesFormsApp & _FormsApp

export type SolutionsApp = VolunteersFormsApp | ApprovalsApp | FormStoreApp

export type FormsApp = FormsListFormsApp | SolutionsApp | TilesFormsApp

export type OrganisationAppUser = {
  email: string
  formsAppIds: number[]
}

export type FormsAppUserBase = {
  email: string
  formsAppId: number
  groups: string[]
}

export type NewFormsAppUser = FormsAppUserBase & {
  generatePassword: boolean
  welcomeEmailParameters?: unknown
}

export type FormsAppUser = FormsAppUserBase & {
  id: number
  createdAt: string
  updatedAt: string
}

type BaseFormsAppsDraft = {
  formsAppUserUsername: string
  formsAppId: number
  drafts: FormsAppDraft[]
}

export type NewFormsAppsDraft = BaseFormsAppsDraft & {
  createdAt?: string
  updatedAt?: string
}

export type FormsAppsDraft = {
  createdAt: string
  updatedAt: string
} & BaseFormsAppsDraft

export type FormsAppSendingAddressMailgun = {
  type: IntegrationMailGun['type']
}

export type FormsAppSendingAddressSES = {
  type: 'SES'
  isEmailVerified: boolean
}

export type FormsAppSendingAddress = {
  emailAddress: string
  emailName?: string
  formsAppId: number
  createdAt: string
  updatedAt: string
}

export type FormsAppSendingAddressResponse = {
  integration: FormsAppSendingAddressSES | FormsAppSendingAddressMailgun
  formsAppSendingAddress?: FormsAppSendingAddress
}

export type FormsAppConfiguration<
  T extends BaseFormsAppStyles = BaseFormsAppStyles
> = {
  type: FormsApp['type']
  organisationId: string
  formsAppId: number
  formsAppEnvironmentId: number
  formsOAuthClientId: string | NoU
  isTrialExpired: boolean
  formsHostname: string
  samlIdentityProviderName: string | NoU
  logoutRedirectUrl?: string
  styles: T
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
  isClientLoggingEnabled: boolean
  recaptchaPublicKey: string
  abnLookupAuthenticationGuid?: string
  accountAttachmentRetentionInDays?: number
  formsAttachmentRetention?: Array<{
    formId: number
    days: number
  }>
}
