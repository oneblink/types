import type {
  ApprovalFormsInclusionConfiguration,
  FormEventBase,
} from './common'

export type FreshdeskAddNoteToTicketSubmissionEvent = FormEventBase & {
  /** The type of submission event. */
  type: 'FRESHDESK_ADD_NOTE_TO_TICKET'
  /** Configuration specific to the type of submission event. */
  configuration: ApprovalFormsInclusionConfiguration
}
