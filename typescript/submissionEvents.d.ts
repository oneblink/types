import type { ConditionalPredicate } from './conditions'
import { DeveloperKeyReference } from './keys'
import type {
  EndpointConfiguration,
  EndpointConfigurationAPI,
  EndpointConfigurationCallback,
  UserProfile,
} from './misc'
import { FormSubmissionPDFPageSize } from './pdf'

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
  /**
   * Whether the event can be retried automatically after a failure that was
   * deemed to be the customers fault.
   */
  isRetryable?: boolean
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

export type CallbackSubmissionEvent = FormEventBase &
  EndpointConfigurationCallback

export type PowerAutomateFlowSubmissionEvent = FormEventBase & {
  type: 'POWER_AUTOMATE_FLOW'
  configuration: {
    /** URL that the callback is made to. */
    url: string
    /** The unique identifier for the form that should trigger this workflow event */
    formId?: number
  }
}

export type CPIntegrationHubWebhookSubmissionEvent = FormEventBase & {
  type: 'CP_INTEGRATION_HUB_WEBHOOK'
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
  /**
   * Whether the calendar booking details associated with the submission should
   * be included in the generated pdf (defaults to `false`)
   */
  includeCalendarBookingInPdf?: boolean
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
  /** The page size of the Generated PDF. */
  pdfSize?: FormSubmissionPDFPageSize
  /** The identifier for a Custom PDF. */
  customPdfId?: string
  /** Whether the Custom PDF will be editable after being generated (defaults to false) */
  isCustomPdfEditable?: boolean
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
  /** Endpoint configuration for adding custom attachments to the email. */
  emailAttachmentsEndpoint?: EndpointConfiguration
  /** An array of element ids to exclude from the email when adding attachments. */
  excludedAttachmentElementIds?: string[]
}

/**
 * @deprecated Use the `EmailSubmissionEvent` instead with the
 *   `pdfConfigurations` property set.
 */
export type PdfSubmissionEvent = FormEventBase & {
  type: 'PDF'
  configuration: PDFConfiguration & EmailConfiguration
}

export type EmailSubmissionEvent = FormEventBase & {
  type: 'EMAIL'
  configuration: EmailConfiguration & {
    pdfConfigurations?: PDFConfiguration[]
  }
}

/** @deprecated Use the `EmailSubmissionEvent` type instead. */
export type EmailOnlySubmissionEvent = EmailSubmissionEvent

export type OneBlinkAPISubmissionEvent = FormEventBase &
  EndpointConfigurationAPI

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
    /**
     * The optional notificationElementId that holds the value which determines
     * whether to send a notification or not. Must be the id of a `boolean` form element.
     */
    notificationElementId?: string
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

export type CPPayPaymentDisplayDetailKey =
  | 'CP_PAY_TRANSACTION_ID'
  | 'CP_PAY_ORDER_NUMBER'
  | 'CP_PAY_PAYMENT_TYPE'
  | 'CP_PAY_CREDIT_CARD_MASK'
  | 'CP_PAY_AMOUNT'
  | 'CP_PAY_CREATED_DATE_TIME'

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

export type BPointPaymentDisplayDetailKey =
  | 'BPOINT_RECEIPT_NUMBER'
  | 'BPOINT_CRN1'
  | 'BPOINT_CRN2'
  | 'BPOINT_CRN3'
  | 'BPOINT_BILLER_CODE'
  | 'BPOINT_CREDIT_CARD_MASK'
  | 'BPOINT_AMOUNT'
  | 'BPOINT_SURCHARGE_AMOUNT'
  | 'BPOINT_PROCESSED_DATE_TIME'

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

export type WestpacQuickStreamPaymentDisplayDetailKey =
  | 'WESTPAC_QUICK_STREAM_RECEIPT_NUMBER'
  | 'WESTPAC_QUICK_STREAM_PAYMENT_REFERENCE_NUMBER'
  | 'WESTPAC_QUICK_STREAM_CUSTOMER_REFERENCE_NUMBER'
  | 'WESTPAC_QUICK_STREAM_AMOUNT'
  | 'WESTPAC_QUICK_STREAM_SURCHARGE_AMOUNT'
  | 'WESTPAC_QUICK_STREAM_SETTLEMENT_DATE'

export type WestpacQuickStreamSubmissionEvent = FormEventBase & {
  type: 'WESTPAC_QUICK_STREAM'
  configuration: {
    /**
     * The elementId that holds the value that will be paid. Must be the id of a
     * number or calculation element.
     */
    elementId: string
    /** The id of the OneBlink -> WestpacQuickStream integration environment to be used. */
    environmentId: string
    /** A crn string. */
    customerReferenceNumber: string
  }
}

