import { FormsAppDraft } from './submissions'
import { TaskGroupInstance } from './scheduledTasks'
import { ScheduledTasksTypes } from '..'
import {
  EmailSendingAddressBase,
  EmailSendingAddressResponseBase,
  IdResource,
} from './misc'
import {
  BaseFormsAppEnvironmentStyles,
  FormsAppEnvironmentConfiguration,
  FormsAppEnvironmentStyles,
} from './environments'

type FormsAppBaseMenuItem = {
  /** Label for the menu item */
  label: string
  /** Icon to be used for the menu item */
  icon: string
}

type FormsAppScreenMenuItemBase = FormsAppBaseMenuItem & {
  /** If true, menu item will be hidden */
  isHidden: boolean
  /** If true, menu item will be the default item shown */
  isDefault: boolean
}

export type FormsAppPendingSubmissionsMenuItem = FormsAppScreenMenuItemBase & {
  /** Type of menu item */
  type: 'PENDING_SUBMISSIONS'
  /**
   * If true, submissions will always go through the pending queuing and be
   * submitted in the background
   */
  alwaysSubmitViaPendingQueue?: boolean
}
export type FormsAppScreenMenuItem = FormsAppScreenMenuItemBase & {
  /** Type of menu item */
  type: 'FORMS_LIST' | 'JOBS' | 'DRAFTS' | 'PROFILE'
}

export type FormsAppContainerMenuItem = FormsAppBaseMenuItem & {
  /** Type of menu item */
  type: 'CONTAINER'
  /** The ids of the forms within the container */
  formIds: number[]
}

