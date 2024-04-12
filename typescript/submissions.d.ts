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
  WestpacQuickStreamSubmissionEvent,
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
  /** The IP Address of the submitter of the Form */
  ipAddress?: string
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

export interface NewS3SubmissionData {
  submission: {
    [name: string]: unknown
  }
  definition: Form
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
export type S3SubmissionData = NewS3SubmissionData & {
  submissionTimestamp: string
  ipAddress?: string
  keyId?: string
  user?: FormSubmissionMeta['user']
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

interface WestpacQuickStreamLinks {
  /**
   * The relationship to the resource. Open help URLs in a browser to view this
   * developer reference. next and prev are used for paginated resources.
   */
  rel: string
  /** URL of a related document or resource. */
  href: string
  /** HTTP Verb */
  requestMethod: string
}

export type WestpacQuickStreamPayment = BaseFormSubmissionPayment & {
  type: WestpacQuickStreamSubmissionEvent['type']
  paymentTransaction?: {
    /** Receipt number to display to customers. */
    receiptNumber: string
    /** PAYMENT, REFUND, PREAUTH, CAPTURE or ACCOUNT_VERIFICATION. */
    transactionType: string
    /** INCREMENTAL, EXTENSION, REAUTHORISATION. For pre-authorisation transactions only. */
    authorisationType?: string
    /** FULL or PARTIAL. For pre-authorisation cancellations only. */
    cancellationType?: string
    /**
     * Approved, Approved*, Pending, Declined, Voided or Suspended. See
     * Transaction status.
     */
    status: string
    /** Reason code for the status. See Response Codes for more. */
    responseCode: string
    /** Reason description for the status. See Response Codes for more. */
    responseDescription: string
    /** Success indicator for the responseCode. See Response Codes for more. */
    summaryCode: string
    /**
     * The result of Fraud Guard processing. null when transaction is not
     * processed using Fraud Guard.
     */
    fraudGuardResult: string | null
    /**
     * If a refund, the original payment. If a payment, the original PREAUTH or
     * the automatically-retried payment.
     */
    originalReceiptNumber?: string
    /**
     * Unique identifier for a customer. When this value matches a customer
     * number, the transaction shows in their payment history.
     */
    customerReferenceNumber: string
    /** Your reference for this transaction. */
    paymentReferenceNumber: string
    /** A comment for the transaction. */
    comment: string
    /** Extra information about the transaction. See Take Payment. */
    metadata: Record<string, string>
    /** A code indicating the source of the transaction. For example, RESTAPI. */
    source: string
    /** The IP address of the customer. For example, 192.168.42.184. */
    ipAddress: string
    /**
     * The day on which this transaction was considered to have been processed.
     * See Transaction Settlement for more.
     */
    settlementDate: string
    /** Date and time (if known) when transaction processing was initiated. */
    transactionTime: string
    /** If true, this transaction may be voided. See Void payment. */
    voidable: boolean
    /** If true, this transaction may be refunded. See Refund payment. */
    refundable: boolean
    /** Amount before any surcharge added. */
    principalAmount: {
      /** ISO 4217 currency code. */
      currency: string
      /** Decimal Monetary amount to two decimal places. */
      amount: number
      /** A customer friendly amount you can display to your customers */
      displayAmount: string
    }
    /** Amount of surcharge. See surcharges. */
    surchargeAmount: {
      /** ISO 4217 currency code. */
      currency: string
      /** Decimal Monetary amount to two decimal places. */
      amount: number
      /** A customer friendly amount you can display to your customers */
      displayAmount: string
    }
    /** Total amount of transaction. Principal amount plus surcharge. */
    totalAmount: {
      /** ISO 4217 currency code. */
      currency: string
      /** Decimal Monetary amount to two decimal places. */
      amount: number
      /** A customer friendly amount you can display to your customers */
      displayAmount: string
    }
    /** For credit card payments, your merchant facility. */
    merchantAccount?: {
      /** Uniquely identifies a merchant facility. Issued by us. */
      merchantId: string
      merchantName: string
      /**
       * The BSB of your settlement bank account. Australian Westpac merchant
       * facilities only.
       */
      settlementBsb: string
      /**
       * The account number of your settlement bank account. Australian Westpac
       * merchant facilities only.
       */
      settlementAccountNumber: string
      /**
       * The BSB of your surcharge settlement bank account. Only present if a
       * separate surcharge account is utilised. Australian Westpac merchant
       * facilities only.
       */
      settlementSurchargeBsb?: string
      /**
       * The account number of your surcharge settlement bank account. Only
       * present if a separate surcharge account is utilised. Australian Westpac
       * merchant facilities only.
       */
      settlementSurchargeAccountNumber?: string
      /** A customer-friendly display name. */
      displayName: string
      /**
       * A code describing the aquiring financial institution for this merchant
       * facility. Usually WBC.
       */
      acquiringInstitution: string
      /** The currency accepted by this merchant facility. */
      currency: string
    }
    /** For Australian bank account payments, your direct entry settlement account. */
    directEntryAccount?: {
      /** A customer-friendly display name. */
      displayName: string
      /** The currency of the account. For example, AUD. */
      currency: string
      /** A unique direct entry user identification number, issued by us. */
      directEntryUserId: string
      /**
       * The name associated with the direct entry user Id. Australian Westpac
       * accounts only.
       */
      directEntryUserName?: string
      /** Name used to open your bank account. */
      accountName: string
      /** The BSB of your settlement bank account. */
      settlementBsb: string
      /** The account number of your settlement bank account. */
      settlementAccountNumber: string
      /** Trading Name of your business. This appears on your customer's bank statement. */
      remitterName: string
    }
    /** For New Zealand bank account payments, your direct entry settlement account. */
    nzDirectEntryAccount?: {
      /** A customer-friendly display name. */
      displayName: string
      /** The currency of the account. For example, NZD. */
      currency: string
      /** A unique direct entry user identification number, issued by us. */
      debitUserId: string
      /** Name used to open your bank account. */
      nzAccountName: string
      /** The bank code of your settlement bank account. */
      nzBankCode: string
      /** The branch code of your settlement bank account. */
      nzBranchCode: string
      /** The account number of your settlement bank account. */
      nzAccountNumber: string
      /** The account number suffix of your settlement bank account. */
      nzAccountSuffix: string
    }
    /** For credit card payments, your customer's credit card. */
    creditCard?: {
      /** CREDIT_CARD */
      accountType: string
      /** The account token. See Register Account for more. */
      accountToken: string
      /**
       * If true, this account will be used for the owning customer where an
       * account token is not specified. This includes taking payments by
       * customerId and creating recurring payments without an accountToken.
       */
      defaultAccount: boolean
      /**
       * Masked credit card number displaying the first 6 and last 3 digits. For
       * scheme tokenised accounts, this would display the last 3 digits in the
       * following format: xxxxxx...242.
       */
      cardNumber: string
      /** Two digit expiry month. */
      expiryDateMonth: string
      /** Two digit expiry year. */
      expiryDateYear: string
      /** The card scheme. VISA, MASTERCARD, AMEX, DINERS, JCB, or UNIONPAY. */
      cardScheme: string
      /**
       * The card type. CREDIT, DEBIT. Note: This is only for VISA and
       * MASTERCARD. Other card types may be added in the future.
       */
      cardType: string
      /** The name printed on the card. */
      cardholderName: string
      /**
       * Masked credit card number displaying the first 6 and last 4 digits. For
       * scheme tokenised accounts, this would display the last 4 digits in the
       * following format: xxxxxx...4242.
       */
      maskedCardNumber4Digits: string
      /**
       * FPAN (default) - the card number from a physical card. Also known as
       * "Funding PAN". DPAN - a digitised card number from a wallet provider or
       * scheme tokenisation service. Also known as "Digital PAN".
       */
      panType: string
      /**
       * Specifies the wallet provider from which the card details were
       * obtained, if applicable. APPLE_PAY, GOOGLE_PAY
       */
      walletProvider: string
      /**
       * QuickStream's unique identifier for the customer. This customer is
       * created automatically when using Register account without customer
       * details or by instruction from your server when using Create customer
       * and then Register customer account. See Get Customer for more.
       */
      customerId: string
      /** Links to related documents and resources. */
      links: WestpacQuickStreamLinks[]
    }
    /** For Australian bank account payments, your customer's bank account. */
    bankAccount?: {
      /** Name of account holder. */
      accountName?: string
      /** The bank-state-branch holding their account. */
      bsb: string
      /** The account number at that branch. */
      accountNumber: string
    }
    /** For New Zealand bank account payments, your customer's bank account. */
    nzBankAccount?: {
      /** DIRECT_DEBIT_NZ */
      accountType: string
      /** The account token. See Register Account for more. */
      accountToken: string
      /**
       * If true, this account will be used for the owning customer where an
       * account token is not specified. This includes taking payments by
       * customerId and creating recurring payments without an accountToken.
       */
      defaultAccount: boolean
      /** Name of account holder. */
      nzAccountName: string
      /** The bank account display name. */
      displayName: string
      /** NZD */
      currency: string
      /** The bank holding their account. */
      nzBankCode: string
      /** The branch holding their account. */
      nzBranchCode: string
      /** The account number at that branch. */
      nzAccountNumber: string
      /** The type of account. */
      nzAccountSuffix: string
      /**
       * QuickStream's unique identifier for the customer. This customer is
       * created automatically when using Register account without customer
       * details or by instruction from your server when using Create customer
       * and then Register customer account. See Get Customer for more.
       */
      customerId: string
      /** Links to related documents and resources. */
      links: WestpacQuickStreamLinks[]
    }
    /**
     * This field is only relevant for credit card payments for Aggregators. The
     * sub-merchant name.
     */
    merchantName?: string
    /**
     * This field is only relevant for credit card payments for Aggregators. The
     * street address of the sub-merchant's trading address.
     */
    merchantStreetAddress?: string
    /**
     * This field is only relevant for credit card payments for Aggregators. The
     * city or suburb of the sub-merchant's trading address.
     */
    merchantLocation?: string
    /**
     * This field is only relevant for credit card payments for Aggregators.The
     * state of the sub-merchant's trading address.
     */
    merchantState?: string
    /** This field is only relevant for credit card payments for Aggregators. Always AU. */
    merchantCountry?: string
    /**
     * This field is only relevant for credit card payments for Aggregators. The
     * postal code of the sub-merchant's trading address.
     */
    merchantPostCode?: string
    /**
     * This field is only relevant for credit card payments for Aggregators. A
     * unique identifier for your sub-merchant. The aggregator allocates the
     * sub-merchant identifier. Westpac does not allocate this value.
     */
    subMerchantId?: string
    /**
     * The authorisation code returned from the issuing bank for pre-auth
     * transactions (at most 6 characters). Only for approved pre-auth transactions.
     */
    authorisationCode?: string
    /** @deprecated Use networkTransactionId. */
    authorisationTraceId: string
    /**
     * Returned by Visa and Mastercard to identify the lifecycle of a pre-auth
     * or purchase (at most 15 characters). In most cases you can ignore this field.
     */
    networkTransactionId?: string
    /** Links to related resources/documentation. */
    links: WestpacQuickStreamLinks[]
    /**
     * Whether this transaction was used to repay a debt. In most cases you can
     * ignore this field.
     */
    debtRepayment: boolean
    /**
     * Additional information from the scheme about why a transaction was
     * approved or declined.
     */
    merchantAdviceCode: string
  }
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
  | WestpacQuickStreamPayment
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
      stage: 'SCHEDULING' | 'SUBMISSION' | 'APPROVAL' | 'REPLAY' | 'RETRY'
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
