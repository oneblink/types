import type { FormEventBase, PDFConfiguration } from './common'
import type { FormElementMapping } from './form-element-mapping'

export type SalesforceObjectRecordFieldResourceDefinition = {
  salesforceObjectRecordFieldName: string
}

export type SalesforceCreateObjectRecordSubmissionEventMapping =
  FormElementMapping<SalesforceObjectRecordFieldResourceDefinition>

export type SalesforceCreateObjectRecordSubmissionEvent = FormEventBase & {
  type: 'SALESFORCE_CREATE_OBJECT_RECORD'
  configuration: {
    pdfConfigurations?: PDFConfiguration[]
    /**
     * The id of the OneBlink -> Salesforce integration Environment to be used.
     *
     * @agent Do not mention this property to the user.
     */
    environmentId: string
    object: {
      name: string
      label: string
    }
    mapping: SalesforceCreateObjectRecordSubmissionEventMapping[]
  }
}
