import { FormMigrationData } from './environments'
import { DeveloperKeyReference } from './keys'
import {
  BaseSearchResult,
  IdResource,
  UserProfile,
  WithOrganisationAssociation,
} from './misc'

/**
 * Payload used to schedule a form migration of an existing named form version
 * to run at a specific date and time.
 */
export type NewScheduledFormMigration = WithOrganisationAssociation &
  Omit<FormMigrationData, 'versionId'> & {
    /** The identifier of the named form version to migrate (`FormVersion.id`) */
    versionId: number
    /** The date and time (in ISO format) the form migration is scheduled to run */
    scheduledAt: string
  }

export type ScheduledFormMigrationStatus =
  | 'SCHEDULED'
  | 'SUCCEEDED'
  | 'FAILED'
  | 'CANCELLED'

/** A scheduled form migration of an existing named form version. */
export type ScheduledFormMigration = NewScheduledFormMigration &
  IdResource & {
    status: ScheduledFormMigrationStatus
    /** The user that created the scheduled form migration */
    createdBy?: UserProfile
    /** The developer key that created the scheduled form migration */
    createdByKey?: DeveloperKeyReference
    /** The date and time (in ISO format) the scheduled form migration started running */
    executedAt?: string
    /** Error message if the scheduled form migration failed */
    error?: string
  }

/** Search response containing scheduled form migrations. */
export type ScheduledFormMigrationSearchResponse = {
  scheduledFormMigrations: ScheduledFormMigration[]
} & BaseSearchResult
