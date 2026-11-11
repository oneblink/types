import type { ConditionalPredicate } from '../conditions'
import type { EndpointConfiguration } from '../misc'
import { FormSubmissionPDFPageSize } from '../pdf'

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
  /**
   * Whether pages in the form submission should translate to page breaks in the
   * PDF.
   */
  usePagesAsBreaks?: boolean
  /**
   * Whether the external id should be included in the generated pdf (defaults
   * to `false`).
   */
  includeExternalIdInPdf?: boolean
  /** The page size of the Generated PDF. */
  pdfSize?: FormSubmissionPDFPageSize
  /** Whether the generated pdf should be combined with the pdf attachments. */
  combineWithPdfAttachments?: boolean
  /** The identifier for a Custom PDF. */
  customPdfId?: string
  /**
   * Whether the Custom PDF will be editable after being generated (defaults to
   * false)
   */
  isCustomPdfEditable?: boolean
}

export type EmailConfiguration = ApprovalFormsInclusionConfiguration & {
  /** @deprecated: use toEmail instead */
  email?: string
  /**
   * The to: email addresses in which a PDF copy of the form submission will be
   * sent.
   */
  toEmail?: string[]
  /**
   * The cc: email addresses in which a PDF copy of the form submission will be
   * sent.
   */
  ccEmail?: string[]
  /**
   * The bcc: email addresses in which a PDF copy of the form submission will be
   * sent.
   */
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
