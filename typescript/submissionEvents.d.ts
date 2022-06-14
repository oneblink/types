import type { ConditionalPredicate } from './conditions'
import type { UserProfile } from './misc'

export type FormSubmissionEventConditional = {
  /** Whether the submission event should be condtionally executed. */
  conditionallyExecute?: boolean
  /**
   * Whether the conditional execution requires all predicates to be true as
   * opposed to one.
   */
  requiresAllConditionallyExecutePredicates?: boolean
  /** Array of the conditional predicates. */
  conditionallyExecutePredicates?: ConditionalPredicate[]
}

export type ApprovalFormsInclusionConfiguration = {
  approvalFormsInclusion?:
    | {
        value: 'ALL'
      }
    | {
        value: 'PARTIAL'
        approvalStepLabels: string[]
      }
}

export type CallbackSubmissionEvent = FormSubmissionEventConditional & {
  type: 'CALLBACK'
  configuration: {
    url: string
    secret?: string
  }
}

export type PdfSubmissionEventEmailTemplateMapping = {
  mustacheTag: string
} & (
  | {
      type: 'FORM_ELEMENT'
      formElementId: string
    }
  | {
      type: 'TEXT'
      text: string
    }
)
export type PDFConfiguration = {
  pdfFileName?: string
  includeSubmissionIdInPdf?: boolean
  excludedElementIds?: string[]
  usePagesAsBreaks?: boolean
}
export type EmailConfiguration = {
  email: string
  emailSubjectLine?: string
  emailTemplate?: {
    id: number
    mapping: Array<PdfSubmissionEventEmailTemplateMapping>
  }
}
export type PdfSubmissionEvent = FormSubmissionEventConditional & {
  type: 'PDF'
  configuration: ApprovalFormsInclusionConfiguration &
    PDFConfiguration &
    EmailConfiguration
}

export type EmailOnlySubmissionEvent = FormSubmissionEventConditional & {
  type: 'EMAIL'
  configuration: ApprovalFormsInclusionConfiguration & EmailConfiguration
}

export type OneBlinkAPISubmissionEventConfiguration = {
  apiId: string
  apiEnvironment: string
  apiEnvironmentRoute: string
  secret?: string
}

export type OneBlinkAPISubmissionEvent = FormSubmissionEventConditional & {
  type: 'ONEBLINK_API'
  configuration: OneBlinkAPISubmissionEventConfiguration
}

export type TrimUriOption = {
  label: string
  uri: number
}

export type TrimSubmissionEvent = FormSubmissionEventConditional & {
  type: 'TRIM'
  configuration: ApprovalFormsInclusionConfiguration &
    PDFConfiguration & {
      environmentId: string
      recordTitle?: string
      container: TrimUriOption
      recordType: TrimUriOption
      actionDefinition: TrimUriOption
      location: TrimUriOption
      author?: TrimUriOption
      groupFiles?: boolean
    }
}

export type CivicaRecord = {
  id: number
  label: string
}
export type CivicaCustomerContactMethod = {
  code: string
  description: string
}

export type CivicaCrmSubmissionEventMapping = {
  isDescription: boolean
  civicaCategoryItemNumber: number
  formElementId: string
}
export type CivicaCrmSubmissionEvent = FormSubmissionEventConditional & {
  type: 'CIVICA_CRM'
  configuration: ApprovalFormsInclusionConfiguration &
    PDFConfiguration & {
      environmentId: string
      civicaCustomerContactMethod: CivicaCustomerContactMethod
      civicaCategory: CivicaRecord
      mapping: CivicaCrmSubmissionEventMapping[]
    }
}

export type CPHCMSSubmissionEvent = FormSubmissionEventConditional & {
  type: 'CP_HCMS'
  configuration: ApprovalFormsInclusionConfiguration &
    PDFConfiguration & {
      contentTypeName: string
      encryptedElementIds?: string[]
      encryptPdf?: boolean
    }
}

export type CPPaySubmissionEvent = FormSubmissionEventConditional & {
  type: 'CP_PAY'
  configuration: {
    elementId: string
    gatewayId: string
  }
}

export type BPOINTSubmissionEvent = FormSubmissionEventConditional & {
  type: 'BPOINT'
  configuration: {
    elementId: string
    environmentId: string
    crn2?: string
    crn3?: string
  }
}

