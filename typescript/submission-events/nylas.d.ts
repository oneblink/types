import type { FormEventBase, PDFConfiguration } from './common'

export type NylasSubmissionEvent = FormEventBase & {
  type: 'NYLAS'
  configuration: PDFConfiguration & {
    /** @agent Do not mention this property to the user. */
    nylasGrantId: string
    /**
     * The id of the Nylas scheduler configuration
     *
     * @agent Do not mention this property to the user.
     */
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
