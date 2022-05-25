import { Form, FormElementWithName } from './forms'
import { NoU, UserProfile } from './misc'
import { S3ObjectCredentials } from './aws'
import {
  BPOINTSubmissionEvent,
  CPPaySubmissionEvent,
  WestpacQuickWebSubmissionEvent,
} from './submissionEvents'

export interface NewFormsAppDraft {
  /** The title input by the user to display the draft */
  title: string
  /** The id of the form the draft was saved against */
  formId: number
  /** The external id provided by a developer */
  externalId: string | NoU
  /** The id of the job associated with the draft */
  jobId: string | NoU
  /**
   * The previous form submission approval id, if the draft is a response to a
   * clarification request on the submission approval
   */
  previousFormSubmissionApprovalId?: string
}

export type FormsAppDraft = NewFormsAppDraft & {
  /** The id of the draft */
  draftId: string
  /** The id of the draft data stored */
  draftDataId?: string
  /** The date and time (in ISO format) the draft was last updated */
  updatedAt?: string
  /** The date and time (in ISO format) the draft was created */
  createdAt?: string
}

export interface NewFormsAppJob {
  username: string
  /** The id of the form associated with the job */
  formId: number
  /** If the job was started and saved as a draft, this will include the draft. */
  draft?: FormsAppDraft
  /** The external id set when the job was created */
  externalId?: string
  /** The id of the prefill data associated with the job */
  preFillFormDataId?: string
  /** The job details */
  details: {
    /** The job title */
    title: string
    /** The job key */
    key?: string
    /** The job description */
    description?: string
    /** The job type */
    type?: string
    /** The job priority */
    priority?: number
  }
}

export type FormsAppJob = NewFormsAppJob & {
  /** The id the job */
  id: string
  /** Determine if the Job has been submitted */
  isSubmitted: boolean
  /** The date and time (in ISO format) the job was created */
  createdAt: string
  /** The date and time (in ISO format) the job was last updated */
  updatedAt: string
}

export interface JobSearchParameters {
  jobId?: string
  formIds?: number[]
  username?: string
  externalId?: string
  isSubmitted?: boolean
  limit?: number
  offset: number
}

type _FormSubmissionMeta = {
  /** The id of the submission data */
  submissionId: string
  /** The id of the OneBlink Form */
  formId: number
  /** The id of the Forms App submitting for */
  formsAppId: number
  /** The date and time (in ISO format) the form was submitted */
  dateTimeSubmitted: string
  formName?: string
  /** Information about the user that submitted the form */
  user?: UserProfile
  externalId?: string
  jobId?: string
}

export type NewFormSubmissionMeta = _FormSubmissionMeta & {
  /** The id of the key used to submit the form */
  keyId?: string
}

export type FormSubmissionMeta = _FormSubmissionMeta & {
  /** Information about the key that was used to submitted the form */
  key?: {
    /** The id of the key */
    id: string
    /** The name of the key */
    name: string
  }
}

export interface FormSubmissionRequest {
  submissionId: string
  recaptchas: Array<{
    token: string
  }>
}

export type S3SubmissionDataDeviceCordova = {
  type: 'CORDOVA'
  cordova?: boolean
  model?: string
  platform?: string
  uuid?: string
  version?: string
  manufacturer?: string
  isVirtual?: boolean
  serial?: string
}
export type S3SubmissionDataDeviceBrowser = {
  type: 'PWA' | 'BROWSER'
  appCodeName: typeof window.navigator.appCodeName
  appName: typeof window.navigator.appName
  appVersion: typeof window.navigator.appVersion
  cookieEnabled: typeof window.navigator.cookieEnabled
  hardwareConcurrency: typeof window.navigator.hardwareConcurrency
  language: typeof window.navigator.language
  maxTouchPoints: typeof window.navigator.maxTouchPoints
  platform: typeof window.navigator.platform
  userAgent: typeof window.navigator.userAgent
  vendor: typeof window.navigator.vendor
  vendorSub: typeof window.navigator.vendorSub
  webdriver: typeof window.navigator.webdriver
}
export type S3SubmissionDataDevice =
  | S3SubmissionDataDeviceCordova
  | S3SubmissionDataDeviceBrowser

