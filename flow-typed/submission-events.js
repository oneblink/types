// @flow
'use strict'

declare type FormSubmissionEventType =
  | 'CALLBACK'
  | 'PDF'
  | 'SPOTTO'
  | 'ONEBLINK_API'
  | 'TRIM'
  | 'CP_PAY'
  | 'BPOINT'
  | 'CP_HCMS'

declare type ConditionalPredicateBase = {
  elementId: string,
}

declare type ConditionalPredicateNumeric = ConditionalPredicateBase & {
  type: 'NUMERIC',
  operator: '===' | '!==' | '>' | '>=' | '<' | '<=',
  value: number,
}

declare type ConditionalPredicateOptions = ConditionalPredicateBase & {
  type: 'OPTIONS',
  optionIds: Array<string>,
}
declare type ConditionalPredicate =
  | ConditionalPredicateNumeric
  | ConditionalPredicateOptions

declare type FormSubmissionEventConditional = {
  conditionallyExecute?: boolean,
  requiresAllConditionallyExecutePredicates?: boolean,
  conditionallyExecutePredicates?: Array<ConditionalPredicate>,
}

declare type CallbackSubmissionEvent = FormSubmissionEventConditional & {
  type: 'CALLBACK',
  configuration: {
    url: string,
    secret?: string,
  },
  isDraft: boolean,
}

declare type PdfSubmissionEvent = FormSubmissionEventConditional & {
  type: 'PDF',
  configuration: {
    email: string,
    emailSubjectLine: ?string,
    pdfFileName: ?string,
  },
  isDraft: boolean,
}

declare type SpottoSubmissionEvent = FormSubmissionEventConditional & {
  type: 'SPOTTO',
  isDraft: boolean,
}

declare type OneBlinkAPISubmissionEvent = FormSubmissionEventConditional & {
  type: 'ONEBLINK_API',
  configuration: {
    apiId: string,
    apiEnvironment: string,
    apiEnvironmentRoute: string,
    secret?: string,
  },
  isDraft: boolean,
}

declare type TrimSubmissionEvent = FormSubmissionEventConditional & {
  type: 'TRIM',
  configuration: {
    environmentId: string,
    recordTitle: string | void,
    container: {
      uri: number,
      label: string,
    },
    recordType: {
      uri: number,
      label: string,
    },
    actionDefinition: {
      uri: number,
      label: string,
    },
    location: {
      uri: number,
      label: string,
    },
  },
  isDraft: boolean,
}

declare type CPHCMSSubmissionEvent = FormSubmissionEventConditional & {
  type: 'CP_HCMS',
  configuration: {
    contentTypeName: string,
  },
  isDraft: boolean,
}

declare type CPPaySubmissionEvent = {
  type: 'CP_PAY',
  configuration: {
    elementId: string,
    gatewayId: string,
  },
  isDraft: boolean,
}

declare type BPOINTSubmissionEvent = {
  type: 'BPOINT',
  configuration: {
    elementId: string,
    environmentId: string,
  },
  isDraft: boolean,
}

declare type FormSubmissionEvent =
  | CallbackSubmissionEvent
  | PdfSubmissionEvent
  | SpottoSubmissionEvent
  | OneBlinkAPISubmissionEvent
  | TrimSubmissionEvent
  | CPHCMSSubmissionEvent
  | CPPaySubmissionEvent
  | BPOINTSubmissionEvent

declare type PaymentSubmissionEvent =
  | CPPaySubmissionEvent
  | BPOINTSubmissionEvent