export type NSWGovPayPaymentDisplayDetailKey =
  | 'NSW_GOV_PAY_COMPLETION_REFERENCE'
  | 'NSW_GOV_PAY_PAYMENT_REFERENCE'
  | 'NSW_GOV_PAY_BANK_REFERENCE'
  | 'NSW_GOV_PAY_PAYMENT_METHOD'
  | 'NSW_GOV_PAY_BPAY_BILLER_CODE'
  | 'NSW_GOV_PAY_CREDIT_CARD_NUMBER'
  | 'NSW_GOV_PAY_AMOUNT'
  | 'NSW_GOV_PAY_SURCHARGE_AMOUNT'
  | 'NSW_GOV_PAY_SURCHARGE_GST'
  | 'NSW_GOV_PAY_CREATED_DATE_TIME'

export type NSWGovPaySubmissionEvent = FormEventBase & {
  type: 'NSW_GOV_PAY'
  configuration: {
    /**
     * The elementId that holds the value that will be paid. Must be the id of a
     * number or calculation element.
     */
    elementId: string
    /** The id of the OneBlink -> NSW_GOV_PAY integration primary agency to be used. */
    primaryAgencyId: string
    /**
     * Used to describe the product the customer is purchasing. Passed on NSW
     * GovPay during the request payment process
     */
    productDescription: string
    /**
     * An optional customer reference that will be passed on NSW GovPay during
     * the request payment process
     */
    customerReference?: string
    /**
     * A optional sub agency code that will ensure the payment goes to the
     * correct agency within NSW GovPay
     */
    subAgencyCode?: string
  }
}

export type PaymentDisplayDetailKey =
  | NSWGovPayPaymentDisplayDetailKey
  | BPointPaymentDisplayDetailKey
  | CPPayPaymentDisplayDetailKey
  | WestpacQuickStreamPaymentDisplayDetailKey

export type FormElementMapping<T> = T &
  (
    | {
        type: 'FORM_FORM_ELEMENT'
        formElementId: string
        mapping: FormElementMapping<T>
      }
    | {
        type: 'FORM_ELEMENT'
        formElementId: string
      }
    | {
        type: 'VALUE'
        value: number | string | boolean | string[]
      }
    | {
        type: 'SUBMISSION_ID'
      }
    | {
        type: 'EXTERNAL_ID'
      }
    | {
        type: 'SUBMISSION_TIMESTAMP'
      }
    | {
        type: 'COMPLETION_TIMESTAMP'
      }
    | {
        type: 'PAYMENT_DETAIL'
        key: PaymentDisplayDetailKey
      }
  )