export type S3SubmissionData = {
  submission: {
    [name: string]: unknown
  }
  definition: Form
  submissionTimestamp: string
  formsAppId: number
  ipAddress?: string
  keyId?: string
  user?: _FormSubmissionMeta['user']
  device?: S3SubmissionDataDevice
}

export type NewFormSubmissionFileAccessToken = {
  expiresAt: string
  s3: S3ObjectCredentials['s3']
  emailAddress: string
}

export type FormSubmissionFileAccessToken = {
  id: string
  createdAt: string
} & NewFormSubmissionFileAccessToken

export type FormSubmissionAttachment = {
  s3: {
    bucket: string
    key: string
    region: string
  }
  url: string
  contentType: string
  fileName: string
  id: string
  isPrivate: boolean
  uploadedAt?: string
}

type _BaseFormStoreRecord = {
  _id: string
  submissionId: string
  formsAppId: number
  user?: UserProfile
  externalId?: string
  jobId?: string
  key?: FormSubmissionMeta['key']
  definition: Form
  submission: S3SubmissionData['submission']
  device?: S3SubmissionDataDevice
  ipAddress?: string
}

export type DbFormStoreRecord = _BaseFormStoreRecord & {
  dateTimeSubmitted: Date
  createdAt: Date
}
export type NewDbFormStoreRecord = Omit<DbFormStoreRecord, '_id'>

export type FormStoreRecord = _BaseFormStoreRecord & {
  dateTimeSubmitted: string
  createdAt: string
}

export type FormStoreDefinition = {
  formId: number
  formElements: FormElementWithName[]
}

export type CPPayPayment = {
  type: CPPaySubmissionEvent['type']
  submissionId: string
  formId: number
  status: 'PENDING' | 'SUCCEEDED' | 'FAILED'
  paymentTransaction?: {
    transactionId: string
    transactionToken: string
    merchantCode: string
    orderNumber: string
    chargeTypeId: 1 | 2 | 3 | 4 | 5 | 6 | 7
    creditCardTypeId: 0 | 1 | 2 | 3 | 4 | 5 | 6
    paymentTypeId: 1 | 2
    amount: number
    lastFour: string
    expMonth: number
    expYear: number
    resultCode: number
    errorCode: CPPayTransactionErrorCodes
    errorMessage: string
    savedPaymentMethodToken: string
    customerReceipt: string
    merchantReceipt: string
    initialChargeStatusId: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    currentChargeStatusId: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8
    currentChargeStatusDtm: Date
    createdAt: Date
    updatedAt: Date
    deletedAt: Date
    customerSignature: string
    customerSignatureFormat: string
    isSuccessSavedPaymentMethod: boolean
  }
}

export type CPPayTransactionErrorCodes =
  | 0
  | 400
  | 401
  | 404
  | 503
  | 1001
  | 1002
  | 1003
  | 1004
  | 1005
  | 1006
  | 1007
  | 1008
  | 1009
  | 1010
  | 1012
  | 1013
  | 2001
  | 2002
  | 2003
  | 2004
  | 2005
  | 2006
  | 2007
  | 2008
  | 2009
  | 2010
  | 2011
  | 2012
  | 2013
  | 2014
  | 2015
  | 2016
  | 2017
  | 2018
  | 2019
  | 2020
  | 2021
  | 2022
  | 2023
  | 2024
  | 2025
  | 2026
  | 2027
  | 2028
  | 2029
  | 2030
  | 2031
  | 2032
  | 2033
  | 2034
  | 2035
  | 2036
  | 2050
  | 2100
  | 2101
  | 2102
  | 3001
  | 3002
  | 3003
  | 3004
  | 3005
  | 3006
  | 3007
  | 3008
  | 3009
  | 3010
  | 3011
  | 3012
  | 3013
  | 3014
  | 3015
  | 3016
  | 3017
  | 3018
  | 3019
  | 3020
  | 3021
  | 3022
  | 3023
  | 3024
  | 3025
  | 3026
  | 3027
  | 3028
  | 4001
  | 4002
  | 5001
  | 5002
  | 5003
  | 5004
  | 5005
  | 5006
  | 5007
  | 5008
  | 5009
  | 5010
  | 5011
  | 5012
  | 6000
  | 6001
  | 6002
  | 6003
  | 6004
  | 6005
  | 6006
  | 6007
  | 6008
  | 6009
  | 6010
  | 6011
  | 6012
  | 6013
  | 6014
  | 6015
  | 6016
  | 6017
  | 6018
  | 6019
  | 6020
  | 7001
  | 7002
  | 7004
  | 7005

