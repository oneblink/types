import type {
  ApprovalFormsInclusionConfiguration,
  FormEventBase,
} from './common'
import type { FormElementMapping } from './form-element-mapping'

export type BaseFreshdeskSubmissionEventFieldMapping = {
  freshdeskFieldName: string
}

export type FreshdeskSubmissionEventFieldMapping =
  | FormElementMapping<BaseFreshdeskSubmissionEventFieldMapping>
  | (BaseFreshdeskSubmissionEventFieldMapping & {
      type: 'DEPENDENT_FIELD_VALUE'
      dependentFieldValue: {
        category: string
        subCategory: string
        item: string
      }
    })

export type FreshdeskCreateTicketSubmissionEvent = FormEventBase & {
  /** The type of submission event. */
  type: 'FRESHDESK_CREATE_TICKET'
  /** Configuration specific to the type of submission event. */
  configuration: ApprovalFormsInclusionConfiguration & {
    /** Array of freshdesk field mappings. */
    mapping: FreshdeskSubmissionEventFieldMapping[]
  }
}
