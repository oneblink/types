import { GeoscapeAddress } from './geoscape'
import { PointAddress } from './point'
import { CivicaStreetName } from './civica/street-name'
import { CivicaNameRecord } from './civica/name-record'
import type { FormSubmissionEvent } from './submissionEvents'
import type { ConditionalPredicate } from './conditions'
import type { ABNRecord, BaseSearchResult } from './misc'
import { FormApprovalFlowStep } from './approvals'

////////////////////////////////////////
// Element Types

export type _FormElementBase = {
  isNew?: boolean
  /** The unique identifier for an individual form element. */
  id: string
  /** Determine if the element is conditionally shown (`true`) or not (`false`). */
  conditionallyShow: boolean
  /**
   * Determine if the predicates must all match (`true`) or if only one needs to
   * match (`false`) for the element to shown.
   */
  requiresAllConditionallyShowPredicates?: boolean
  /** Predicates to evaluate. */
  conditionallyShowPredicates?: ConditionalPredicate[]
}

export type FormElementBase = _FormElementBase & {
  /**
   * The key that will be assigned a value in the submission data when the form
   * is submitted.
   */
  name: string
  /** Display text presented to the user above the input by default. */
  label: string
  /**
   * A hint triggered by an icon tooltip to be displayed when hovering beside
   * the element label.
   */
  hint?: string
}

export type LookupFormElement = FormElementBase & {
  /** Determine if the element is a Data Lookup element (`true`) or not (`false`). */
  isDataLookup: boolean
  /**
   * The Id of the Data Lookup configured in the OneBlink System which will
   * return updated submission data.
   */
  dataLookupId?: number
  /** Determine if the element is a Data Lookup element (`true`) or not (`false`). */
  isElementLookup: boolean
  /**
   * The Id of the Element Lookup configured in the OneBlink System which will
   * return Form Elements to inject.
   */
  elementLookupId?: number
}

export type FormElementReadOnly = {
  /* Determine if this input can be edited by the user (`false`) or not (`true`). */
  readOnly?: boolean
}

export type FormElementRequired = FormElementBase & {
  /**
   * Determine if this input requires a value entered by the user (`true`) or
   * not (`false`).
   */
  required: boolean
}

export type FormElementBinaryStorage = FormElementBase & {
  /** How the photo taken by a user will be stored: `private`, `public`, `legacy`. */
  storageType?: 'legacy' | 'public' | 'private'
}

// Choice element types
export type DynamicChoiceElementOption = {
  label: string
  value: string
  colour?: string
}

export type ChoiceElementOptionAttribute = {
  label?: string
  value?: string
  elementId: string
  optionIds: string[]
}

export type ChoiceElementOption = {
  id: string
  attributes?: ChoiceElementOptionAttribute[]
} & DynamicChoiceElementOption

export type DynamicOptionsSetAttributeMap = {
  elementId: string
  attribute: string
}

type FormElementWithOptionsBase = LookupFormElement &
  FormElementRequired &
  FormElementReadOnly & {
    options?: ChoiceElementOption[]
    optionsType: 'CUSTOM' | 'DYNAMIC' | 'SEARCH' | 'FRESHDESK_FIELD'
    freshdeskFieldName?: string
    dynamicOptionSetId?: number
    conditionallyShowOptions?: boolean
    conditionallyShowOptionsElementIds?: string[]
    attributesMapping?: DynamicOptionsSetAttributeMap[]
  }

export type FormFormElement = _FormElementBase & {
  type: 'form'
  name: string
  formId: number
  elements?: FormElement[]
}

export type InfoPageElement = _FormElementBase & {
  type: 'infoPage'
  name: string
  formId: number
  elements?: FormElement[]
}

export type RadioButtonElement = FormElementWithOptionsBase & {
  type: 'radio'
  buttons: boolean
  defaultValue?: string
}

export type CheckboxElement = FormElementWithOptionsBase & {
  type: 'checkboxes'
  buttons: boolean
  defaultValue?: string[]
  canToggleAll?: boolean
}

