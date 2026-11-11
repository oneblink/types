import type {
  EmailConfiguration,
  FormEventBase,
  PDFConfiguration,
} from './common'

export type EmailSubmissionEvent = FormEventBase & {
  type: 'EMAIL'
  configuration: EmailConfiguration & {
    pdfConfigurations?: PDFConfiguration[]
  }
}

/** @deprecated Use the `EmailSubmissionEvent` type instead. */

export type EmailOnlySubmissionEvent = EmailSubmissionEvent
