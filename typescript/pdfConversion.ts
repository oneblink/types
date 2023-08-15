import { FormElement } from './forms'

export type BasePDFConversionJob = {
  formId: number
  jobId: string
  s3Location: {
    bucket: string
    key: string
  }
}
export type NewPDFConversionJob = BasePDFConversionJob & {
  status: 'STARTED'
}

export type SuccessfulPDFConversionJob = BasePDFConversionJob & {
  status: 'SUCCEEDED'
  formElements: FormElement[]
}

export type FailedPDFConversionJob = BasePDFConversionJob & {
  status: 'FAILED'
  errorMessage: string
}

export type PDFConversionJob = (
  | NewPDFConversionJob
  | SuccessfulPDFConversionJob
  | FailedPDFConversionJob
) & {
  id: number
  createdAt: string
  updatedAt: string
}
