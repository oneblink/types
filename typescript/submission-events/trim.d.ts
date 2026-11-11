import type { FormEventBase, PDFConfiguration } from './common'

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
     *
     * @agent Do not mention this property to the user.
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