export type SelectElement = FormElementWithOptionsBase & {
  type: 'select'
  multi: boolean
  defaultValue?: string | string[]
  canToggleAll?: boolean
}

export type AutoCompleteElement = FormElementWithOptionsBase & {
  type: 'autocomplete'
  defaultValue?: string
  searchUrl?: string
  placeholderValue?: string
}

export type ComplianceElement = FormElementWithOptionsBase &
  FormElementBinaryStorage & {
    type: 'compliance'
    defaultValue?: string
  }

export type FormElementWithOptions =
  | RadioButtonElement
  | CheckboxElement
  | SelectElement
  | AutoCompleteElement
  | ComplianceElement

// date element types
export type FormElementWithDate = {
  fromDate?: string | 'NOW'
  fromDateDaysOffset?: number
  toDate?: string | 'NOW'
  toDateDaysOffset?: number
  defaultValue?: string | 'NOW'
  defaultValueDaysOffset?: number
  placeholderValue?: string
} & LookupFormElement &
  FormElementRequired &
  FormElementReadOnly

export type DateElement = FormElementWithDate & {
  type: 'date'
}

export type DateTimeElement = FormElementWithDate & {
  type: 'datetime'
}

export type TimeElement = FormElementWithDate & {
  type: 'time'
}

export type FormElementWithInput<DefaultValue> = {
  defaultValue?: DefaultValue
  placeholderValue?: string
  regexPattern?: string
  regexFlags?: string
  regexMessage?: string
} & LookupFormElement &
  FormElementRequired &
  FormElementReadOnly

export type NumberElement = {
  type: 'number'
  minNumber?: number
  maxNumber?: number
  isSlider: boolean
  sliderIncrement?: number
  isInteger?: boolean
} & FormElementWithInput<number>

export type TextElement = {
  type: 'text'
  minLength?: number
  maxLength?: number
} & FormElementWithInput<string>

export type TextareaElement = {
  type: 'textarea'
  minLength?: number
  maxLength?: number
} & FormElementWithInput<string>

export type EmailElement = {
  type: 'email'
} & FormElementWithInput<string>

export type BarcodeScannerElement = {
  type: 'barcodeScanner'
  restrictBarcodeTypes: boolean
  restrictedBarcodeTypes?: string[]
} & FormElementWithInput<string>

export type TelephoneElement = {
  type: 'telephone'
} & FormElementWithInput<string>

export type ImageElement = FormElementBase & {
  type: 'image'
  defaultValue: string
}

export type DrawElement = FormElementRequired &
  FormElementReadOnly &
  FormElementBinaryStorage & {
    type: 'draw'
    defaultValue?: string
  }

export type CameraElement = FormElementRequired &
  FormElementReadOnly &
  FormElementBinaryStorage & {
    type: 'camera'
    defaultValue?: string
    includeTimestampWatermark: boolean
  }

export type HeadingElement = FormElementBase & {
  type: 'heading'
  headingType: number
}

export type LocationElement = {
  type: 'location'
  defaultValue?: unknown
} & LookupFormElement &
  FormElementRequired &
  FormElementReadOnly
export type _NestedElementsElement = {
  elements: FormElement[]
}

export type RepeatableSetElement = FormElementBase & {
  type: 'repeatableSet'
  minSetEntries?: number
  maxSetEntries?: number
  addSetEntryLabel?: string
  removeSetEntryLabel?: string
} & _NestedElementsElement &
  FormElementReadOnly

export type PageElement = _FormElementBase & {
  type: 'page'
  label: string
} & _NestedElementsElement

export type SectionElement = _FormElementBase & {
  type: 'section'
  isCollapsed: boolean
  label: string
  hint?: string
} & _NestedElementsElement

export type HtmlElement = FormElementBase & {
  type: 'html'
  defaultValue: string
}

export type CaptchaElement = FormElementRequired & {
  type: 'captcha'
}

export type FilesElement = FormElementBinaryStorage &
  LookupFormElement &
  FormElementReadOnly & {
    type: 'files'
    minEntries?: number
    maxEntries?: number
    restrictFileTypes: boolean
    restrictedFileTypes?: string[]
    defaultValue?: unknown
    allowExtensionlessAttachments?: boolean
  }