type BaseFreshdeskSubmissionEventFieldMapping = {
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

export type FreshdeskAddNoteToTicketSubmissionEvent = FormEventBase & {
  /** The type of submission event. */
  type: 'FRESHDESK_ADD_NOTE_TO_TICKET'
  /** Configuration specific to the type of submission event. */
  configuration: ApprovalFormsInclusionConfiguration
}

export type NylasSubmissionEvent = FormEventBase & {
  type: 'NYLAS'
  configuration: PDFConfiguration & {
    nylasGrantId: string
    /** The id of the Nylas scheduler configuration */
    nylasConfigurationId: string
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

export type SharepointColumnResourceDefinitionBase = {
  /**
   * The API-facing name of the column. Use this in the `fields` property when
   * creating the list item.
   */
  sharepointColumnDefinitionName: string
}

export type SharepointCreateListItemSubmissionEventMapping =
  FormElementMapping<SharepointColumnResourceDefinitionBase>

type SharepointSubmissionEventBase = {
  /** The id of the entra application in integration configuration */
  integrationEntraApplicationId: string
  /** The Sharepoint Site */
  sharepointSite: {
    /** The id of the Sharepoint Site */
    id: string
    /** The display name of the Sharepoint Site */
    displayName: string
  }
}

export type SharepointCreateListItemSubmissionEvent = FormEventBase & {
  type: 'SHAREPOINT_CREATE_LIST_ITEM'
  configuration: SharepointSubmissionEventBase & {
    /** The Sharepoint List */
    sharepointList: {
      /** The id of the Sharepoint List */
      id: string
      /** The display name of the Sharepoint List */
      displayName: string
    }
    /** Array of mappings. */
    mapping: SharepointCreateListItemSubmissionEventMapping[]
  }
}

export type SharepointStoreFilesSubmissionEvent = FormEventBase & {
  type: 'SHAREPOINT_STORE_FILES'
  configuration: PDFConfiguration &
    SharepointSubmissionEventBase & {
      sharepointDrive: {
        /** The id of the Sharepoint Drive */
        id: string
        /** The display name of the Sharepoint Drive */
        displayName: string
      }
      /**
       * The folder within the selected drive to upload files to. If not
       * specified the root of the drive will be used. If the folder does not
       * exist it will be created as part of the upload. Path must begin with a
       * forward slash and not end with a forward slash e.g. "/forms/1/submissions"
       */
      folderPath?: string
      /**
       * Set to `true` to prevent all form submission attachments from being
       * uploaded to SharePoint.
       */
      excludeAttachments: boolean
    }
}

export type ExcelFileColumnResourceDefinitionBase = {
  /** The name of the column */
  columnName: string
}

export type ExcelFileColumnResourceDefinition =
  FormElementMapping<ExcelFileColumnResourceDefinitionBase>

export type ExcelAddRowSubmissionEvent = FormEventBase & {
  type: 'EXCEL_ADD_ROW'
  configuration: SharepointSubmissionEventBase & {
    sharepointDrive: {
      /** The id of the Sharepoint Drive */
      id: string
      /** The display name of the Sharepoint Drive */
      displayName: string
    }
    /**
     * The folder within the selected drive where the excel file is located.
     * Path must begin with a forward slash and not end with a forward slash
     * e.g. "/documents"
     */
    folderPath: string
    excelFile: {
      /* the id of the excel file */
      id: string
      /* the name of the excel file */
      displayName: string
    }
    table: {
      /* the id of the table */
      id: string
      /* the name of the table */
      displayName: string
    }
    /** Array of mappings. */
    mapping: ExcelFileColumnResourceDefinition[]
  }
}

export type CivicRecCompleteCheckoutSubmissionEvent = FormEventBase & {
  type: 'CIVIC_REC_COMPLETE_CHECKOUT'
  configuration: { environmentId: string }
}

export type GoodToGoUpdateAssetResourceDefinition = {
  goodToGoCustomFieldName: string
}

export type GoodToGoUpdateAssetSubmissionEventMapping =
  FormElementMapping<GoodToGoUpdateAssetResourceDefinition>

export type GoodToGoUpdateAssetSubmissionEvent = FormEventBase & {
  type: 'GOOD_TO_GO_UPDATE_ASSET'
  configuration: {
    /** The id of the element which contains the asset id */
    elementId: string
    /** The id of the OneBlink -> GoodToGo integration API key to be used. */
    integrationKeyId: string
    mapping: GoodToGoUpdateAssetSubmissionEventMapping[]
  }
}

// EVENTS
export type FormPaymentEvent =
  | CPPaySubmissionEvent
  | BPOINTSubmissionEvent
  | WestpacQuickStreamSubmissionEvent
  | NSWGovPaySubmissionEvent

export type FormSchedulingEvent = NylasSubmissionEvent
export type FormWorkflowEvent =
  | CallbackSubmissionEvent
  | PowerAutomateFlowSubmissionEvent
  | CPIntegrationHubWebhookSubmissionEvent
  | PdfSubmissionEvent
  | OneBlinkAPISubmissionEvent
  | TrimSubmissionEvent
  | CPHCMSSubmissionEvent
  | CivicaCrmSubmissionEvent
  | EmailOnlySubmissionEvent
  | FreshdeskCreateTicketSubmissionEvent
  | FreshdeskAddNoteToTicketSubmissionEvent
  | SharepointCreateListItemSubmissionEvent
  | SharepointStoreFilesSubmissionEvent
  | CivicRecCompleteCheckoutSubmissionEvent
  | GoodToGoUpdateAssetSubmissionEvent
  | ExcelAddRowSubmissionEvent

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

export type S3SubmissionTags = {
  /**
   * @deprecated No longer stored as an S3 tag. It is now stored in the S3
   *   object JSON data.
   */
  externalId?: string
  jobId?: string
  /**
   * @deprecated `username` should be stored as a claim in token instead of
   *   using `userToken` when submitting forms using a developer key.
   */
  userToken?: string
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
  formsAppId?: number
  keyId?: string
  user?: UserProfile
  developerKey?: DeveloperKeyReference
  timezone: string
  externalId?: string
} & S3SubmissionTags

export type FormSubmissionProcessingEvent<T> = BaseFormSubmissionProcessing & {
  type: 'EVENT'
  submissionEvent: T
  formSubmissionWorkflowEventId: number
  /**
   * The delay in seconds before the event will be processed. This is to allow
   * for retries to be delayed to give third party systems time to recover.
   */
  delayInSeconds: number
  /**
   * A number representing the attempt. First attempt will be 1, second attempt
   * will be 2, and so on.
   */
  attempt: number
  /**
   * Represents the number of failed attempts before an error will be reported
   * to the customer. If the event succeeds before reaching the maximum
   * attempts, the customer will be notified. If the event is not configured to
   * allow retries, the `maxAttempts` should be 1.
   */
  maxAttempts: number
}
export type FormSubmissionProcessingFormStore = BaseFormSubmissionProcessing & {
  type: 'FORM_STORE'
}

export type FormSubmissionProcessing<T = undefined> =
  | FormSubmissionProcessingEvent<T>
  | FormSubmissionProcessingFormStore

export type WebhookSubmissionEventPayload = {
  formsAppId?: number
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
