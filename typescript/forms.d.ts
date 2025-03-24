import { GeoscapeAddress } from './geoscape'
import { PointAddress, PointStatesAndTerritories } from './point'
import { CivicaStreetName } from './civica/street-name'
import { CivicaNameRecord } from './civica/name-record'
import type {
  FormWorkflowEvent,
  FormPaymentEvent,
  FormSchedulingEvent,
  PDFConfiguration,
  FormElementMapping,
} from './submissionEvents'
import type { ConditionalPredicate } from './conditions'
import type {
  ABNRecord,
  BaseSearchResult,
  EndpointConfiguration,
  IdResource,
  StatesAndTerritories,
  UserProfile,
} from './misc'
import { FormApprovalCannedResponse, FormApprovalFlowStep } from './approvals'
import { ButtonConfiguration } from './environments'
import { LiquorLicenceDetails } from './api-nsw'
import { MiscTypes, SubmissionTypes } from '..'
import { IntegrationGeoscape } from './integrations'
import { GoogleMapsAddress } from './googleMaps'
import { DeveloperKeyReference } from './keys'
import { S3Configuration } from './aws'

////////////////////////////////////////
// Element Types

export type HintPositionEnum = 'BELOW_LABEL' | 'TOOLTIP'

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
  /** Custom CSS classes that will be added to the element during rendering */
  customCssClasses?: string[]
  /**
   * JSON metadata associated with the form element. This field is for primarily
   * for developer use.
   */
  meta?: string
  /**
   * Determine if the element is hidden (`true`) or not (`false`). Hidden
   * elements exist on the page, but are not visible to the user. This means
   * they are included in conditional logic and other dependency evaluation and
   * are included in the submission data.
   */
  isHidden?: boolean
}

export type FormElementBase = _FormElementBase &
  FormElementHint & {
    /**
     * The key that will be assigned a value in the submission data when the
     * form is submitted.
     */
    name: string
    /** Display text presented to the user above the input by default. */
    label: string
  }

export type FormElementHint = {
  /** The text that will be displayed based on hintPosition */
  hint?: string
  /** Determine where the helper text will show */
  hintPosition?: HintPositionEnum
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
  /** Button configuration for the Lookup button */
  lookupButton?: ButtonConfiguration
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
  /** The validation message to display if this input requires a value entered by the user. */
  requiredMessage?: string
}

export type FormElementBinaryStorage = FormElementBase & {
  /** How the photo taken by a user will be stored: `private`, `public`. */
  storageType?: 'public' | 'private'
}

export type DynamicChoiceElementOptionAttribute = {
  /**
   * The label to display in the forms builder when selecting an element to
   * match the "value" property. E.g. if this options set is for Cities (Sydney,
   * Brisbane, Melbourne) and the parent options set is for States (NSW, QLD,
   * VIC), this label could be "State".
   */
  label: string
  /**
   * The value of the parent form element option to filter this option. E.g.
   * E.g. if this options set is for Cities (Sydney, Brisbane, Melbourne) and
   * the parent options set is for States (NSW, QLD, VIC) and this option
   * represented Sydney, this value would be "NSW".
   */
  value: string
}

// Choice element types
export type DynamicChoiceElementOption = {
  /** The label displayed to the user for an individual option. */
  label: string
  /** The value for an individual option, sent with form submission data. */
  value: string
  /** An array of option attributes associated with an individual option. */
  attributes?: DynamicChoiceElementOptionAttribute[]
  /** An array of nested options, relevant to the option. */
  options?: DynamicChoiceElementOption[]
  /**
   * The color of the button used to display the option, if the element has
   * `buttons` configured as `true`.
   */
  colour?: string
  /** For autocomplete elements this option will always appear in the search results. */
  displayAlways?: boolean
  /** An image associated with this option */
  imageUrl?: string
}

export type ChoiceElementOptionAttribute = {
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
} & Omit<DynamicChoiceElementOption, 'attributes'>

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
  type: 'form' | 'infoPage'
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
  requiredAll?: boolean
}