export type CalculationElement = FormElementBase & {
  type: 'calculation'
  defaultValue: string
  calculation: string
  preCalculationDisplay?: string
  displayAsCurrency?: boolean
}

export type SummaryElement = FormElementBase & {
  type: 'summary'
  elementIds: string[]
}

export type GeoscapeAddressElement = {
  type: 'geoscapeAddress'
  defaultValue?: GeoscapeAddress
  placeholderValue?: string
  stateTerritoryFilter?: string[]
} & LookupFormElement &
  FormElementRequired &
  FormElementReadOnly

export type PointAddressElement = {
  type: 'pointAddress'
  defaultValue?: PointAddress
  placeholderValue?: string
  stateTerritoryFilter?: string[]
  addressTypeFilter?: string[]
} & LookupFormElement &
  FormElementRequired &
  FormElementReadOnly

export type BooleanElement = LookupFormElement &
  FormElementRequired &
  FormElementReadOnly & {
    type: 'boolean'
    defaultValue: boolean
  }
export type CivicaStreetNameElement = {
  type: 'civicaStreetName'
  defaultValue?: CivicaStreetName
  placeholderValue?: string
} & LookupFormElement &
  FormElementRequired &
  FormElementReadOnly

export type CivicaNameRecordElement = {
  type: 'civicaNameRecord'
  defaultValue?: CivicaNameRecord
  useGeoscapeAddressing: boolean
  titleLabel?: string
  familyNameLabel?: string
  givenName1Label?: string
  givenName1IsRequired?: boolean
  givenName1IsHidden?: boolean
  emailAddressLabel?: string
  emailAddressIsRequired?: boolean
  emailAddressIsHidden?: boolean
  homePhoneLabel?: string
  homePhoneIsRequired?: boolean
  homePhoneIsHidden?: boolean
  businessPhoneLabel?: string
  businessPhoneIsRequired?: boolean
  businessPhoneIsHidden?: boolean
  mobilePhoneLabel?: string
  mobilePhoneIsRequired?: boolean
  mobilePhoneIsHidden?: boolean
  faxPhoneLabel?: string
  faxPhoneIsRequired?: boolean
  faxPhoneIsHidden?: boolean
  streetAddressesLabel?: string
  address1Label?: string
  address2Label?: string
  postcodeLabel?: string
} & FormElementRequired &
  FormElementReadOnly

