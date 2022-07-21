import { GeoscapeAddress } from './geoscape'
import { PointAddress } from './point'
import { CivicaStreetName } from './civica/street-name'
import { CivicaNameRecord } from './civica/name-record'
import type {
  FormWorkflowEvent,
  FormPaymentEvent,
  FormSchedulingEvent,
} from './submissionEvents'
import type { ConditionalPredicate } from './conditions'
import type { ABNRecord, BaseSearchResult, IdResource } from './misc'
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
  /** The label displayed to the user for an individual option. */
  label: string
  /** The value for an individual option, sent with form submission data. */
  value: string
  /** An array of nested options, relevant to the option. */
  options?: DynamicChoiceElementOption[]
  /**
   * The color of the button used to display the option, if the element has
   * `buttons` configured as `true`.
   */
  colour?: string
}

export type ChoiceElementOptionAttribute = {
  label?: string
  value?: string
  /** The external element ID used in the 'conditionally show option' process */
  elementId: string
  /** An array of option IDs associated with an individual option */
  optionIds: string[]
}

export type ChoiceElementOption = {
  /** The unique identifier for an individual option. */
  id: string
  /** An array of option attributes associated with an individual option. */
  attributes?: ChoiceElementOptionAttribute[]
} & DynamicChoiceElementOption

export type DynamicOptionsSetAttributeMap = {
  /** The ID of the option value for the attribute to be mapped to. */
  elementId: string
  /** The attribute from the dynamic options set to be mapped to the option element ID. */
  attribute: string
}