export type FormsAppFormMenuItem = Omit<FormsAppBaseMenuItem, 'isHidden'> & {
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

export type FormsAppScheduledTasksMenuItem = FormsAppBaseMenuItem & {
  /** Type of menu item */
  type: 'SCHEDULED_TASKS'
  /** The ids of the tasks assigned to the app */
  taskAllocations: Array<{ taskId: string }>
  /** If true, menu item will be the default item shown */
  isDefault: boolean
  /** Unique domain safe text to identify the menu item */
  slug?: string
}

export type TaskGroupInstanceAllocation = {
  /** The identifier of the task group instance */
  taskGroupInstanceId: TaskGroupInstance['taskGroupInstanceId']
  /**
   * This property is used to make sure tasks in task group instances are
   * present in the app at the correct times and do not appear as overdue when
   * the start date of the the task is before the date the instance was
   * allocated to the app.
   */
  allocatedAt: string
}
export type FormsAppScheduledTasksGroupMenuItem = FormsAppBaseMenuItem & {
  /** Type of menu item */
  type: 'SCHEDULED_TASK_GROUPS'
  /** The ids of the task groups assigned to the app */
  taskGroupInstanceAllocations: Array<TaskGroupInstanceAllocation>
  /** If true, menu item will be the default item shown */
  isDefault: boolean
  /** Unique domain safe text to identify the menu item */
  slug?: string
}

export type FormsAppCPHCMSContentMenuItemListDisplayAttributeMeta = {
  type: 'CP_HCMS_CONTENT_META'
  attribute: 'meta.created' | 'meta.lastModified' | 'meta.id'
}
export type FormsAppCPHCMSContentMenuItemListDisplayAttributeFormElement = {
  type: 'FORM_ELEMENT'
  formElementId: string
}

export type FormsAppCPHCMSContentMenuItemListDisplayAttributeSubmissionMeta = {
  type: 'SUBMISSION_META'
  attribute: 'externalId'
}

export type FormsAppCPHCMSContentMenuItemListDisplayAttribute =
  | FormsAppCPHCMSContentMenuItemListDisplayAttributeMeta
  | FormsAppCPHCMSContentMenuItemListDisplayAttributeFormElement
  | FormsAppCPHCMSContentMenuItemListDisplayAttributeSubmissionMeta

export type FormsAppCPHCMSContentMenuItem = FormsAppBaseMenuItem & {
  /** Type of menu item */
  type: 'CP_HCMS_CONTENT'
  /**
   * The identifier of the Form which must have a CP HCMS worklflow event to
   * link the HMCS Content Type
   */
  formId: number
  /**
   * The attributes to display for each piece of content when viewing multiple
   * records in a list format.
   */
  listDisplayAttributes: FormsAppCPHCMSContentMenuItemListDisplayAttribute[]
  /** If true, menu item will be the default item shown */
  isDefault: boolean
}

export type FormsAppMenuItem =
  | FormsAppHrefMenuItem
  | FormsAppContainerMenuItem
  | FormsAppFormMenuItem
  | FormsAppPendingSubmissionsMenuItem
  | FormsAppScreenMenuItem
  | FormsAppScheduledTasksMenuItem
  | FormsAppScheduledTasksGroupMenuItem
  | FormsAppCPHCMSContentMenuItem

/**
 * Styles relating to volunteers apps.
 *
 * ## Examples
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
export type VolunteersStyles = BaseFormsAppEnvironmentStyles
export type ApprovalsStyles = BaseFormsAppEnvironmentStyles
export type FormStoreStyles = BaseFormsAppEnvironmentStyles

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
export type FormsListStyles = FormsAppEnvironmentStyles & {
  /**
   * Array of menu item objects. See above for which menu items to use for
   * different forms app types
   */
  menuItems: FormsAppMenuItem[]
  /** Configuration to add a footer displayed at the bottom of the page. */
  footer?: {
    /** The HTML to display as the footer. */
    html: string
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

export type BaseHostnameConfiguration = {
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

export type FormsAppHostnameConfiguration = {
  formsAppId: number
} & BaseHostnameConfiguration

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

type CacheStrategy = 'NETWORK_FIRST' | 'STALE_WHILE_REVALIDATE'

type _NewFormsApp = {
  /** Name of the forms app */
  name: string
  description?: string
  hostname: string
  /** The identifier of the OAuth Client for the forms app */
  oAuthClientId?: string | null
  /** The exact organisation identifier the forms app is associated with */
  organisationId: string
  /** Forms App progressive web app setting */
  pwaSettings: FormsAppPWASettings
  /** Caching strategies for the Forms App */
  cachingStrategies?: {
    singleForm?: CacheStrategy
    app?: CacheStrategy
  }
  /** Forms App custom welcome email properties */
  welcomeEmail?: {
    /**
     * A [mustache](http://mustache.github.io/#demo) template to use when
     * sending welcome emails to new app users.
     */
    body?: string
    /** The subject to use when sending welcome emails to new app users */
    subject?: string
  }
  /** True when using a SAML identity provider */
  hasSamlIdentityProvider: boolean
  enableSamlIdentityProviderLogout?: boolean
  /** The exact forms app environment identifier the forms app is associated with */
  formsAppEnvironmentId: number
  /**
   * The email addresses set in `notificationEmailAddresses` will override the
   * email addresses set at the environment level. Set this flag to `true` to
   * include the environment level email addresses as well as the email
   * addresses set in `notificationEmailAddresses`.
   */
  isInheritingEnvironmentNotificationEmailAddresses?: boolean
  /**
   * Array of emails addresses to be notified when an error occurs in processing
   * submission events
   */
  notificationEmailAddresses: string[]
  isClientLoggingEnabled: boolean
  /** The id of the recaptcha integration to be used */
  recaptchaIntegrationDomainId?: string
  enableAppUserSignup: boolean
  /**
   * The number of hours a user's session will last before they have to log in
   * again. These tokens will get revoked when logging out. Defaults to 30 days.
   */
  userSessionValidityInHours?: number
  /**
   * The number of minutes a user's token for communicating with servers will
   * last. These tokens do not get revoked when logging out so a shorter time
   * period is desireable. Defaults to 1 hour.
   */
  userTokensValidityInMinutes?: number
  /** The id of the Google Maps integration key to be used for Google Maps elements. */
  googleMapsIntegrationKeyId?: string
  /** List of groups users can be assigned too and email addresses to be notified via */
  groups?: Array<{
    name: string
    notificationEmailAddresses: string[]
    /**
     * If `true` users with this group will have administrator access within
     * this application.
     */
    isAdministrator?: boolean
    /** If `true` users with this group will have manager access within this application. */
    isManager?: boolean
  }>
  /** Google analytics tag id */
  googleAnalyticsTagId?: string
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
  /** Whether draft submissions are shared between all app users for this app. */
  draftsAreShared?: boolean
  /**
   * If `true`, app users will be required to login before being able to view
   * any of the Forms App content
   */
  requireAppUserLogin?: boolean
}

export type NewTilesFormsApp = _NewFormsApp & {
  type: 'TILES'
  /** Unique domain safe text to identify the app */
  slug: string
  styles: TilesStyles
  /** Whether draft submissions are shared between all app users for this app. */
  draftsAreShared?: boolean
  /**
   * If `true`, app users will be required to login before being able to view
   * any of the Forms App content
   */
  requireAppUserLogin?: boolean
}

export type NewApprovalsApp = _NewFormsApp & {
  type: 'APPROVALS'
  styles: ApprovalsStyles
  requireAppUserMfa?: boolean
}

export type FormStoreAppForm = {
  formId: number
  groups: string[]
}

export type NewFormStoreApp = _NewFormsApp & {
  type: 'FORM_STORE'
  forms: FormStoreAppForm[]
  styles: FormStoreStyles
  requireAppUserMfa?: boolean
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

export type FormsAppEntityBase = {
  formsAppId: number
  groups: string[]
}

export type NewFormsAppKey = FormsAppEntityBase & {
  keyId: string
}

export type FormsAppKey = IdResource & NewFormsAppKey

export type FormsAppUserBase = FormsAppEntityBase & {
  email: string
  firstName?: string
  lastName?: string
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

/** @deprecated Replaced with FormSubmissionDraft and FormSubmissionDraftVersion */
type BaseFormsAppsDraft = {
  formsAppId: number
  drafts: FormsAppDraft[]
}

/** @deprecated Replaced with FormSubmissionDraft and FormSubmissionDraftVersion */
export type NewFormsAppsDraft = BaseFormsAppsDraft & {
  createdAt?: string
  updatedAt?: string
}

/** @deprecated Replaced with FormSubmissionDraft and FormSubmissionDraftVersion */
export type FormsAppsDraft = {
  createdAt: string
  updatedAt: string
} & BaseFormsAppsDraft

export type FormsAppSendingAddress = EmailSendingAddressBase & {
  formsAppId: number
}

export type FormsAppSendingAddressResponse = EmailSendingAddressResponseBase & {
  formsAppSendingAddress?: FormsAppSendingAddress
}

export type FormsAppConfiguration<
  T extends BaseFormsAppEnvironmentStyles = BaseFormsAppEnvironmentStyles
> = FormsAppEnvironmentConfiguration & {
  /** Type of the forms app. */
  type: FormsApp['type']
  formsAppId: number
  formsOAuthClientId?: string | null
  formsHostname: string
  samlIdentityProviderName?: string | null
  logoutRedirectUrl?: string
  styles: T
  taskGroupInstances?: ScheduledTasksTypes.TaskGroupInstance[]
  pwaSettings?: FormsAppPWASettings | null
  isDraftsEnabled: boolean
  draftsAreShared?: boolean
  volunteers:
    | {
        categories: VolunteersFormsApp['categories']
        waiverUrl: VolunteersFormsApp['waiverUrl']
      }
    | undefined
  isGoogleLoginSupported: boolean
  isClientLoggingEnabled: boolean
  isAppUserSignUpEnabled: boolean
  isAppUserMfaRequired: boolean
  isAppUserLoginRequired: boolean
  cachingStrategies?: _NewFormsApp['cachingStrategies']
  name: string
  description?: string
  htmlTags: {
    title: string
    description?: string
  }
  googleAnalyticsTagId?: string
  /** Groups that represents administrators within this application. */
  administratorGroupNames?: string[]
  /** Groups that represents managers within this application. */
  managerGroupNames?: string[]
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
