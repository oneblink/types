import { MiscTypes } from '..'

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
  BILLING?: 'MANAGER' | 'READONLY'
  EMAIL_TEMPLATES?: 'MANAGER' | 'READONLY'
  AUDITING?: 'READONLY'
  SCHEDULED_TASKS?: 'MANAGER' | 'READONLY'
  JOBS?: 'MANAGER' | 'READONLY'
  PDF?: 'DEVELOPER'
  EMAIL_ATTACHMENTS?: 'MANAGER'
  WEBHOOK_SUBSCRIPTIONS?: 'MANAGER' | 'READONLY'
}

export interface Profile {
  email: string
  name: string | null
}

type TeamMemberBase = Profile & {
  roleId: number
  formsAppEnvironmentIds?: number[]
}

type NewTeamMember = TeamMemberBase & {
  generatePassword: boolean
}

type TeamMember = TeamMemberBase & {
  temporaryPasswordExpiry?: string
  isMfaEnabled?: boolean
  id: number
  createdAt: string
  updatedAt: string
}

interface NewRole {
  name: string
  description: string
  privilege: RolePrivileges
  organisationId: string
}

type Role = NewRole & MiscTypes.IdResource

interface PermissionBase {
  name?: string | null
  privilege: RolePrivileges
  formsAppEnvironmentIds?: number[]
  temporaryPasswordExpiry?: string
  isMfaEnabled?: boolean
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
  canDeleteOrganisation: boolean
  isReadOnly: boolean
}
