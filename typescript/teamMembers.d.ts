import { Key } from './keys'
import { FormsApp } from './formsApps'
import { NoU } from './misc'
interface RolePrivileges {
  API_HOSTING?: 'MANAGER' | 'DEVELOPER' | 'READONLY'
  AUTH?: 'MANAGER' | 'READONLY'
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
}

export interface ServiceRoles {
  userRoles: {
    API_HOSTING?: {
      [organisationId: string]: RolePrivileges['API_HOSTING']
    }
    AUTH?: {
      [organisationId: string]: RolePrivileges['AUTH']
    }
    FORMS?: {
      [organisationId: string]: RolePrivileges['FORMS']
    }
    FORM_SUBMISSIONS?: {
      [organisationId: string]: RolePrivileges['FORM_SUBMISSIONS']
    }
    FORM_OPTIONS_SETS?: {
      [organisationId: string]: RolePrivileges['FORM_OPTIONS_SETS']
    }
    FORM_ELEMENT_LOOKUPS?: {
      [organisationId: string]: RolePrivileges['FORM_ELEMENT_LOOKUPS']
    }
    FORMS_APPS?: {
      [organisationId: string]: RolePrivileges['FORMS_APPS']
    }
    FORMS_APP_STYLES?: {
      [organisationId: string]: RolePrivileges['FORMS_APP_STYLES']
    }
    FORMS_APP_USERS?: {
      [organisationId: string]: RolePrivileges['FORMS_APP_USERS']
    }
    FORMS_APP_ENVIRONMENTS?: {
      [organisationId: string]: RolePrivileges['FORMS_APP_ENVIRONMENTS']
    }
    KEYS?: {
      [organisationId: string]: RolePrivileges['KEYS']
    }
    WEB_APP_HOSTING?: {
      [organisationId: string]: RolePrivileges['WEB_APP_HOSTING']
    }
    SOLUTIONS?: {
      [organisationId: string]: RolePrivileges['SOLUTIONS']
    }
    BILLING?: {
      [organisationId: string]: RolePrivileges['BILLING']
    }
  }
  key?: Key
  formsApps: FormsApp[]
  isSuperUser: boolean
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