export type SelectElement = FormElementWithOptionsBase & {
  type: 'select'
  multi: boolean
  defaultValue?: string | string[]
  canToggleAll?: boolean
  /** Custom autocomplete attributes that will be added to the element during rendering */
  autocompleteAttributes?: string[]
}

export type AutoCompleteElement = FormElementWithOptionsBase & {
  type: 'autocomplete'
  defaultValue?: string
  /**
   * If specified, a request will be made to the "searchUrl" allowing the
   * options to be filtered on the server.
   */
  searchUrl?: string
  /**
   * If specified, a request will be made to the "searchUrl" with this
   * querystring parameter assigned the value typed into the input, otherwise
   * the querystring parameter will be "value" .
   */
  searchQuerystringParameter?: string
  placeholderValue?: string
  /** Custom autocomplete attributes that will be added to the element during rendering */
  autocompleteAttributes?: string[]
}

export type ComplianceElement = FormElementWithOptionsBase &
  FormElementBinaryStorage & {
    type: 'compliance'
    defaultValue?: string
    /** Custom autocomplete attributes that will be added to the element during rendering */
    autocompleteAttributes?: string[]
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
  /**
   * A string GUID that references the ID of an element. This takes precedence
   * over fromDate if both are used for date ranges.
   */
  fromDateElementId?: string
  /**
   * A string iso date or 'NOW' that references a starting date for a range. If
   * passed with fromDateElementId, both will be allowed.
   */
  fromDate?: string | 'NOW'
  fromDateDaysOffset?: number
  /**
   * A string GUID that references the ID of an element. This takes precedence
   * over toDate if both are used for date ranges.
   */
  toDateElementId?: string
  /**
   * A string iso date or 'NOW' that references an end date for a range. If
   * passed with toDateElementId, both will be allowed.
   */
  toDate?: string | 'NOW'
  toDateDaysOffset?: number
  defaultValue?: string | 'NOW'
  defaultValueDaysOffset?: number
  placeholderValue?: string
  /** Custom autocomplete attributes that will be added to the element during rendering */
  autocompleteAttributes?: string[]
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
  /** Custom autocomplete attributes that will be added to the element during rendering */
  autocompleteAttributes?: string[]
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
  decorativeImage?: boolean
}

export type DrawElement = FormElementRequired &
  FormElementReadOnly &
  FormElementBinaryStorage & {
    type: 'draw'
    defaultValue?: SubmissionTypes.FormSubmissionAttachment
  }

export type CameraElement = FormElementRequired &
  FormElementReadOnly &
  FormElementBinaryStorage & {
    type: 'camera'
    defaultValue?: SubmissionTypes.FormSubmissionAttachment
    includeTimestampWatermark: boolean
  }

export type HeadingElement = FormElementBase & {
  type: 'heading'
  headingType: number
}

export type LocationElement = {
  type: 'location'
  defaultValue?: unknown
  reverseGeocoding?: {
    formattedAddressElementId: string
    integrationType: IntegrationGeoscape['type']
  }
} & LookupFormElement &
  FormElementRequired &
  FormElementReadOnly
export type _NestedElementsElement = {
  elements: FormElement[]
}

export type RepeatableSetElement = FormElementBase & {
  type: 'repeatableSet'
  minSetEntries?:
    | number
    | {
        type: 'FORM_ELEMENT'
        elementId: string
      }
  maxSetEntries?:
    | number
    | {
        type: 'FORM_ELEMENT'
        elementId: string
      }
  addSetEntryLabel?: string
  removeSetEntryLabel?: string
  /**
   * Select how the repeatable set buttons render. SINGLE_ADD_BUTTON will
   * include a single button at the end of the repeatable set to add a new
   * entry. MULTIPLE_ADD_BUTTONS will show an add button between each entry and
   * move the delete button to the bottom of each entry
   */
  layout?: 'SINGLE_ADD_BUTTON' | 'MULTIPLE_ADD_BUTTONS'
} & _NestedElementsElement &
  FormElementReadOnly

export type PageElement = _FormElementBase & {
  type: 'page'
  label: string
} & _NestedElementsElement

