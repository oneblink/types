// @flow

import { type Form } from './forms'

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

declare type TilesStyles = BaseFormsAppStyles & {
  logoUrl?: string,
}

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
  styles: VolunteersStyles,
  categories: Array<{ label: string }>,
  waiverUrl: string | null, // nullable to allow creating solution without waiver
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
  tiles: Array<FormTile | HrefTile | ContainerTile>,
  styles: TilesStyles,
}

declare type Tile = {
  icon: string
}

declare type FormTile = Tile & {
  type: 'FORM'
  form: Form,
}

declare type HrefTile = Tile & {
  type: 'HREF'
  url: string
}

declare type ContainerTile = Tile & {
  type: 'CONTAINER',
  slug: string,
  title: string,
  forms: Form[]
}

declare type NewFormsApp = NewFormsListFormsApp | NewVolunteersFormsApp | NewTilesFormsApp

type _FormsApp = {
  id: number,
  createdAt: string,
  updatedAt: string,
}

declare type FormsListFormsApp = NewFormsListFormsApp & _FormsApp

declare type VolunteersFormsApp = NewVolunteersFormsApp & _FormsApp

declare type TilesFormsApp = NewTilesFormsApp & _FormsApp

declare type SolutionsApp = VolunteersFormsApp
declare type FormsApp = FormsListFormsApp | SolutionsApp | TilesFormsApp

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

declare type FormsAppConfiguration = {
  type: $PropertyType<FormsApp, 'type'>,
  organisationId: string,
  formsAppId: number,
  formsAppEnvironmentId: number,
  formsOAuthClientId: ?string,
  isTrialExpired: boolean,
  formsHostname: string,
  samlIdentityProviderName: ?string,
  styles: BaseFormsAppStyles,
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
