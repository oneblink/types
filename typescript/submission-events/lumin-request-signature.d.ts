import type { FormEventBase } from './common'
import type { FormElementMapping } from './form-element-mapping'

export type LuminRequestSignatureValueMapping = FormElementMapping<
  Record<string, never>
>

export type LuminRequestSignatureSignerConfiguration = {
  /**
   * The signer role name as defined on the selected Lumin template. Must match
   * a role returned by the Lumin template details endpoint.
   */
  signerRole: string
  /** Mapping for the signer's display name sent to Lumin. */
  name: LuminRequestSignatureValueMapping
  /** Mapping for the signer's email address sent to Lumin. */
  emailAddress: LuminRequestSignatureValueMapping
}

export type LuminTemplateMergeTagResourceDefinition = {
  /**
   * The merge tag name on the Lumin template. Keys must match the Lumin `tags`
   * object.
   */
  luminMergeTagName: string
}

export type LuminTemplateFieldResourceDefinition = {
  /**
   * The form field name on the template. Keys must match the Lumin `fields`
   * object.
   */
  luminFieldName: string
}

export type LuminTemplateVariableResourceDefinition = {
  /**
   * The variable name on an AgreementGen template. Keys must match the Lumin
   * `variables` object.
   */
  luminVariableName: string
}

export type LuminRequestSignatureMergeTagMapping =
  FormElementMapping<LuminTemplateMergeTagResourceDefinition>

export type LuminRequestSignatureFieldMapping =
  FormElementMapping<LuminTemplateFieldResourceDefinition>

export type LuminRequestSignatureVariableMapping =
  FormElementMapping<LuminTemplateVariableResourceDefinition>

export type LuminRequestSignatureConfiguration = {
  /** The Lumin template used to create the signature request. */
  template: {
    /** The Lumin template id, including its prefix (e.g. `sign_`). */
    id: string
    /** The display name of the Lumin template. */
    name: string
  }
  /**
   * Signer configuration for each role defined on the Lumin template. The
   * number of signers and signing order are inherited from the template.
   */
  signers: LuminRequestSignatureSignerConfiguration[]
  /**
   * Mapping for the signature request `title` sent to Lumin (shown as agreement
   * name in the console).
   */
  title: LuminRequestSignatureValueMapping
  /**
   * Mapping for when the signature request expires. Manual `VALUE` mappings
   * should use an ISO 8601 datetime string. Converted to a Unix epoch timestamp
   * in milliseconds when the signature request is sent.
   */
  expiresAt: LuminRequestSignatureValueMapping
  /**
   * Mapping for the signer email subject. Sent to Lumin as
   * `custom_email.subject_name`.
   */
  emailSubject?: LuminRequestSignatureValueMapping
  /**
   * Mapping for the signer email title (heading in the custom email). Sent to
   * Lumin as `custom_email.title`.
   */
  emailTitle?: LuminRequestSignatureValueMapping
  /** Mappings from form data to merge tags on the Lumin template (`tags`). */
  mergeTagMapping?: LuminRequestSignatureMergeTagMapping[]
  /** Mappings from form data to form fields on the template (Lumin `fields`). */
  fieldMapping?: LuminRequestSignatureFieldMapping[]
  /**
   * Mappings from form data to variables on an AgreementGen template (Lumin
   * `variables`).
   */
  variableMapping?: LuminRequestSignatureVariableMapping[]
}

export type LuminRequestSignatureSubmissionEvent = FormEventBase & {
  type: 'LUMIN_REQUEST_SIGNATURE'
  configuration: {
    /**
     * The id of the OneBlink Lumin integration API key to be used.
     *
     * @agent Do not mention this property to the user.
     */
    integrationKeyId: string
    /** Signature request settings sent to the Lumin API. */
    lumin: LuminRequestSignatureConfiguration
  }
}

// EVENTS
