import { Form, FormElement, FormElementWithName } from './forms'
import { UserProfile } from './misc'
import { S3ObjectCredentials } from './aws'
import {
  BPOINTSubmissionEvent,
  CPPaySubmissionEvent,
  WestpacQuickWebSubmissionEvent,
  FormWorkflowEvent,
  FormSchedulingEvent,
  NSWGovPaySubmissionEvent,
} from './submissionEvents'
import { components as cpPayV1Components } from './cp-pay/swagger.v1'
import { components as cpPayV2Components } from './cp-pay/swagger.v2'
import {
  Task,
  TaskAction,
  TaskGroup,
  TaskGroupInstance,
} from './scheduledTasks'

export interface NewFormsAppDraft {
  /** The title input by the user to display the draft */
  title: string
  /** The id of the form the draft was saved against */
  formId: number
  /** The external id provided by a developer */
  externalId?: string | null
  /** The id of the job associated with the draft */
  jobId?: string | null
  /**
   * The previous form submission approval id, if the draft is a response to a
   * clarification request on the submission approval
   */
  previousFormSubmissionApprovalId?: string
  /** The id of the scheduled task that was started when the draft was saved. */
  taskId?: string
  /** The name of the scheduled task that was started when the draft was saved. */
  taskName?: string
  /** The id of the scheduled task group instance that the taskId is related to. */
  taskGroupInstanceId?: string
  /** The label of the scheduled task group instance that the taskId is related to. */
  taskGroupInstanceLabel?: string
  /** The id of the scheduled task action that was used to complete the task. */
  taskActionId?: string
  /** The label of the scheduled task action that was used to complete the task. */
  taskActionLabel?: string
}

export type FormsAppDraft = NewFormsAppDraft & {
  /** The id of the draft */
  draftId: string
  /** The id of the draft data stored */
  draftDataId?: string
  /**
   * The date and time (in ISO format) when the draft was last synced with the
   * server. It is NOT when a user last saved the draft after partially
   * completing the form. This property should have actually been called `syncedAt`.
   */
  updatedAt?: string
  /**
   * The date and time (in ISO format) the when a user last saved the draft
   * after partially completing the form. When a draft is updated, `createdAt`
   * is also updated to reflect when the draft was updated. This property should
   * have actually been called `updatedAt`.
   */
  createdAt?: string
  /** The UserProfile of the user who first created the draft */
  createdBy?: UserProfile
  /** The UserProfile of the user who last updated the draft */
  updatedBy?: UserProfile
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
  /** The evaluation of the submission title configuration */
  submissionTitle?: string
  /** The id of the OneBlink Form */
  formId: number
  /** The id of the Forms App submitting for */
  formsAppId: number
  /**
   * The date and time (in ISO format) the form was submitted. If this is
   * undefiend, then the submission data has not yet been submitted
   */
  dateTimeSubmitted?: string
  /** The date and time (in ISO format) the record was created. */
  createdAt: string
  formName?: string
  /** Information about the user that submitted the form */
  user?: UserProfile
  externalId?: string
  jobId?: string
  validationResult?:
    | {
        isInvalid: true
        error: string
      }
    | {
        isInvalid: false
      }
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
  lastElementUpdated?: FormElement
  externalId?: string
  task?: Task
  taskAction?: TaskAction
  taskGroup?: TaskGroup
  taskGroupInstance?: TaskGroupInstance
}

export type NewFormSubmissionFileAccessToken = {
  s3: S3ObjectCredentials['s3']
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

export type BaseFormSubmissionPayment = {
  id: string
  submissionId: string
  formId: number
  status: 'PENDING' | 'SUCCEEDED' | 'FAILED'
}

export type CPPayPayment = BaseFormSubmissionPayment & {
  type: CPPaySubmissionEvent['type']
  paymentTransaction?:
    | ({
        cpPayVersion?: 'v1'
      } & Required<
        cpPayV1Components['schemas']['ValidateTransactionResultDto']
      >)
    | ({
        cpPayVersion: 'v2'
      } & Required<
        cpPayV2Components['schemas']['TransactionDetailsViewModelResponseEnvelope']
      >)
}

export type WestpacQuickWebPayment = BaseFormSubmissionPayment & {
  type: WestpacQuickWebSubmissionEvent['type']
  paymentTransaction?: {
    sourceCode?: string
    receiptNumber?: string
    communityCode?: string
    supplierBusinessCode?: string
    paymentReference: string
    customerReferenceNumber?: string
    paymentAmount?: string
    surchargeAmount?: string
    cardScheme?: string
    settlementDate?: string
    createdDateTime?: string
    responseCode?: string
    responseDescription?: string
    successFlag: string
  }
}

export type BPOINTPayment = BaseFormSubmissionPayment & {
  type: BPOINTSubmissionEvent['type']
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
export type NSWGovPayPayment = BaseFormSubmissionPayment & {
  type: NSWGovPaySubmissionEvent['type']
  /** Payment details specific to NSW GovPay payments */
  paymentTransaction: {
    /** The URL to redirect the user back to after a payment attempt */
    redirectUrl: string
    /** The id of the OneBlink -> NSW_GOV_PAY integration primary agency to be used. */
    integrationPrimaryAgencyId: string
    /** The Payment Reference created when the requesting a payment from NSW GovPay */
    nswGovPayPaymentReference: string
    /**
     * The fields returned in the payment completion notification, will be
     * `undefined` until the payment is successfully completed
     */
    agencyCompletionPayment?: {
      /** Payment Method used (CARD, PAYPAL, PAYID, BPAY) */
      paymentMethod: 'CARD' | 'PAYPAL' | 'PAYID' | 'BPAY'
      /** Payment Reference shared with the agency */
      paymentReference: string
      /** Receipt Number generated by CPP to confirm successful payment */
      paymentCompletionReference: string
      /** Reference generated by the gateway for this payment */
      bankReference: string
      /** Amount collected */
      amount: number
      /** Surcharge collected */
      surcharge: number
      /** GST collected for the surcharge */
      surchargeGst: number
      /** Transaction ID given to CPP by the agency when the request is made */
      agencyTransactionId: string
      /** Account token for making recurring payment (if it was requested) */
      accountToken?: string
      /** Email of the customer for PayID and BPAY payments */
      emailAddress?: string
      /** Only for card payments */
      card?: {
        cardType: string
        last4Digits: string
        cardPresent: boolean
      }
      /** Only for BPAY payments */
      bPay?: {
        /** Biller Code for BPAY */
        billerCode: string
        /** CRN which was used to make the payment */
        crn: string
        /** Date on which the payment was processed */
        processingDate: string
      }
    }
  }
}

export type NewFormSubmissionPayment =
  | CPPayPayment
  | WestpacQuickWebPayment
  | BPOINTPayment
  | NSWGovPayPayment

export type FormSubmissionPayment = NewFormSubmissionPayment & {
  createdAt: string
  updatedAt: string
}

export type NewFormSubmissionWorkflowEvent = {
  formId: number
  status: 'QUEUED' | 'STARTED' | 'FAILED' | 'SUCCEEDED'
  event: FormWorkflowEvent | FormSchedulingEvent
  error?: string
  startedAt?: string
  finishedAt?: string
} & (
  | {
      submissionId: string
      stage: 'SCHEDULING' | 'SUBMISSION' | 'APPROVAL' | 'REPLAY'
    }
  | {
      draftId: string
      stage: 'DRAFT'
    }
)

export type FormSubmissionWorkflowEvent = NewFormSubmissionWorkflowEvent & {
  id: number
  createdAt: string
}
