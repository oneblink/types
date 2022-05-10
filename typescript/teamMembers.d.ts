import { NoU } from './misc'

interface RolePrivileges {
  API_HOSTING?: 'MANAGER' | 'DEVELOPER' | 'READONLY'
  TEAM_MEMBERS?: 'MANAGER' | 'READONLY'
  ROLES?: 'MANAGER' | 'READONLY'
  DATA_RETENTION?: 'MANAGER' | 'READONLY'
  FORMS?: 'MANAGER' | 'READONLY'
  FORM_SUBMISSIONS?: 'MANAGER' | 'READONLY'
  FORM_OPTIONS_SETS?: 'MANAGER' | 'READONLY'
  FORM_ELEMENT_LOOKUPS?: 'MANAGER' | 'READONLY'
  FORMS_APPS?: 'MANAGER' | 'READONLY'
  FORMS_APP_STYLES?: 'MANAGER' | 'READONLY'
  FORMS_APP_USERS?: 'MANAGER' | 'READONLY'
  FORMS_APP_ENVIRONMENTS?: 'MANAGER' | 'READONLY'
  KEYS?: 'MANAGER' | 'READONLY'
  WEB_APP_HOSTING?: 'MANAGER' | 'DEVELOPER' | 'READONLY'
  SOLUTIONS?: 'MANAGER' | 'READONLY'
  BILLING?: 'MANAGER' | 'READONLY'
  EMAIL_TEMPLATES?: 'MANAGER' | 'READONLY'
  AUDITING?: 'READONLY'
}

interface Profile {
  email: string
  name: string | null
}

type TeamMemberBase = Profile & {
  roleId: number
}

type NewTeamMember = TeamMemberBase & {
  generatePassword: boolean
}

type TeamMember = TeamMemberBase & {
  id: number
  createdAt: string
  updatedAt: string
}

interface NewRole {
  name: string
  description: string
  privilege: RolePrivileges
  organisationId: string
  createdAt: string
  updatedAt: string
}

type Role = NewRole & {
  id: number
}

interface PermissionBase {
  name: string | NoU
  privilege: RolePrivileges
  links: {
    organisations: string
    users: string
    role: Role
  }
  isSuperUser: boolean
}

export type Permission = PermissionBase & {
  id: number
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  type: 'SUPER' | 'USER'
  acceptedTermsAndConditionsAt: Date | null
  hasAcceptedTermsAndConditions: boolean
}