/**
 * Allow the user to enter a valid ABN (as per https://abr.business.gov.au/).
 *
 * ### Example
 *
 * ```json
 * {
 *   "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
 *   "type": "abn",
 *   "name": "ABN",
 *   "label": "Please Enter Your ABN number",
 *   "defaultValue": {
 *     "recordLastUpdatedDate": "2021-11-13",
 *     "ABN": {
 *       "identifierValue": "26008672179",
 *       "isCurrentIndicator": "Y",
 *       "replacedFrom": "0001-01-01"
 *     },
 *     "entityStatus": {
 *       "entityStatusCode": "Active",
 *       "effectiveFrom": "1999-11-01",
 *       "effectiveTo": "0001-01-01"
 *     },
 *     "ASICNumber": "008672179",
 *     "entityType": {
 *       "entityTypeCode": "PUB",
 *       "entityDescription": "Australian Public Company"
 *     },
 *     "goodsAndServicesTax": {
 *       "effectiveFrom": "2000-07-01",
 *       "effectiveTo": "0001-01-01"
 *     },
 *     "mainName": {
 *       "organisationName": "BUNNINGS GROUP LIMITED",
 *       "effectiveFrom": "2005-09-01"
 *     },
 *     "mainTradingName": {
 *       "organisationName": "BUNNINGS GROUP LIMITED",
 *       "effectiveFrom": "2005-12-07"
 *     },
 *     "otherTradingName": {
 *       "organisationName": "BUNNINGS WAREHOUSE",
 *       "effectiveFrom": "2004-05-26"
 *     },
 *     "mainBusinessPhysicalAddress": {
 *       "stateCode": "VIC",
 *       "postcode": "3123",
 *       "effectiveFrom": "2020-02-04",
 *       "effectiveTo": "0001-01-01"
 *     },
 *     "businessName": [
 *       {
 *         "organisationName": "TOOL KIT DEPOT",
 *         "effectiveFrom": "2021-09-07"
 *       },
 *       {
 *         "organisationName": "CRAFTRIGHT",
 *         "effectiveFrom": "2021-05-20"
 *       }
 *     ]
 *   },
 *   "required": true,
 *   "readOnly": false
 * }
 * ```
 *
 * ### Example Submission Data
 *
 * ```json
 * {
 *   "submission": {
 *     "[element.name]": {
 *       "recordLastUpdatedDate": "2021-11-13",
 *       "ABN": {
 *         "identifierValue": "26008672179",
 *         "isCurrentIndicator": "Y",
 *         "replacedFrom": "0001-01-01"
 *       },
 *       "entityStatus": {
 *         "entityStatusCode": "Active",
 *         "effectiveFrom": "1999-11-01",
 *         "effectiveTo": "0001-01-01"
 *       },
 *       "ASICNumber": "008672179",
 *       "entityType": {
 *         "entityTypeCode": "PUB",
 *         "entityDescription": "Australian Public Company"
 *       },
 *       "goodsAndServicesTax": {
 *         "effectiveFrom": "2000-07-01",
 *         "effectiveTo": "0001-01-01"
 *       },
 *       "mainName": {
 *         "organisationName": "BUNNINGS GROUP LIMITED",
 *         "effectiveFrom": "2005-09-01"
 *       },
 *       "mainTradingName": {
 *         "organisationName": "BUNNINGS GROUP LIMITED",
 *         "effectiveFrom": "2005-12-07"
 *       },
 *       "otherTradingName": {
 *         "organisationName": "BUNNINGS WAREHOUSE",
 *         "effectiveFrom": "2004-05-26"
 *       },
 *       "mainBusinessPhysicalAddress": {
 *         "stateCode": "VIC",
 *         "postcode": "3123",
 *         "effectiveFrom": "2020-02-04",
 *         "effectiveTo": "0001-01-01"
 *       },
 *       "businessName": [
 *         {
 *           "organisationName": "TOOL KIT DEPOT",
 *           "effectiveFrom": "2021-09-07"
 *         },
 *         {
 *           "organisationName": "CRAFTRIGHT",
 *           "effectiveFrom": "2021-05-20"
 *         }
 *       ]
 *     }
 *   }
 * }
 * ```
 */
export type ABNElement = {
  /** The type of Form Element. */
  type: 'abn'
  /** A default value when the form is opened. */
  defaultValue?: ABNRecord
  /** The content to appear in the form control when the form control is empty. */
  placeholderValue?: string
} & LookupFormElement &
  FormElementRequired &
  FormElementReadOnly

export type BSBElement = {
  /** The type of Form Element. */
  type: 'bsb'
  /** A default value when the form is opened. */
  defaultValue?: string
  /** The content to appear in the form control when the form control is empty. */
  placeholderValue?: string
} & LookupFormElement &
  FormElementRequired &
  FormElementReadOnly

export type NestedElementsElement =
  | PageElement
  | RepeatableSetElement
  | SectionElement

export type NonNestedElementsElement =
  | ABNElement
  | TextElement
  | EmailElement
  | TextareaElement
  | NumberElement
  | DrawElement
  | CameraElement
  | DateElement
  | TimeElement
  | DateTimeElement
  | HeadingElement
  | LocationElement
  | HtmlElement
  | BarcodeScannerElement
  | CaptchaElement
  | ImageElement
  | FilesElement
  | CalculationElement
  | TelephoneElement
  | SummaryElement
  | GeoscapeAddressElement
  | PointAddressElement
  | BooleanElement
  | CivicaStreetNameElement
  | CivicaNameRecordElement
  | BSBElement
  | RadioButtonElement
  | CheckboxElement
  | SelectElement
  | AutoCompleteElement
  | ComplianceElement

