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
  BILLING?: 'MANAGER' | 'READONLY',
  EMAIL_TEMPLATES?: 'MANAGER' | 'READONLY',
}

type Profile = {
  email: string,
  name: string | null,
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
