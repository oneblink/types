import { IntegrationMailGun } from './integrations'
import { NoU } from './misc'
import { FormsAppDraft } from './submissions'

type FormsAppBaseMenuItem = {
  /** Label for the menu item */
  label: string
  /** Icon to be used for the menu item */
  icon: string
}

export type FormsAppScreenMenuItem = FormsAppBaseMenuItem & {
  /** Type of menu item */
  type: 'FORMS_LIST' | 'JOBS' | 'DRAFTS' | 'PENDING_SUBMISSIONS' | 'PROFILE'
  /** If true, menu item will be hidden */
  isHidden: boolean
  /** If true, menu item will be the default item shown */
  isDefault: boolean
}

export type FormsAppContainerMenuItem = FormsAppBaseMenuItem & {
  /** Type of menu item */
  type: 'CONTAINER'
  /** The ids of the forms within the container */
  formIds: number[]
}

export type FormsAppFormMenuItem = FormsAppBaseMenuItem & {
  /** Type of menu item */
  type: 'FORM'
  /** The id of the form */
  formId: number
}

export type FormsAppHrefMenuItem = FormsAppBaseMenuItem & {
  /** Type of menu item */
  type: 'HREF'
  /** Url to be opened for menu item */
  href: string
}

export type FormsAppMenuItem =
  | FormsAppHrefMenuItem
  | FormsAppContainerMenuItem
  | FormsAppFormMenuItem
  | FormsAppScreenMenuItem

export type BaseFormsAppStyles = {
  /** Foreground colour of banner in Forms App */
  foregroundColour?: string
  /** Highlight colour for elements that should stand out */
  highlightColour?: string
  /** Contrast colour applied against the highlight colour */
  contrastColour?: string
  /** CSS applied to the Forms App */
  customCss?: string
}

export type VolunteersStyles = BaseFormsAppStyles
export type ApprovalsStyles = BaseFormsAppStyles
export type FormStoreStyles = BaseFormsAppStyles

export type ButtonConfiguration = {
  /**
   * The icon to display on the button. Must be a valid Material Icon code as it
   * appears here: https://fonts.google.com/icons
   */
  icon?: string
  /** The text to display on the button. */
  label?: string
}

/**
 * For Forms Apps of type `TILES` ContainerMenuItem, FormMenuItem and
 * HrefMenuItem can be used in the `menuItems` array, as well as ScreenMenuItem
 * excluding the `FORMS_LIST` type.
 *
 * Form Forms Apps of type `FORMS_LIST` only ScreenMenuItem and HrefMenuItem can
 * be used in the `menuItems` array.
 *
 * ## Examples
 *
 * ### Forms List Apps
 *
 * ```json
 * {
 *   "foregroundColour": "#454545",
 *   "highlightColour": "#676767",
 *   "contrastColour": "#FFFFFF",
 *   "customCss": ".ob-form { background-color: red; }",
 *   "logoUrl": "https://my-website.com/logo.png",
 *   "menuItems": [
 *     {
 *       "label": "Profile",
 *       "icon": "person",
 *       "type": "PROFILE",
 *       "isHidden": false,
 *       "isDefault": true
 *     },
 *     {
 *       "label": "Google",
 *       "icon": "search",
 *       "type": "HREF",
 *       "href": "https://google.com"
 *     }
 *   ]
 * }
 * ```
 *
 * ### Container Apps
 *
 * ```json
 * {
 *   "foregroundColour": "#454545",
 *   "highlightColour": "#676767",
 *   "contrastColour": "#FFFFFF",
 *   "customCss": ".ob-form { background-color: red; }",
 *   "logoUrl": "https://my-website.com/logo.png",
 *   "menuItems": [
 *     {
 *       "label": "Forms",
 *       "icon": "dashboard",
 *       "type": "CONTAINER",
 *       "formIds": [1, 2, 3]
 *     },
 *     {
 *       "label": "Compliance Check",
 *       "icon": "search",
 *       "type": "FORM",
 *       "formId": 2
 *     },
 *     {
 *       "label": "Google",
 *       "icon": "search",
 *       "type": "HREF",
 *       "href": "https://google.com"
 *     }
 *   ]
 * }
 * ```
 *
 * ### Volunteer Apps
 *
 * ```json
 * {
 *   "foregroundColour": "#454545",
 *   "highlightColour": "#676767",
 *   "contrastColour": "#FFFFFF",
 *   "customCss": ".ob-form { background-color: red; }",
 *   "logoUrl": "https://my-website.com/logo.png"
 * }
 * ```
 */
