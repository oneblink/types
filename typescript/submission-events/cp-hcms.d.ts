import type { FormEventBase, PDFConfiguration } from './common'

export type CPHCMSSubmissionEvent = FormEventBase & {
  type: 'CP_HCMS'
  configuration: PDFConfiguration & {
    /** The content type name for the submission in the CivicPlus HCMS. */
    contentTypeName: string
    /**
     * The optional notificationElementId that holds the value which determines
     * whether to send a notification or not. Must be the id of a `boolean` form
     * element.
     */
    notificationElementId?: string
    /** An array of element ids to be set as encrypted in the CivicPlus HCMS. */
    encryptedElementIds?: string[]
    /** Whether the generated pdf file should be encrypted. (defaults to `false`) */
    encryptPdf?: boolean
    /** Tags that should be added to the content created in the CivicPlus HCMS. */
    tags?: string[]
    /**
     * The categories that should be added to the content created in the
     * CivicPlus HCMS.
     */
    categories?: Array<{
      id: string
      name: string
    }>
  }
}