export type FormElementWithOptionsBase = LookupFormElement &
  FormElementRequired &
  FormElementReadOnly & {
    /** An array of options, relevant to the element. */
    options?: ChoiceElementOption[]
    /**
     * Whether or not the options set is defined within the form definition
     * (custom), or via an API call (dynamic OR search).
     */
    optionsType: 'CUSTOM' | 'DYNAMIC' | 'SEARCH' | 'FRESHDESK_FIELD'
    freshdeskFieldName?: string
    /** The ID of the dynamic options set configured in the OneBlink System. */
    dynamicOptionSetId?: number
    /** Whether or not the elements options are to be shown conditionally. */
    conditionallyShowOptions?: boolean
    /** The ID(s) of elements used in the 'conditionally show' process. */
    conditionallyShowOptionsElementIds?: string[]
    /**
     * Used to map an attribute from a dynamic options source with an option
     * element ID within the form definition
     */
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
  | FreshdeskDependentFieldElement

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

export type FreshdeskDependentFieldElementValue = {
  /** A top level value selected e.g. Country */
  category?: string
  /** A second level value selected e.g. State */
  subCategory?: string
  /** A final level value selected e.g. Suburb */
  item?: string
}

/**
 * Allow the user to select an item after being filter down via category and sub-category
 *
 * ### Example
 *
 * ```json
 * {
 *   "id": "b1311ae0-6bb7-11e9-a923-1681be663d3e",
 *   "type": "freshdeskDependentField",
 *   "name": "country_state_suburb",
 *   "label": "Country",
 *   "hint": "Please select a Country before selecting a State.",
 *   "subCategoryLabel": "State",
 *   "subCategoryHint": "Please select a State before selecting a Suburb.",
 *   "itemLabel": "Suburb",
 *   "itemHint": "Please select a Suburb.",
 *   "defaultValue": {
 *     "category": "Australia",
 *     "subCategory": "NSW",
 *     "item": "Sydney"
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
 *       "category": "Australia",
 *       "subCategory": "NSW",
 *       "item": "Sydney"
 *     }
 *   }
 * }
 * ```
 */
export type FreshdeskDependentFieldElement = {
  /** The type of Form Element. */
  type: 'freshdeskDependentField'
  /** A default value when the form is opened. */
  defaultValue?: FreshdeskDependentFieldElementValue
  /** Display text presented to the user above the sub category input by default. */
  subCategoryLabel: string
  /**
   * A hint triggered by an icon tooltip to be displayed when hovering beside
   * the sub category label.
   */
  subCategoryHint?: string
  /** Display text presented to the user above the item input by default. */
  itemLabel: string
  /**
   * A hint triggered by an icon tooltip to be displayed when hovering beside
   * the item label.
   */
  itemHint?: string
} & FormElementWithOptionsBase

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
  | FreshdeskDependentFieldElement

export type FormElementWithoutForm =
  | NonNestedElementsElement
  | NestedElementsElement

export type FormElementWithForm = FormFormElement | InfoPageElement

export type FormElement = FormElementWithoutForm | FormElementWithForm

export type FormElementWithoutName = PageElement | SectionElement
export type FormElementWithName = Exclude<FormElement, FormElementWithoutName>
// Leaving this here to show errors if we add another form element
// that does not have a name. Hopefully, devs see the error and fix :)
type FormElementName = FormElementWithName['name']

export type FormElementType = FormElement['type']

export type CalculationInsertionElement =
  | NumberElement
  | CalculationElement
  | SelectElement
  | RadioButtonElement
  | AutoCompleteElement

export type StorageElement =
  | FilesElement
  | ComplianceElement
  | CameraElement
  | DrawElement

///////////////////////////////////////////////////////////////

export type FormPostSubmissionAction =
  | 'BACK'
  | 'URL'
  | 'CLOSE'
  | 'FORMS_LIBRARY'

/**
 * ### Examples
 *
 * #### Callback
 *
 * ```json
 * {
 *   "type": "CALLBACK",
 *   "configuration": {
 *     "url": "https://api.url.com/callback"
 *   }
 * }
 * ```
 *
 * #### OneBlink API
 *
 * ```json
 * {
 *   "type": "ONEBLINK_API",
 *   "configuration": {
 *     "apiId": "oneblink-api-id",
 *     "apiEnvironment": "test",
 *     "apiEnvironmentRoute": "/my-route"
 *   }
 * }
 * ```
 */
export type FormServerValidation =
  | {
      /** The type of the validation endpoint. */
      type: 'CALLBACK'
      /** The configuration of the validation endpoint. */
      configuration: {
        /** The url of the validation endpoint. */
        url: string
      }
    }
  | {
      /** The type of the validation endpoint. */
      type: 'ONEBLINK_API'
      /** The configuration of the validation endpoint. */
      configuration: {
        /** The ID of the OneBlink hosted API that houses the validation endpoint. */
        apiId: string
        /** The environment of the specified OneBlink hosted API. */
        apiEnvironment: string
        /** The route of the validation endpoint. */
        apiEnvironmentRoute: string
      }
    }

export type Form = {
  /** Id of the form. */
  id: number
  /** Name of the form. */
  name: string
  /** A description of the form. */
  description: string
  /** The organisation ID the form belong to. */
  organisationId: string
  /** The forms app environment ID the form belong to. */
  formsAppEnvironmentId: number
  /** ID's of any Forms Apps that the form is included in. */
  formsAppIds: number[]
  /** All elements contained within the form itself. */
  elements: Array<FormElement>
  /** Whether or not the form can only be viewed by an Authenticated user. */
  isAuthenticated: boolean
  /** Whether or not the form contains multiple pages. */
  isMultiPage: boolean
  /** The date and time (in ISO format) a form becomes available. */
  publishStartDate?: string
  /** The date and time (in ISO format) a form becomes unavailable. */
  publishEndDate?: string
  /** Whether or not the Form is an Info Page. */
  isInfoPage: boolean
  /** The action for the Form to take on a successful submission. */
  postSubmissionAction: FormPostSubmissionAction
  /**
   * The URL the form will redirect to if configured to do so by the
   * `postSubmissionActions`.
   */
  redirectUrl?: string
  cancelAction: FormPostSubmissionAction
  cancelRedirectUrl?: string
  draftEvents?: FormWorkflowEvent[]
  schedulingEvents?: FormSchedulingEvent[]
  paymentEvents?: FormPaymentEvent[]
  /** Events that occur/trigger on a valid successful submission. */
  submissionEvents: FormWorkflowEvent[]
  approvalSteps?: FormApprovalFlowStep[]
  approvalEvents?: FormWorkflowEvent[]
  /** A list of tags used to categorise or describe the form. */
  tags: Array<string>
  createdAt: string
  updatedAt: string
  /** The details of the form validation endpoint. */
  serverValidation?: FormServerValidation
  /** The details of the externalId generation endpoint. */
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

export type NewFormElementOptionSetBase = {
  name: string
  organisationId: string
}

// Static Options
export type FormElementOptionSetEnvironmentStatic = {
  options: DynamicChoiceElementOption[]
  formsAppEnvironmentId: number
}
export type NewFormElementOptionSetStatic = NewFormElementOptionSetBase & {
  type: 'STATIC'
  apiId: string
  environments: FormElementOptionSetEnvironmentStatic[]
}
export type FormElementOptionSetStatic = IdResource &
  NewFormElementOptionSetStatic

// URL request based options
export type FormElementOptionSetEnvironmentUrl = {
  url: string
  formsAppEnvironmentId: number
}
export type NewFormElementOptionSetHostedApi = NewFormElementOptionSetBase & {
  type: 'HOSTED_API'
  apiId: string
  environments: FormElementOptionSetEnvironmentUrl[]
}
export type FormElementOptionSetHostedApi = IdResource &
  NewFormElementOptionSetHostedApi

export type NewFormElementOptionSetUrl = NewFormElementOptionSetBase & {
  type: 'URL'
  environments: FormElementOptionSetEnvironmentUrl[]
}
export type FormElementOptionSetUrl = IdResource & NewFormElementOptionSetUrl

export type FormElementOptionSet =
  | FormElementOptionSetStatic
  | FormElementOptionSetHostedApi
  | FormElementOptionSetUrl

export type FormElementOptionSetSearchParameters = {
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

export type NewFormElementLookup = {
  name: string
  organisationId: string
  apiId?: string
  environments: FormElementOptionSetEnvironmentUrl[]
  type: 'ELEMENT' | 'DATA'
  builtInId?: number
}

export type FormElementLookup = NewFormElementLookup & {
  id: number
  createdAt: string
  updatedAt: string
}

export type FormElementLookupSearchParameters =
  FormElementOptionSetSearchParameters

export type FormElementLookupSearchResponse = {
  formElementLookups: FormElementLookup[]
} & BaseSearchResult

export type FormElementOptionSetSearchResponse = {
  formElementOptionSets: FormElementOptionSet[]
} & BaseSearchResult
