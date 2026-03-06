import { BaseFormsAppEnvironment } from './environments'
import { IdResource, WithOrganisationAssociation } from './misc'

export interface BaseWorkspace extends WithOrganisationAssociation {
  label: string
  /** The icon to display on the workspace */
  icon?: string
  /** The colour of the workspace, in hexadecimal format (for example, #0099EE) */
  colour?: string
  /** The description of the workspace */
  description?: string
}

export interface NewWorkspace extends BaseWorkspace {
  /** When a workspace is created a workspace will automatically be created.  The environmentOptions will be used to create the environment for the workspace */
  environmentOptions?: BaseFormsAppEnvironment
}

export type Workspace = IdResource & BaseWorkspace