export type SectionElement = _FormElementBase &
  FormElementHint & {
    type: 'section'
    isCollapsed: boolean
    label: string
    canCollapseFromBottom?: boolean
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
  stateTerritoryFilter?: StatesAndTerritories[]
  /** Custom autocomplete attributes that will be added to the element during rendering */
  autocompleteAttributes?: string[]
} & LookupFormElement &
  FormElementRequired &
  FormElementReadOnly

export type PointAddressElement = {
  type: 'pointAddress'
  defaultValue?: PointAddress
  placeholderValue?: string
  stateTerritoryFilter?: PointStatesAndTerritories[]
  addressTypeFilter?: string[]
  /** Custom autocomplete attributes that will be added to the element during rendering */
  autocompleteAttributes?: string[]
} & LookupFormElement &
  FormElementRequired &
  FormElementReadOnly

export type GoogleAddressElement = {
  type: 'googleAddress'
  defaultValue?: GoogleMapsAddress
  placeholderValue?: string
  /** Custom autocomplete attributes that will be added to the element during rendering */
  autocompleteAttributes?: string[]
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
  /** Custom autocomplete attributes that will be added to the element during rendering */
  autocompleteAttributes?: string[]
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

export type APINSWLiquorLicenceElement = {
  type: 'apiNSWLiquorLicence'
  defaultValue?: LiquorLicenceDetails
  placeholderValue?: string
  /** Custom autocomplete attributes that will be added to the element during rendering */
  autocompleteAttributes?: string[]
} & LookupFormElement &
  FormElementRequired &
  FormElementReadOnly

export type ArcGISWebMapElement = FormElementBase & {
  type: 'arcGISWebMap'
  webMapId: string
  showLayerPanel: boolean
}

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
  /** Custom autocomplete attributes that will be added to the element during rendering */
  autocompleteAttributes?: string[]
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
  /** Custom autocomplete attributes that will be added to the element during rendering */
  autocompleteAttributes?: string[]
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
  | GoogleAddressElement
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
  | APINSWLiquorLicenceElement
  | ArcGISWebMapElement

export type FormElementWithoutForm =
  | NonNestedElementsElement
  | NestedElementsElement

export type FormElementWithForm = FormFormElement

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

export type FormServerValidation = EndpointConfiguration

export interface ReceiptTextComponent {
  /** The type of receipt component */
  type: 'text'
  /** A hardcoded string value to insert into the externalId */
  value: string
}

export interface ReceiptDateComponent {
  /** The type of receipt component */
  type: 'date'
  /** A date component to insert into the externalId */
  format: ReceiptDateFormat
}

export type ReceiptDateFormat =
  | 'dayOfMonth'
  | 'monthNumber'
  | 'yearShort'
  | 'year'

export interface ReceiptRandomComponent {
  /** The type of receipt component */
  type: 'random'
  /** The number of random characters */
  length: number
  /** Whether to include numbers */
  numbers: boolean
  /** Whether to include uppercase characters */
  uppercase: boolean
  /** Whether to include lowercase characters */
  lowercase: boolean
}

export interface ReceiptSequentialNumberComponent {
  /** The type of receipt component */
  type: 'sequentialNumber'
}

export type ReceiptComponent =
  | ReceiptTextComponent
  | ReceiptDateComponent
  | ReceiptRandomComponent
  | ReceiptSequentialNumberComponent

export type ExternalIdGenerationReceiptId = {
  /** The type of the external id generation. */
  type: 'RECEIPT_ID'
  /** The configuration of the external id generation. */
  configuration: {
    /** The first number when including an auto incrementing component in the `externalId` */
    startingSequentialNumber?: number
    /** An array of receipt components used to build an external Id */
    receiptComponents: ReceiptComponent[]
  }
}

export type ExternalIdGeneration =
  | EndpointConfiguration
  | ExternalIdGenerationReceiptId

export type FormCustomPDF = {
  /** The Id of the custom PDF. */
  id: string
  /** The label of the custom PDF. */
  label: string
  /** The S3 Configuration of the custom PDF. */
  s3: S3Configuration
  /** The mapping for the custom PDF. */
  mapping: FormElementMapping<{
    /** The name of the field that will be replaced in the custom PDF. */
    replaceableField: string
  }>[]
}

export type NewForm = {
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
  /**
   * The message to be shown to forms users when the form is not in the
   * published time window
   */
  unpublishedUserMessage?: string
  /** The action for the Form to take on a successful submission. */
  postSubmissionAction: FormPostSubmissionAction
  /**
   * The URL the form will redirect to if configured to do so by the
   * `postSubmissionActions`.
   */
  redirectUrl?: string
  /** Configuration to customise the display after a successful submission. */
  postSubmissionReceipt?: {
    /**
     * HTML to display instead of the default "Thank you" message after a
     * successful submission.
     */
    html?: string
    /**
     * Whether or not to generate a token to allow downloading the form
     * submission PDF after a successful submission.
     */
    allowPDFDownload?: PDFConfiguration
  }
  cancelAction: FormPostSubmissionAction
  cancelRedirectUrl?: string
  draftEvents?: FormWorkflowEvent[]
  schedulingEvents?: FormSchedulingEvent[]
  paymentEvents?: FormPaymentEvent[]
  /** Events that occur/trigger on a valid successful submission. */
  submissionEvents: FormWorkflowEvent[]
  approvalSteps?: FormApprovalFlowStep[]
  approvalEvents?: FormWorkflowEvent[]
  /** Configuration options that affect the whole approval flow */
  approvalConfiguration?: {
    /**
     * The id of the element to use as a default prefill for the notification
     * email address when actioning an approval for this form
     */
    defaultNotificationEmailElementId?: string
    /**
     * A list of canned responses available for the form that can be assigned
     * when approving an approval
     */
    approveCannedResponses?: FormApprovalCannedResponse[]
    /**
     * A list of canned responses available for the form that can be assigned
     * when requesting clarification
     */
    clarificationRequestCannedResponses?: FormApprovalCannedResponse[]
    /**
     * A list of canned responses available for the form that can be assigned
     * when denying an approval
     */
    denyCannedResponses?: FormApprovalCannedResponse[]
    /**
     * Configuration for automatically denying an approval after a number of
     * days when a clarification request has been sent with no response. Set
     * `undefined` or unset for no Auto Deny.
     */
    autoDenyAfterClarificationRequest?: {
      /**
       * The amount of days after a clarification request has been sent with no
       * response until the approval is automatically denied.
       */
      days: number
      /* Configuration for notifying parties. If object is not present, no notifications will be sent **/
      notify?: {
        /** Notes sent to specified users */
        notes: string
        /**
         * The email addresses of the users to be notified of the result. If the
         * approval flow has a `defaultNotificationEmailElementId` configured,
         * this address will also receive a notification email.
         */
        notificationEmailAddress?: string[]
        /** Key to associate a canned response with an approval to allow for reporting */
        cannedResponseKey?: string
      }

      /** Internal notes that are not seen by the user that submitted the form */
      internalNotes?: string
    }
    /** Disallow approving when approval is waiting for clarification */
    disallowApprovingWhenAwaitingClarification?: boolean
    /**
     * Allow a default value for the `preventPayment` flag when approvers are
     * requesting clarification
     */
    defaultPreventPaymentOnClarificationRequest?: boolean
    /**
     * The identifier for the email template to use when notifying approvers of
     * a new approval to action
     */
    approvalCreatedEmailTemplateId?: number
    /**
     * The identifier for the email template to use when notifying the user that
     * submitted the form that an approver has requested clarification
     */
    clarificationRequestEmailTemplateId?: number
    /**
     * The identifier for the email template to use when notifying the user that
     * submitted the form that an approver has approved their submission
     */
    approvedEmailTemplateId?: number
    /**
     * The identifier for the email template to use when notifying the user that
     * submitted the form that an approver has denied their submission
     */
    deniedEmailTemplateId?: number
    /**
     * Configuration for sending recurring reminders at an interval of days to
     * Approvers of pending approvals for this form.
     */
    pendingApprovalsReminder?: {
      /**
       * The amount of days that an approval must be overdue before sending
       * daily reminders
       */
      daysInterval: number
    }
  }
  /** A list of tags used to categorise or describe the form. */
  tags: Array<string>
  /** The details of the form validation endpoint. */
  serverValidation?: FormServerValidation
  /**
   * The details of the externalId generation endpoint which will be executed
   * after "serverValidation" but before submission.
   */
  externalIdGenerationOnSubmit?: ExternalIdGeneration
  /**
   * The details of the personalisation endpoint which will be executed on form
   * load to prefill existing elements or return a new set of elements.
   */
  personalisation?: EndpointConfiguration
  /** The title of a form submission, supports element injection */
  submissionTitle?: string
  /**
   * Whether or not viewing the form should auto-continue with autosave data
   * when available rather than prompting the user
   */
  continueWithAutosave?: boolean
  /** Custom CSS classes that will be added to the form during rendering */
  customCssClasses?: string[]
  /** The user that last updated the form */
  updatedByUser?: UserProfile
  updatedByKey?: DeveloperKeyReference
  /** Point address environment id to be used for any pointAddress elements */
  pointAddressEnvironmentId?: string
  /** Whether or not Geoscape elements can be configured for this form */
  allowGeoscapeAddresses?: boolean
  /** Unique domain safe text to identify the form */
  slug?: string
  /** Conditionally enable form submission */
  enableSubmission?: {
    /**
     * Indicates if all predicates need to met to determine if submission should
     * be allowed
     */
    requiresAllConditionalPredicates: boolean
    /** The predicates to determine if submission should be allowed */
    conditionalPredicates: ConditionalPredicate[]
  }
  /** Disable form data being autosaved */
  disableAutosave?: boolean
  /**
   * Whether or not the form is archived. Only archived forms can be deleted
   * from the console
   */
  isArchived?: boolean
  /**
   * The custom PDFs that are associated with the form that can be used in place
   * of an OOTB PDF.
   */
  customPDFs?: FormCustomPDF[]
}

export type Form = MiscTypes.IdResource & NewForm

export type FormTemplate = {
  id: number
  name: string
  description?: string
  elements: FormElement[]
  tags: string[]
  isMultiPage: boolean
  createdAt: string
  updatedAt: string
}

export type FormQuerystringParameters = {
  name?: string
  isAuthenticated?: boolean
  limit?: number
  offset: number
  injectForms?: boolean
}

//
//
// Options Sets
//
//
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
  type: 'STATIC' | 'HCMS_CATEGORIES' | 'SHAREPOINT_LIST'
  environments: FormElementOptionSetEnvironmentStatic[]
}
export type FormElementOptionSetStatic = IdResource &
  NewFormElementOptionSetStatic