export type FormElementWithoutForm =
  | NonNestedElementsElement
  | NestedElementsElement

export type FormElementWithForm = FormFormElement | InfoPageElement

export type FormElement = FormElementWithoutForm | FormElementWithForm

export type FormElementType = FormElement['type']

export type CalculationInsertionElement =
  | NumberElement
  | CalculationElement
  | SelectElement
  | RadioButtonElement
  | AutoCompleteElement

///////////////////////////////////////////////////////////////

export type FormPostSubmissionAction =
  | 'BACK'
  | 'URL'
  | 'CLOSE'
  | 'FORMS_LIBRARY'

export type FormServerValidation =
  | {
      type: 'CALLBACK'
      configuration: {
        url: string
      }
    }
  | {
      type: 'ONEBLINK_API'
      configuration: {
        apiId: string
        apiEnvironment: string
        apiEnvironmentRoute: string
      }
    }

export type Form = {
  id: number
  name: string
  description: string
  organisationId: string
  formsAppEnvironmentId: number
  formsAppIds: number[]
  elements: Array<FormElement>
  isAuthenticated: boolean
  isMultiPage: boolean
  publishStartDate?: string
  publishEndDate?: string
  isInfoPage: boolean
  postSubmissionAction: FormPostSubmissionAction
  redirectUrl?: string
  cancelAction: FormPostSubmissionAction
  cancelRedirectUrl?: string
  draftEvents?: FormSubmissionEvent[]
  schedulingEvents?: FormSubmissionEvent[]
  paymentEvents?: FormSubmissionEvent[]
  submissionEvents: FormSubmissionEvent[]
  approvalSteps?: FormApprovalFlowStep[]
  approvalEvents?: FormSubmissionEvent[]
  tags: Array<string>
  createdAt: string
  updatedAt: string
  serverValidation?: FormServerValidation
  externalIdGeneration?: FormServerValidation
}

export type PreviewUrl = {
  label: string
  url: string
}

export type FormTemplate = {
  id: number
  name: string
  description?: string
  elements: FormElement[]
  tags: string[]
  isInfoPage: boolean
  isMultiPage: boolean
  createdAt: string
  updatedAt: string
  previewUrls: PreviewUrl[]
}

export type FormQuerystringParameters = {
  name?: string
  isAuthenticated?: boolean
  isInfoPage?: boolean
  limit?: number
  offset: number
  injectForms?: boolean
}

// Options Sets/Lookups

export type FormElementDynamicOptionSetEnvironment = {
  url: string
  formsAppEnvironmentId: number
}

export type NewFormElementDynamicOptionSet = {
  name: string
  organisationId: string
  apiId?: string
  environments: FormElementDynamicOptionSetEnvironment[]
}

export type FormElementDynamicOptionSet = NewFormElementDynamicOptionSet & {
  id: number
  createdAt: string
  updatedAt: string
}

export type FormElementDynamicOptionSetSearchParameters = {
  organisationIds: string[]
  limit?: number
  offset?: number
}

export type NewBuiltInFormElementLookup = {
  type: 'ELEMENT' | 'DATA'
  name: string
  url: string
  description: string
  supportUrl: string
  createdAt: string
  updatedAt: string
}

export type BuiltInFormElementLookup = NewBuiltInFormElementLookup & {
  id: number
}

export type NewFormElementLookup = NewFormElementDynamicOptionSet & {
  type: 'ELEMENT' | 'DATA'
  builtInId?: number
}

export type FormElementLookup = NewFormElementLookup & {
  id: number
  createdAt: string
  updatedAt: string
}

export type FormElementLookupSearchParameters =
  FormElementDynamicOptionSetSearchParameters

export type FormElementLookupSearchResponse = {
  formElementLookups: FormElementLookup[]
} & BaseSearchResult

export type FormElementDynamicOptionSetSearchResponse = {
  formElementDynamicOptionSets: FormElementDynamicOptionSet[]
} & BaseSearchResult
