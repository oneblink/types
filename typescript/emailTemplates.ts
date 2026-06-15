import {
  BaseSearchResult,
  IdResource,
  WithEnvironmentAssociation,
  WithOrganisationAssociation,
  WithWorkspacesAssociation,
} from './misc'

export type EmailTemplateEnvironment = WithEnvironmentAssociation & {
  template: string
}

export type NewEmailTemplate = WithOrganisationAssociation &
  WithWorkspacesAssociation & {
    name: string

    environments: EmailTemplateEnvironment[]
    type:
      | 'FORM_SUBMISSION_EVENT_PDF'
      | 'FORMS_APP_WELCOME_EMAIL'
      | 'APPROVAL_CLARIFICATION_REQUEST'
      | 'APPROVAL_APPROVED'
      | 'APPROVAL_DENIED'
      | 'TO_APPROVER_APPROVAL_CREATED'
      | 'FORM_SUBMISSION_EVENT_EMAIL'
  }

export type EmailTemplate = NewEmailTemplate & {
  id: number
  createdAt: string
  updatedAt: string
}

/** Custom email header applied to classified emails. */
export type EmailClassificationEmailHeader = {
  /** The email header name, e.g. `X-Protective-Marking`. */
  name: string
  /**
   * The email header value, e.g. `VER=2025.1, NS=gov.au,
   * SEC=OFFICIAL:Sensitive, ACCESS=Legal-Privilege`.
   */
  value: string
}

/**
 * Environment-specific configuration for an email classification, such as
 * content and protective marking headers.
 */
export type EmailClassificationEnvironment = WithEnvironmentAssociation & {
  /**
   * HTML content displayed at the top and/or tail of affected emails. For
   * example, NSW Government classifications may use centred, all-caps text
   * styled with `#630019` at 12pt.
   */
  content: string
  /** Custom email headers applied to affected emails. */
  emailHeaders: EmailClassificationEmailHeader[]
}

/**
 * An email classification that can be configured once and referenced by
 * multiple forms to apply data classification to workflow and approval emails.
 */
export type NewEmailClassification = WithOrganisationAssociation &
  WithWorkspacesAssociation & {
    /** The label of the classification. */
    label: string
    /**
     * Environment-specific classification configuration. Each entry defines the
     * content and email headers to apply for a forms app environment.
     */
    environments: EmailClassificationEnvironment[]
  }

/** An email classification resource. */
export type EmailClassification = NewEmailClassification & IdResource

/** Search response containing email classifications. */
export type EmailClassificationSearchResponse = {
  emailClassifications: EmailClassification[]
} & BaseSearchResult