export type WestpacQuickWebSubmissionEvent = FormSubmissionEventConditional & {
  type: 'WESTPAC_QUICK_WEB'
  configuration: {
    elementId: string
    environmentId: string
    customerReferenceNumber: string
  }
}

export type SchedulingSubmissionEvent = FormSubmissionEventConditional & {
  type: 'SCHEDULING'
  configuration: PDFConfiguration &
    ApprovalFormsInclusionConfiguration & {
      nylasAccountId: string
      nylasSchedulingPageId: number
      nameElementId?: string
      emailElementId?: string
      emailDescription?: string
    }
}

export type FreshdeskSubmissionEventFieldMapping = {
  freshdeskFieldName: string
} & (
  | {
      type: 'FORM_ELEMENT'
      formElementId: string
    }
  | {
      type: 'VALUE'
      value: number | string | boolean
    }
  | {
      type: 'DEPENDENT_FIELD_VALUE'
      value: {
        category: string
        subCategory: string
        item: string
      }
    }
)

export type FreshdeskCreateTicketSubmissionEvent =
  FormSubmissionEventConditional & {
    /** The type of submission event. */
    type: 'FRESHDESK_CREATE_TICKET'
    /** Configuration specific to the type of submission event. */
    configuration: ApprovalFormsInclusionConfiguration & {
      /** Array of freshdesk field mappings. */
      mapping: FreshdeskSubmissionEventFieldMapping[]
    }
  }

export type FreshdeskAddNoteToTicketSubmissionEvent =
  FormSubmissionEventConditional & {
    /** The type of submission event. */
    type: 'FRESHDESK_ADD_NOTE_TO_TICKET'
    /** Configuration specific to the type of submission event. */
    configuration: ApprovalFormsInclusionConfiguration
  }

// EVENTS
export type PaymentSubmissionEvent =
  | CPPaySubmissionEvent
  | BPOINTSubmissionEvent
  | WestpacQuickWebSubmissionEvent

export type FormPaymentEvent = PaymentSubmissionEvent
export type FormSchedulingEvent = SchedulingSubmissionEvent
export type FormSubmissionEvent =
  | CallbackSubmissionEvent
  | PdfSubmissionEvent
  | OneBlinkAPISubmissionEvent
  | TrimSubmissionEvent
  | CPHCMSSubmissionEvent
  | CivicaCrmSubmissionEvent
  | EmailOnlySubmissionEvent
  | FreshdeskCreateTicketSubmissionEvent
  | FreshdeskAddNoteToTicketSubmissionEvent

export type FormEvent =
  | FormPaymentEvent
  | FormSchedulingEvent
  | FormSubmissionEvent

// EVENT TYPES
export type FormPaymentEventType = FormPaymentEvent['type']
export type FormSchedulingEventType = FormSchedulingEvent['type']
export type FormSubmissionEventType = FormSubmissionEvent['type']
export type FormEventType = FormEvent['type']

export type WebhookSubscription = {
  id: number
  createdAt?: Date
  callbackUrl: string
  organisationId: string
  keyId: string
}

export interface S3SubmissionTags {
  externalId?: string
  jobId?: string
  userToken?: string
  usernameToken?: string
  previousFormSubmissionApprovalId?: string
}

export type BaseFormSubmissionLambdaEvent = {
  submissionId: string
  formId: number
  formsAppEnvironmentId: number
  organisationId: string
  bucketName: string
  key: string
  isDraft: boolean
  submissionTimestamp: string
  formsAppId: number
  keyId?: string
  user?: UserProfile
  lambda?: string
} & S3SubmissionTags

export type FormSubmissionLambdaEvent<T> = BaseFormSubmissionLambdaEvent & {
  submissionEvent: T
}

export type WebhookSubmissionEventPayload = {
  formsAppId: number
  formId: number
  submissionId: string
  isDraft: boolean
  submissionTimestamp: string
  jobId?: string
  externalId?: string
  userToken?: string
  username?: string
  secret?: string
}

export type FormSubmissionEventInstance = Omit<
  FormSubmissionEvent,
  keyof FormSubmissionEventConditional
> & {
  id: number
  submissionId: string
  formId: number
  status: 'PENDING' | 'SUCCEEDED' | 'FAILED'
  createdAt: string
  updatedAt: string
}