export type WestpacQuickWebPayment = {
  type: WestpacQuickWebSubmissionEvent['type']
  submissionId: string
  formId: number
  status: 'PENDING' | 'SUCCEEDED' | 'FAILED'
  paymentTransaction?: {
    sourceCode?: string
    receiptNumber?: string
    communityCode?: string
    supplierBusinessCode?: string
    paymentReference: string
    customerReferenceNumber?: string
    paymentAmount?: number
    surchargeAmount?: number
    cardScheme?: string
    settlementDate?: string
    createdDateTime?: string
    responseCode?: string
    responseDescription?: string
    successFlag: boolean
  }
}

export type BPOINTPayment = {
  type: BPOINTSubmissionEvent['type']
  submissionId: string
  formId: number
  status: 'PENDING' | 'SUCCEEDED' | 'FAILED'
  paymentTransaction?: {
    Action: string
    Amount: number
    AmountOriginal: number
    AmountSurcharge: number
    AuthoriseId: string
    BankAccountDetails: {
      AccountName: string
      BSBNumber: string
      TruncatedAccountNumber: string
    }
    BankResponseCode: string
    BillerCode: string
    CardDetails: {
      CardHolderName: string
      Category: string
      ExpiryDate: string
      Issuer: string
      IssuerCountryCode: string
      Localisation: string
      MaskedCardNumber: string
      SubType: 'debit' | 'credit' | 'charge' | 'unknown'
    }
    CardType: 'AX' | 'DC' | 'JC' | 'MC' | 'UP' | 'VC'
    Crn1: string
    Crn2: string
    Crn3: string
    Currency: string
    CVNResult: {
      CVNResultCode: 'M' | 'S' | 'P' | 'U' | 'N' | 'Unsupported'
    }
    DVToken: string
    EmailAddress: string
    FraudScreeningResponse: {
      TxnRejected: boolean
      ResponseCode: string
      ResponseMessage: string
      ReDResponse: {
        REQ_ID: string
        ORD_ID: string
        STAT_CD: string
        FRAUD_STAT_CD: string
        FRAUD_RSP_CD: string
        FRAUD_REC_ID: string
        FRAUD_NEURAL: string
        FRAUD_RFC: string
      }
    }
    IsThreeDS: boolean
    IsCVNPresent: boolean
    IsTestTxn: boolean
    MerchantNumber: string
    MerchantReference: string
    OriginalTxnNumber: string
    ProcessedDateTime: string
    ReceiptNumber: string
    ResponseCode: string
    ResponseText: string
    RRN: string
    SettlementDate: string
    Source:
      | 'api'
      | 'callcentre'
      | 'customerportal'
      | 'internet'
      | 'invoiceportal'
      | 'ishop'
      | 'ivr'
      | 'backoffice'
      | 'mobilebackoffice'
      | 'sftp'
      | 'unknown'
    StoreCard: boolean
    SubType: 'single' | 'recurring'
    ThreeDSResponse: {
      Eci: string
      Enrolled: string
      Status: string
      VerifySecurityLevel: string
      VerifyStatus: string
      VerifyToken: string
      VerifyType: string
      Xid: string
    }
    TxnNumber: string
    Type:
      | 'callcenter'
      | 'cardpresent'
      | 'ecommerce'
      | 'internet'
      | 'ivr'
      | 'mailorder'
      | 'telephoneorder'
    StatementDescriptor: {
      AddressLine1?: string
      AddressLine2?: string
      City?: string
      CompanyName?: string
      CountryCode?: string
      MerchantName?: string
      PhoneNumber?: string
      PostCode?: string
      State?: string
    }
  }
}

export type NewFormSubmissionPayment =
  | CPPayPayment
  | WestpacQuickWebPayment
  | BPOINTPayment

export type FormSubmissionPayment = NewFormSubmissionPayment & {
  createdAt: string
  updatedAt: string
}
