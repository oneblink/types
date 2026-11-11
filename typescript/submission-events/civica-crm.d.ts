import type { FormEventBase, PDFConfiguration } from './common'

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
    /**
     * The id of the OneBlink -> Civica integration environment to be used.
     *
     * @agent Do not mention this property to the user.
     */
    environmentId: string
    civicaCustomerContactMethod: CivicaCustomerContactMethod
    civicaCategory: CivicaRecord
    /** An array containing mapping information. */
    mapping: CivicaCrmSubmissionEventMapping[]
  }
}
