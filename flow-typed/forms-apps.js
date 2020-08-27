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

declare type FormsAppHrefMenuItem = FormsAppBaseMenuItem & {
  type: 'HREF',
  href: string,
}

declare type FormsAppMenuItem = FormsAppHrefMenuItem | FormsAppScreenMenuItem

declare type BaseFormsAppStyles = {
  foregroundColour?: string,
  highlightColour?: string,
  contrastColour?: string,
  customCss?: string,
}

declare type VolunteersStyles = BaseFormsAppStyles

declare type FormsListStyles = BaseFormsAppStyles & {
  logoUrl?: string,
  menuItems: FormsAppMenuItem[],
}

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
  styles: _AppStyles,
  availabilities: Array<{ label: string }>,
  categories: Array<{ label: string }>,
  waiverUrl: string | null, // nullable to allow creating solution without waiver
}

declare type NewFormsListFormsApp = _NewFormsApp & {
  type: 'FORMS_LIST',
  slug: string,
  formIds: number[],
  styles: FormsListStyles,
}

declare type NewFormsApp = NewFormsListFormsApp | NewVolunteersFormsApp

type _FormsApp = {
  id: number,
  createdAt: string,
  updatedAt: string,
}

declare type FormsListFormsApp = NewFormsListFormsApp & _FormsApp

declare type VolunteersFormsApp = NewVolunteersFormsApp & _FormsApp

declare type FormsApp = FormsListFormsApp | VolunteersFormsApp

declare type OrganisationAppUser = {
  email: string,
  formsAppIds: number[],
}

declare type NewFormsAppUser = {
  generatePassword: boolean,
  welcomeEmailParameters?: mixed,
} & FormsAppUser

declare type FormsAppUser = {
  id: number,
  email: string,
  formsAppId: number,
  createdAt: string,
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

declare type SendingAddress = {
  emailAddress: string,
  formsAppId: number,
  sesVerificationAttributes?: {
    VerificationStatus: string,
  },
  createdAt: Date,
  updatedAt: Date,
}

declare type FormsAppConfiguration = {
  type: $PropertyType<FormsApp, 'type'>,
  organisationId: string,
  formsAppId: number,
  formsAppEnvironmentId: number,
  formsOAuthClientId: ?string,
  isTrialExpired: boolean,
  formsHostname: string,
  samlIdentityProviderName: ?string,
  styles: _AppStyles,
  pwaSettings: ?FormsAppPWASettings,
  isDraftsEnabled: boolean,
  locale: string,
  tz: string,
}