export type FormsListStyles = BaseFormsAppStyles & {
  /** The absolute URL to the logo image in the Forms App */
  logoUrl?: string
  /**
   * Array of menu item objects. See above for which menu items to use for
   * different forms app types
   */
  menuItems: FormsAppMenuItem[]
  /** Configuration object for button customization */
  buttons?: {
    /** Button configuration for the Submit button */
    submit?: {
      icon?: string
      label?: string
    }
    /** Button configuration for the Cancel button */
    cancel?: {
      icon?: string
      label?: string
    }
    /** Button configuration for the Save Draft button */
    saveDraft?: {
      icon?: string
      label?: string
    }
    /** Button configuration for the Cancel Prompt dialog Yes button */
    cancelPromptYes?: {
      icon?: string
      label?: string
    }
    /** Button configuration for the Cancel Prompt dialog No button */
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
  /**
   * The absolute URL to the app icon that is displayed when installed as a
   * progressive web app on mobile devices
   */
  homeScreenIconUrl?: string
  /**
   * The text beneath the app icon when installed as a progressive web app on
   * mobile devices
   */
  homeScreenName?: string
  /**
   * The text on the splash screen when installed as a progressive web app on
   * mobile devices
   */
  splashScreenName?: string
  appleTouchStartupImages?: AppleTouchStartupImage[]
}

type _NewFormsApp = {
  /** Name of the forms app */
  name: string
  description?: string
  hostname: string
  /** The identifier of the OAuth Client for the forms app */
  oAuthClientId: string | NoU
  /** The exact organisation identifier the forms app is associated with */
  organisationId: string
  /** Forms App progressive web app setting */
  pwaSettings: FormsAppPWASettings
  /** Forms App custom welcome email properties */
  welcomeEmail?: {
    /**
     * A [mustache](http://mustache.github.io/#demo) template to use when
     * sending welcome emails to new app users.
     */
    body: string | void
    /** The subject to use when sending welcome emails to new app users */
    subject: string | void
  }
  /** True when using a SAML identity provider */
  hasSamlIdentityProvider: boolean
  enableSamlIdentityProviderLogout?: boolean
  /** The exact forms app environment identifier the forms app is associated with */
  formsAppEnvironmentId: number
  /**
   * Array of emails addresses to be notified when an error occurs in processing
   * submission events
   */
  notificationEmailAddresses: string[]
  isClientLoggingEnabled: boolean
  /** The id of the recaptcha integration to be used */
  recaptchaIntegrationDomainId?: string
  enableAppUserSignup?: boolean
}

export type NewVolunteersFormsApp = _NewFormsApp & {
  type: 'VOLUNTEERS'
  styles: VolunteersStyles
  categories: Array<{ label: string }>
  waiverUrl: string | null // nullable to allow creating solution without waiver
}

export type NewFormsListFormsApp = _NewFormsApp & {
  type: 'FORMS_LIST'
  /** Unique domain safe text to identify the app */
  slug: string
  /**
   * The identifiers of the forms that are in the forms app. The order of the
   * forms is respected when rendering the list of forms
   */
  formIds: number[]
  styles: FormsListStyles
}

export type NewTilesFormsApp = _NewFormsApp & {
  type: 'TILES'
  /** Unique domain safe text to identify the app */
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
  /** Identifier of the forms app */
  id: number
  /** The time the forms app was created, represented by an ISO date */
  createdAt: string
  /** The time the forms app was last updated, represented by an ISO date */
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
  temporaryPasswordExpiry?: string
  isMfaEnabled?: boolean
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
  /** Type of the forms app. */
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

export type FormsAppUserSubscription = {
  username: string
  formsAppId: number
  pushSubscriptions?: PushSubscription[]
  emailSubscriptions?: EmailSubscription
  createdAt: Date
  updatedAt: Date
}

export type PushSubscription = {
  endpoint: string
  expirationTime: string | null
  keys: {
    p256dh: string
    auth: string
  }
}

export type EmailSubscription = {
  newApproval?: boolean
  clarificationReceived?: boolean
}
