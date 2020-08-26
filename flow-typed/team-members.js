// @flow

type RolePrivileges = {
  API_HOSTING?: 'MANAGER' | 'DEVELOPER' | 'READONLY',
  AUTH?: 'MANAGER' | 'READONLY',
  FORMS?: 'MANAGER' | 'READONLY',
  FORM_SUBMISSIONS?: 'MANAGER' | 'READONLY',
  FORM_OPTIONS_SETS?: 'MANAGER' | 'READONLY',
  FORM_ELEMENT_LOOKUPS?: 'MANAGER' | 'READONLY',
  FORMS_APPS?: 'MANAGER' | 'READONLY',
  FORMS_APP_STYLES?: 'MANAGER' | 'READONLY',
  FORMS_APP_USERS?: 'MANAGER' | 'READONLY',
  FORMS_APP_ENVIRONMENTS?: 'MANAGER' | 'READONLY',
  KEYS?: 'MANAGER' | 'READONLY',
  WEB_APP_HOSTING?: 'MANAGER' | 'DEVELOPER' | 'READONLY',
  SOLUTIONS?: 'MANAGER' | 'READONLY',
}

declare type ServiceRoles = {
  userRoles: {
    API_HOSTING?: {
      [organisationId: string]: $PropertyType<RolePrivileges, 'API_HOSTING'>,
    },
    AUTH?: {
      [organisationId: string]: $PropertyType<RolePrivileges, 'AUTH'>,
    },
    FORMS?: {
      [organisationId: string]: $PropertyType<RolePrivileges, 'FORMS'>,
    },
    FORM_SUBMISSIONS?: {
      [organisationId: string]: $PropertyType<
        RolePrivileges,
        'FORM_SUBMISSIONS'
      >,
    },
    FORM_OPTIONS_SETS?: {
      [organisationId: string]: $PropertyType<
        RolePrivileges,
        'FORM_OPTIONS_SETS'
      >,
    },
    FORM_ELEMENT_LOOKUPS?: {
      [organisationId: string]: $PropertyType<
        RolePrivileges,
        'FORM_ELEMENT_LOOKUPS'
      >,
    },
    FORMS_APPS?: {
      [organisationId: string]: $PropertyType<RolePrivileges, 'FORMS_APPS'>,
    },
    FORMS_APP_STYLES?: {
      [organisationId: string]: $PropertyType<
        RolePrivileges,
        'FORMS_APP_STYLES'
      >,
    },
    FORMS_APP_USERS?: {
      [organisationId: string]: $PropertyType<
        RolePrivileges,
        'FORMS_APP_USERS'
      >,
    },
    FORMS_APP_ENVIRONMENTS?: {
      [organisationId: string]: $PropertyType<
        RolePrivileges,
        'FORMS_APP_ENVIRONMENTS'
      >,
    },
    KEYS?: {
      [organisationId: string]: $PropertyType<RolePrivileges, 'KEYS'>,
    },
    WEB_APP_HOSTING?: {
      [organisationId: string]: $PropertyType<
        RolePrivileges,
        'WEB_APP_HOSTING'
      >,
    },
    SOLUTIONS?: {
      [organisationId: string]: $PropertyType<RolePrivileges, 'SOLUTIONS'>,
    },
  },
  key?: Key,
  formsApps: FormsApp[],
  isSuperUser: boolean,
}

type TeamMemberBase = Profile & {
  roleId: number,
}

type NewTeamMember = TeamMemberBase & {
  generatePassword: boolean,
}

type TeamMember = TeamMemberBase & {
  id: number,
  createdAt: string,
  updatedAt: string,
}

type NewRole = {
  name: string,
  description: string,
  privilege: RolePrivileges,
  organisationId: string,
  createdAt: string,
  updatedAt: string,
}

type Role = NewRole & {
  id: number,
}

type PermissionBase = {
  name: ?string,
  privilege: RolePrivileges,
  links: {
    organisations: string,
    users: string,
    role: Role,
  },
}

declare type Permission = PermissionBase & {
  id: number,
  createdAt: string,
  updatedAt: string,
}

declare type User = {
  id: string,
  type: 'SUPER' | 'USER',
  acceptedTermsAndConditionsAt: Date | null,
  hasAcceptedTermsAndConditions: boolean,
}
