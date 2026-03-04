import {
  BaseCloneOptions,
  IdResource,
  WithOrganisationAssociation,
} from './misc'
import { BaseFormsAppEnvironment } from './environments'
export interface NewWorkspace extends WithOrganisationAssociation {
  label: string
  /** The icon to display on the workspace */
  icon?: string
  /** The colour of the workspace, in hexadecimal format (for example, #0099EE) */
  colour?: string
  /** The description of the workspace */
  description?: string
  /** The slug appended to any apps in the workspace */
  slug?: string
  /** Environment config overrides */
  environmentConfig: Record<
    number,
    Pick<
      BaseFormsAppEnvironment,
      | 'styles'
      | 'googleMapsIntegrationKeyId'
      | 'notificationEmailAddresses'
      | 'recaptchaIntegrationDomainId'
      | 'slug'
    >
  >
  cloneOptions?: BaseCloneOptions & {
    sourceWorkspaceId: number
  }
}

export type Workspace = IdResource & NewWorkspace
