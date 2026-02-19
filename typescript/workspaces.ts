import { IdResource, WithOrganisationAssociation } from './misc'
import { BaseFormsAppEnvironment } from './environments'
export interface NewWorkspace extends WithOrganisationAssociation {
  label: string
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
