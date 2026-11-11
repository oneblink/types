import type {
  EmailConfiguration,
  FormEventBase,
  PDFConfiguration,
} from './common'

/**
 * @deprecated Use the `EmailSubmissionEvent` instead with the
 *   `pdfConfigurations` property set.
 */
export type PdfSubmissionEvent = FormEventBase & {
  type: 'PDF'
  configuration: PDFConfiguration & EmailConfiguration
}
