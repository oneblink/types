import type { ConditionalPredicate } from './conditions'
import type { UserProfile } from './misc'

export type FormEventConditional = {
  /** Whether the submission event should be conditionally executed. */
  conditionallyExecute?: boolean
  /**
   * Whether the conditional execution requires all predicates to be true as
   * opposed to one.
   */
  requiresAllConditionallyExecutePredicates?: boolean
  /** Array of the conditional predicates. */
  conditionallyExecutePredicates?: ConditionalPredicate[]
}

export type FormEventBase = FormEventConditional & {
  /** A label to identify the event. */
  label?: string
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

export type CallbackSubmissionEvent = FormEventBase & {
  type: 'CALLBACK'
  configuration: {
    /** URL that the callback is made to. */
    url: string
    /**
     * Secret string used for verifying the authenticity of the request made
     * from the OneBlink system.
     */
    secret: string
  }
}

export type PowerAutomateFlowSubmissionEvent = FormEventBase & {
  type: 'POWER_AUTOMATE_FLOW'
  configuration: {
    /** URL that the callback is made to. */
    url: string
    /** The unique identifier for the form that should trigger this workflow event */
    formId?: number
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
export type PDFConfiguration = ApprovalFormsInclusionConfiguration & {
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
  /** An array of class names to exclude from the submission when generating pdf. */
  excludedCSSClasses?: string[]
  /** Whether pages in the form submission should translate to page breaks in the PDF. */
  usePagesAsBreaks?: boolean
  /**
   * Whether the external id should be included in the generated pdf (defaults
   * to `false`).
   */
  includeExternalIdInPdf?: boolean
}
export type EmailConfiguration = ApprovalFormsInclusionConfiguration & {
  /** @deprecated: use toEmail instead */
  email?: string
  /** The to: email addresses in which a PDF copy of the form submission will be sent. */
  toEmail?: string[]
  /** The cc: email addresses in which a PDF copy of the form submission will be sent. */
  ccEmail?: string[]
  /** The bcc: email addresses in which a PDF copy of the form submission will be sent. */
  bccEmail?: string[]
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
export type PdfSubmissionEvent = FormEventBase & {
  type: 'PDF'
  configuration: PDFConfiguration & EmailConfiguration
}

export type EmailOnlySubmissionEvent = FormEventBase & {
  type: 'EMAIL'
  configuration: EmailConfiguration
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

export type OneBlinkAPISubmissionEvent = FormEventBase & {
  type: 'ONEBLINK_API'
  configuration: OneBlinkAPISubmissionEventConfiguration
}

export type TrimUriOption = {
  /** The attribute label. */
  label: string
  /** The attribute uri. */
  uri: number
}

export type TrimSubmissionEvent = FormEventBase & {
  type: 'TRIM'
  configuration: PDFConfiguration & {
    /**
     * The id of the OneBlink -> TRIM (Micro Focus Content Manager) integration
     * environment to be used.
     */
    environmentId: string
    recordTitle?: string
    /** The container object. Contains the container properties. */
    container: TrimUriOption
    /** The recordType object. Contains the recordType properties. */
    recordType: TrimUriOption
    /** The actionDefinition object. Contains the actionDefinition properties. */
    actionDefinition?: TrimUriOption
    /** The location object. Contains the location properties. */
    location?: TrimUriOption
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
export type CivicaCrmSubmissionEvent = FormEventBase & {
  type: 'CIVICA_CRM'
  configuration: PDFConfiguration & {
    /** The id of the OneBlink -> Civica integration environment to be used. */
    environmentId: string
    civicaCustomerContactMethod: CivicaCustomerContactMethod
    civicaCategory: CivicaRecord
    /** An array containing mapping information. */
    mapping: CivicaCrmSubmissionEventMapping[]
  }
}

export type CPHCMSSubmissionEvent = FormEventBase & {
  type: 'CP_HCMS'
  configuration: PDFConfiguration & {
    /** The content type name for the submission in the CivicPlus HCMS. */
    contentTypeName: string
    /** An array of element ids to be set as encrypted in the CivicPlus HCMS. */
    encryptedElementIds?: string[]
    /** Whether the generated pdf file should be encrypted. (defaults to `false`) */
    encryptPdf?: boolean
    /** Tags that should be added to the content created in the CivicPlus HCMS. */
    tags?: string[]
    /** The categories that should be added to the content created in the CivicPlus HCMS. */
    categories?: Array<{
      id: string
      name: string
    }>
  }
}

export type CPPaySubmissionEvent = FormEventBase & {
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

export type BPOINTSubmissionEvent = FormEventBase & {
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

export type WestpacQuickWebSubmissionEvent = FormEventBase & {
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
      type: 'FORM_FORM_ELEMENT'
      formElementId: string
      mapping: FreshdeskSubmissionEventFieldMapping
    }
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
  | {
      type: 'SUBMISSION_ID'
    }
  | {
      type: 'EXTERNAL_ID'
    }
)

export type FreshdeskCreateTicketSubmissionEvent = FormEventBase & {
  /** The type of submission event. */
  type: 'FRESHDESK_CREATE_TICKET'
  /** Configuration specific to the type of submission event. */
  configuration: ApprovalFormsInclusionConfiguration & {
    /** Array of freshdesk field mappings. */
    mapping: FreshdeskSubmissionEventFieldMapping[]
  }
}

export type FreshdeskAddNoteToTicketSubmissionEvent = FormEventBase & {
  /** The type of submission event. */
  type: 'FRESHDESK_ADD_NOTE_TO_TICKET'
  /** Configuration specific to the type of submission event. */
  configuration: ApprovalFormsInclusionConfiguration
}

export type SchedulingSubmissionEvent = FormEventBase & {
  type: 'SCHEDULING'
  configuration: PDFConfiguration & {
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
  | PowerAutomateFlowSubmissionEvent
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

export type NewWebhookSubscription = {
  callbackUrl: string
  organisationId: string
  keyId: string
  label?: string
  formId?: number
  trigger?: 'AFTER_SUBMISSION' | 'AFTER_APPROVAL'
}
export type WebhookSubscription = NewWebhookSubscription & {
  id: number
  createdAt: string
}

export interface S3SubmissionTags {
  /**
   * @deprecated No longer stored as an S3 tag. It is now stored in the S3
   *   object JSON data.
   */
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
  timezone: string
  externalId?: string
} & S3SubmissionTags

export type FormSubmissionProcessingEvent<T> = BaseFormSubmissionProcessing & {
  type: 'EVENT'
  submissionEvent: T
  formSubmissionWorkflowEventId: number
}
export type FormSubmissionProcessingJob = BaseFormSubmissionProcessing & {
  type: 'JOB'
}
export type FormSubmissionProcessingFormStore = BaseFormSubmissionProcessing & {
  type: 'FORM_STORE'
}

export type FormSubmissionProcessing<T = undefined> =
  | FormSubmissionProcessingEvent<T>
  | FormSubmissionProcessingJob
  | FormSubmissionProcessingFormStore

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
