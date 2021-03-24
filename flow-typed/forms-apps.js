// @flow

type FormsAppBaseMenuItem = {
  label: string,
  icon: string,
}

declare type FormsAppScreenMenuItem = FormsAppBaseMenuItem & {
  type: 'FORMS_LIST' | 'JOBS' | 'DRAFTS' | 'PENDING_SUBMISSIONS' | 'PROFILE',
  isHidden: boolean,
  isDefault: boolean,
}

declare type FormsAppContainerMenuItem = FormsAppBaseMenuItem & {
  type: 'CONTAINER',
  formIds: number[],
}

declare type FormsAppFormMenuItem = FormsAppBaseMenuItem & {
  type: 'FORM',
  formId: number,
}

declare type FormsAppHrefMenuItem = FormsAppBaseMenuItem & {
  type: 'HREF',
  href: string,
}

declare type FormsAppMenuItem =
  | FormsAppHrefMenuItem
  | FormsAppContainerMenuItem
  | FormsAppFormMenuItem
  | FormsAppScreenMenuItem

declare type BaseFormsAppStyles = {
  foregroundColour?: string,
  highlightColour?: string,
  contrastColour?: string,
  customCss?: string,
}

declare type VolunteersStyles = BaseFormsAppStyles
declare type ApprovalsStyles = BaseFormsAppStyles

declare type FormsListStyles = BaseFormsAppStyles & {
  logoUrl?: string,
  menuItems: FormsAppMenuItem[],
}

declare type TilesStyles = FormsListStyles

declare type AppleTouchStartupImage = {
  href: string,
  media: {
    deviceWidthPixels: number,
    deviceHeightPixels: number,
    devicePixelRatio: number,
  },
}

declare type FormsAppHostnameConfiguration = {
  formsAppId: number,
  createdAt: string,
  updatedAt: string,
  route53: {
    hostedZoneId: string,
    hostedZoneNameServers: string[],
  },
  acm: {
    certificateArn: string,
    dnsValidation: {
      name: string,
      type: string,
      value: string,
    },
  },
  cloudFront: null | {
    distributionId: string,
    distributionDomain: string,
  },
  errorMessage: null | string,
}

type FormsAppPWASettings = {
  homeScreenIconUrl?: string,
  homeScreenName?: string,
  splashScreenName?: string,
  appleTouchStartupImages?: AppleTouchStartupImage[],
}

type _NewFormsApp = {
  name: string,
  hostname: string,
  oAuthClientId: ?string,
  organisationId: string,
  pwaSettings: FormsAppPWASettings,
  welcomeEmail?: {
    body: string | void,
    subject: string | void,
  },
  hasSamlIdentityProvider: boolean,
  formsAppEnvironmentId: number,
  notificationEmailAddresses: string[],
}

declare type NewVolunteersFormsApp = _NewFormsApp & {
  type: 'VOLUNTEERS',
  styles: VolunteersStyles,
  categories: Array<{ label: string }>,
  waiverUrl: string | null, // nullable to allow creating solution without waiver
}

declare type NewApprovalsApp = _NewFormsApp & {
  type: 'APPROVALS',
  styles: ApprovalsStyles,
}

declare type NewFormsListFormsApp = _NewFormsApp & {
  type: 'FORMS_LIST',
  slug: string,
  formIds: number[],
  styles: FormsListStyles,
}

declare type NewTilesFormsApp = _NewFormsApp & {
  type: 'TILES',
  slug: string,
  styles: TilesStyles,
}

declare type NewFormsApp =
  | NewFormsListFormsApp
  | NewVolunteersFormsApp
  | NewTilesFormsApp
  | NewApprovalsApp

type _FormsApp = {
  id: number,
  createdAt: string,
  updatedAt: string,
}

declare type FormsListFormsApp = NewFormsListFormsApp & _FormsApp

declare type VolunteersFormsApp = NewVolunteersFormsApp & _FormsApp
declare type ApprovalsApp = NewApprovalsApp & _FormsApp

declare type TilesFormsApp = NewTilesFormsApp & _FormsApp

declare type SolutionsApp = VolunteersFormsApp | ApprovalsApp
declare type FormsApp = FormsListFormsApp | SolutionsApp | TilesFormsApp

declare type OrganisationAppUser = {
  email: string,
  formsAppIds: number[],
}

declare type FormsAppUserBase = {
  email: string,
  formsAppId: number,
  groups: string[],
}

declare type NewFormsAppUser = FormsAppUserBase & {
  generatePassword: boolean,
  welcomeEmailParameters?: mixed,
}

declare type FormsAppUser = FormsAppUserBase & {
  id: number,
  createdAt: string,
  updatedAt: string,
}

declare type NewFormsAppsDraft = {
  formsAppUserUsername: string,
  formsAppId: number,
  drafts: AppDraft[],
}

declare type AppDraft = {
  preFillFormDataId: string,
  draftId: string,
  formId: number,
  externalId?: string,
  jobId?: string,
  title: string,
  updatedAt: string,
}

declare type FormsAppsDraft = {
  createdAt: string,
  updatedAt: string,
} & NewFormsAppsDraft

declare type FormsAppSendingAddress = {
  emailAddress: string,
  emailName?: string,
  formsAppId: number,
  sesVerificationAttributes?: {
    VerificationStatus:
      | 'Pending'
      | 'Success'
      | 'Failed'
      | 'TemporaryFailure'
      | 'NotStarted',
  },
  createdAt: Date,
  updatedAt: Date,
}

declare type FormsAppConfiguration<
  T: BaseFormsAppStyles = BaseFormsAppStyles
> = {
  type: $PropertyType<FormsApp, 'type'>,
  organisationId: string,
  formsAppId: number,
  formsAppEnvironmentId: number,
  formsOAuthClientId: ?string,
  isTrialExpired: boolean,
  formsHostname: string,
  samlIdentityProviderName: ?string,
  styles: T,
  pwaSettings: ?FormsAppPWASettings,
  isDraftsEnabled: boolean,
  locale: string,
  tz: string,
  volunteers: {
    categories: $PropertyType<VolunteersFormsApp, 'categories'>,
    waiverUrl: $PropertyType<VolunteersFormsApp, 'waiverUrl'>,
  } | void,
  isGoogleLoginSupported: boolean,
}
