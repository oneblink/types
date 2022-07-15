import type { ConditionalPredicate } from './conditions'
import type { UserProfile } from './misc'

export type FormEventConditional = {
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

export type CallbackSubmissionEvent = FormEventConditional & {
  type: 'CALLBACK'
  configuration: {
    /** URL that the callback is made to. */
    url: string
    /**
     * Secret string used for verifying the authenticity of the request made
     * from the OneBlink system.
     */
    secret?: string
  }
}

export type PdfSubmissionEventEmailTemplateMapping = {
  /** The mustache tag to replace in the email template. */
  mustacheTag: string
} & (
  | {
      /** Type of mapping */
      type: 'FORM_ELEMENT'
      /**
       * The value from the form submission for a form element if type is
       * `'FORM_ELEMENT'`.
       */
      formElementId: string
    }
  | {
      /** Type of mapping */
      type: 'TEXT'
      /** The free text to insert if type is */
      text: string
    }
)
export type PDFConfiguration = {
  /** The name of the PDF file sent to the configured email address. */
  pdfFileName?: string
  /**
   * Whether the submission id should be included in the generated pdf (defaults
   * to `false`).
   */
  includeSubmissionIdInPdf?: boolean
  /**
   * Whether the payment details associated with the submission should be
   * included in the generated pdf (defaults to `false`).
   */
  includePaymentInPdf?: boolean
  /** An array of element ids to exclude from the submission when generating pdf. */
  excludedElementIds?: string[]
  /** Whether pages in the form submission should translate to page breaks in the PDF. */
  usePagesAsBreaks?: boolean
}
export type EmailConfiguration = {
  /** The email in which a PDF copy of the form submission will be sent. */
  email: string
  /** The subject line of the email sent to the configured email address. */
  emailSubjectLine?: string
  /** A reference to a custom template for the email body. */
  emailTemplate?: {
    /** The `id` of the `emailTemplate`. */
    id: number
    /** The mappings required from the email template. */
    mapping: Array<PdfSubmissionEventEmailTemplateMapping>
  }
}
export type PdfSubmissionEvent = FormEventConditional & {
  type: 'PDF'
  configuration: ApprovalFormsInclusionConfiguration &
    PDFConfiguration &
    EmailConfiguration
}

export type EmailOnlySubmissionEvent = FormEventConditional & {
  type: 'EMAIL'
  configuration: ApprovalFormsInclusionConfiguration & EmailConfiguration
}

export type OneBlinkAPISubmissionEventConfiguration = {
  /** The ID of the OneBlink hosted API that a callback is made to on submission. */
  apiId: string
  /** The environment of the specified OneBlink hosted API to recieve the callback. */
  apiEnvironment: string
  /** The route of the specified API and Environment to recieve the callback payload. */
  apiEnvironmentRoute: string
  /**
   * Secret string used for verifying the authenticity of the request made from
   * the OneBlink system.
   */
  secret?: string
}

export type OneBlinkAPISubmissionEvent = FormEventConditional & {
  type: 'ONEBLINK_API'
  configuration: OneBlinkAPISubmissionEventConfiguration
}

export type TrimUriOption = {
  /** The attribute label. */
  label: string
  /** The attribute uri. */
  uri: number
}

export type TrimSubmissionEvent = FormEventConditional & {
  type: 'TRIM'
  configuration: ApprovalFormsInclusionConfiguration &
    PDFConfiguration & {
      /**
       * The id of the OneBlink -> TRIM (Micro Focus Content Manager)
       * integration environment to be used.
       */
      environmentId: string
      recordTitle?: string
      /** The container object. Contains the container properties. */
      container: TrimUriOption
      /** The recordType object. Contains the recordType properties. */
      recordType: TrimUriOption
      /** The actionDefinition object. Contains the actionDefinition properties. */
      actionDefinition: TrimUriOption
      /** The location object. Contains the location properties. */
      location: TrimUriOption
      /** The author object. Contains the author properties. */
      author?: TrimUriOption
      /**
       * Whether the submission pdf and attachments should be zipped before
       * uploading (defaults to `false`).
       */
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
  /** The item number of the civica category to map the OB form field to. */
  civicaCategoryItemNumber: number
  /** The elementId of the field to map to the civica category. */
  formElementId: string
}
export type CivicaCrmSubmissionEvent = FormEventConditional & {
  type: 'CIVICA_CRM'
  configuration: ApprovalFormsInclusionConfiguration &
    PDFConfiguration & {
      /** The id of the OneBlink -> Civica integration environment to be used. */
      environmentId: string
      civicaCustomerContactMethod: CivicaCustomerContactMethod
      civicaCategory: CivicaRecord
      /** An array containing mapping information. */
      mapping: CivicaCrmSubmissionEventMapping[]
    }
}

export type CPHCMSSubmissionEvent = FormEventConditional & {
  type: 'CP_HCMS'
  configuration: ApprovalFormsInclusionConfiguration &
    PDFConfiguration & {
      /** The content type name for the submission in the CivicPlus HCMS. */
      contentTypeName: string
      /** An array of element ids to be set as encrypted in the CP HCMS. */
      encryptedElementIds?: string[]
      /** Whether the generated pdf file should be encrypted. (defaults to `false`) */
      encryptPdf?: boolean
    }
}

export type CPPaySubmissionEvent = FormEventConditional & {
  type: 'CP_PAY'
  configuration: {
    /**
     * The elementId that holds the value that will be paid. Must be the id of a
     * number or calculation element.
     */
    elementId: string
    /** The id of the OneBlink -> CP Pay integration gateway to be used. */
    gatewayId: string
  }
}

export type BPOINTSubmissionEvent = FormEventConditional & {
  type: 'BPOINT'
  configuration: {
    /**
     * The elementId that holds the value that will be paid. Must be the id of a
     * number or calculation element.
     */
    elementId: string
    /** The id of the OneBlink -> BPOINT integration environment to be used. */
    environmentId: string
    /** An optional crn string. */
    crn2?: string
    /** An optional crn string. */
    crn3?: string
  }
}

export type WestpacQuickWebSubmissionEvent = FormEventConditional & {
  type: 'WESTPAC_QUICK_WEB'
  configuration: {
    /**
     * The elementId that holds the value that will be paid. Must be the id of a
     * number or calculation element.
     */
    elementId: string
    /** The id of the OneBlink -> WestpacQuickWeb integration environment to be used. */
    environmentId: string
    /** A crn string. */
    customerReferenceNumber: string
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
      dependentFieldValue: {
        category: string
        subCategory: string
        item: string
      }
    }
)

export type FreshdeskCreateTicketSubmissionEvent = FormEventConditional & {
  /** The type of submission event. */
  type: 'FRESHDESK_CREATE_TICKET'
  /** Configuration specific to the type of submission event. */
  configuration: ApprovalFormsInclusionConfiguration & {
    /** Array of freshdesk field mappings. */
    mapping: FreshdeskSubmissionEventFieldMapping[]
  }
}

export type FreshdeskAddNoteToTicketSubmissionEvent = FormEventConditional & {
  /** The type of submission event. */
  type: 'FRESHDESK_ADD_NOTE_TO_TICKET'
  /** Configuration specific to the type of submission event. */
  configuration: ApprovalFormsInclusionConfiguration
}

export type SchedulingSubmissionEvent = FormEventConditional & {
  type: 'SCHEDULING'
  configuration: PDFConfiguration &
    ApprovalFormsInclusionConfiguration & {
      /** The id of scheduling provider. */
      nylasAccountId: string
      /** The id of the scheduling page. */
      nylasSchedulingPageId: number
      /**
       * The id of the form element to map to the name field on the scheduling
       * page. Must be a text element.
       */
      nameElementId?: string
      /**
       * The id of the form element to map to the email field on the scheduling
       * page. Must be an email element.
       */
      emailElementId?: string
      /** An optional extra description to be included in the email. */
      emailDescription?: string
    }
}

// EVENTS
export type FormPaymentEvent =
  | CPPaySubmissionEvent
  | BPOINTSubmissionEvent
  | WestpacQuickWebSubmissionEvent

export type FormSchedulingEvent = SchedulingSubmissionEvent
export type FormWorkflowEvent =
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
  | FormWorkflowEvent

// EVENT TYPE PROPERTY TYPES
export type FormPaymentEventType = FormPaymentEvent['type']
export type FormSchedulingEventType = FormSchedulingEvent['type']
export type FormWorkflowEventType = FormWorkflowEvent['type']
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

export type BaseFormSubmissionProcessing = {
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
} & S3SubmissionTags

export type FormSubmissionProcessingEvent<T> = BaseFormSubmissionProcessing & {
  type: 'EVENT'
  submissionEvent: T
}
export type FormSubmissionProcessingJob = BaseFormSubmissionProcessing & {
  type: 'JOB'
}
export type FormSubmissionProcessingFormStore = BaseFormSubmissionProcessing & {
  type: 'FORM_STORE'
}
export type FormSubmissionProcessingTierRestrictions = BaseFormSubmissionProcessing & {
  type: 'TIER_RESTRICTIONS'
}

export type FormSubmissionProcessing<T = undefined> =
  | FormSubmissionProcessingEvent<T>
  | FormSubmissionProcessingJob
  | FormSubmissionProcessingFormStore
  | FormSubmissionProcessingTierRestrictions

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
