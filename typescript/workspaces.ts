import { IdResource, WithOrganisationAssociation } from './misc'
import { BaseFormsAppEnvironment } from './environments'
export interface NewWorkspace extends WithOrganisationAssociation {
  label: string
  /** The icon to display on the workspace */
  icon?: string
  /** The colour of the workspace, in hexadecimal format (for example, #0099EE) */
  colour?: string
  /** Whether the workspace is the default workspace. An organisation can only have one default workspace. */
  isDefault?: boolean
  /** The description of the workspace */
  description?: string
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
}

export type Workspace = IdResource & NewWorkspace