export type FormElementEnvironmentBase = {
  formsAppEnvironmentId: number
}
// URL request based options
export type FormElementEnvironmentUrl = FormElementEnvironmentBase & {
  url: string
}
export type FormElementOptionSetEnvironmentUrl = FormElementEnvironmentUrl & {
  /**
   * If specified, a request will be made to the "url" with this querystring
   * parameter assigned the value typed into an "autocomplete" type form element
   * input allowing the options to be filtered on the server, otherwise the
   * response is expected to include all available options.
   */
  searchQuerystringParameter?: string
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

export type NewFormElementOptionSet =
  | NewFormElementOptionSetStatic
  | NewFormElementOptionSetHostedApi
  | NewFormElementOptionSetUrl

export type FormElementOptionSet =
  | FormElementOptionSetStatic
  | FormElementOptionSetHostedApi
  | FormElementOptionSetUrl

export type FormElementOptionSetSearchParameters = {
  organisationIds: string[]
  limit?: number
  offset?: number
}

//
//
// Lookups
//
//
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

export type FormElementLookupEnvironmentUrl = FormElementEnvironmentUrl & {
  /** Option to run lookup on submission value being undefined */
  runLookupOnClear?: boolean
}

export type FormElementLookupStaticDataPreFillBase = {
  /** Must match a "FormElement.name" property exactly to pre-fill with the "preFillValue". */
  formElementName: string
}

export type FormElementLookupStaticDataPreFillText = {
  type: 'TEXT'
  /**
   * The value to pre-fill the corresponding form element based on the
   * "formElementName" property.
   */
  text: string
} & FormElementLookupStaticDataPreFillBase

export type FormElementLookupStaticDataPreFillNumber = {
  type: 'NUMBER'
  /**
   * The value to pre-fill the corresponding form element based on the
   * "formElementName" property.
   */
  number: number
} & FormElementLookupStaticDataPreFillBase

export type FormElementLookupStaticDataPreFillClearValue = {
  type: 'CLEAR'
} & FormElementLookupStaticDataPreFillBase

export type FormElementLookupStaticDataPreFill =
  | FormElementLookupStaticDataPreFillText
  | FormElementLookupStaticDataPreFillNumber
  | FormElementLookupStaticDataPreFillClearValue

export type FormElementLookupStaticDataRecordBase = {
  /**
   * The pre-fill data to inject into the form when the "inputValue" matches
   * exactly what the user has entered or selected when completing the form.
   */
  preFills: FormElementLookupStaticDataPreFill[]
}

export type FormElementLookupStaticDataRecordText =
  FormElementLookupStaticDataRecordBase & {
    inputType: 'TEXT'
    /**
     * The value that will be matched exactly on the form element this lookup is
     * associated when the user is completing the form.
     */
    inputValue: string
  }
export type FormElementLookupStaticDataRecordNumber =
  FormElementLookupStaticDataRecordBase & {
    inputType: 'NUMBER'
    /**
     * The value that will be matched exactly on the form element this lookup is
     * associated when the user is completing the form.
     */
    inputValue: number
  }

export type FormElementLookupStaticDataRecordUndefined =
  FormElementLookupStaticDataRecordBase & {
    inputType: 'UNDEFINED'
  }

export type FormElementLookupStaticDataRecord =
  | FormElementLookupStaticDataRecordText
  | FormElementLookupStaticDataRecordNumber
  | FormElementLookupStaticDataRecordUndefined

export type FormElementLookupStaticDataEnvironment =
  FormElementEnvironmentBase & {
    /**
     * Array of records, each associated with a "inputValue" that will determine
     * the prefill data for the configured form elements based on the
     * "FormElement.name" property.
     */
    records: FormElementLookupStaticDataRecord[]
  }

export type NewFormElementLookupBase = {
  /** A human readable identifier for the Lookup. */
  name: string
  /** The identifier for the organisation associated with the Lookup. */
  organisationId: string
}

export type NewFormElementLookupUrl = NewFormElementLookupBase & {
  apiId?: string
  environments: FormElementLookupEnvironmentUrl[]
  type: 'ELEMENT' | 'DATA'
  builtInId?: number
  /** Indicates whether the form definition will be excluded from the dynamic lookup call */
  excludeDefinition?: boolean
}

export type FormElementLookupUrl = IdResource & NewFormElementLookupUrl

export type NewFormElementLookupStaticData = NewFormElementLookupBase & {
  environments: FormElementLookupStaticDataEnvironment[]
  type: 'STATIC_DATA'
}

export type FormElementLookupStaticData = IdResource &
  NewFormElementLookupStaticData

export type NewFormElementLookup =
  | NewFormElementLookupUrl
  | NewFormElementLookupStaticData

export type FormElementLookup =
  | FormElementLookupUrl
  | FormElementLookupStaticData

export type FormElementLookupSearchParameters =
  FormElementOptionSetSearchParameters

export type FormElementLookupSearchResponse = {
  formElementLookups: FormElementLookup[]
} & BaseSearchResult

export type FormElementOptionSetSearchResponse = {
  formElementOptionSets: FormElementOptionSet[]
} & BaseSearchResult

export type FormVersion = {
  id: number
  formId: number
  form: Form
  updatedAt: string
  name?: string
}
