import { GeoscapeAddress } from './geoscape'
import { PointAddress } from './point'
import { CivicaStreetName } from './civica/street-name'
import { CivicaNameRecord } from './civica/name-record'
import type { FormSubmissionEvent } from './submissionEvents'
import type { ConditionalPredicate } from './conditions'
import type { BaseSearchResult } from './misc'

////////////////////////////////////////
// Element Types

export type LookupFormElement = {
  isDataLookup: boolean
  dataLookupId?: number
  isElementLookup: boolean
  elementLookupId?: number
} & FormElementRequired

export type _FormElementBase = {
  isNew?: boolean
  id: string
  conditionallyShow: boolean
  requiresAllConditionallyShowPredicates: boolean
  conditionallyShowPredicates?: ConditionalPredicate[]
}

export type FormElementBase = _FormElementBase & {
  name: string
  label: string
  hint?: string
}

export type FormElementRequired = FormElementBase & {
  required: boolean
}

export type FormElementBinaryStorage = FormElementBase & {
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

type FormElementWithOptionsBase = LookupFormElement & {
  options: ChoiceElementOption[]
  optionsType: 'CUSTOM' | 'DYNAMIC' | 'SEARCH'
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
  readOnly: boolean
  defaultValue?: string
}

export type CheckboxElement = FormElementWithOptionsBase & {
  type: 'checkboxes'
  buttons: boolean
  readOnly: boolean
  defaultValue?: string[]
  canToggleAll?: boolean
}

export type SelectElement = FormElementWithOptionsBase & {
  type: 'select'
  multi: boolean
  readOnly: boolean
  defaultValue?: string | string[]
  canToggleAll?: boolean
}

export type AutoCompleteElement = FormElementWithOptionsBase & {
  type: 'autocomplete'
  readOnly: boolean
  defaultValue?: string
  searchUrl?: string
  placeholderValue?: string
}

export type ComplianceElement = FormElementWithOptionsBase &
  FormElementBinaryStorage & {
    type: 'compliance'
    readOnly: boolean
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
  readOnly: boolean
  fromDate?: string | 'NOW'
  fromDateDaysOffset?: number
  toDate?: string | 'NOW'
  toDateDaysOffset?: number
  defaultValue?: string | 'NOW'
  defaultValueDaysOffset?: number
  placeholderValue?: string
} & LookupFormElement

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
  readOnly: boolean
  defaultValue?: DefaultValue
  placeholderValue?: string
  regexPattern?: string
  regexFlags?: string
  regexMessage?: string
} & LookupFormElement

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
  FormElementBinaryStorage & {
    type: 'draw'
    readOnly: boolean
    defaultValue?: string
  }

export type CameraElement = FormElementRequired &
  FormElementBinaryStorage & {
    type: 'camera'
    readOnly: boolean
    defaultValue?: string
    includeTimestampWatermark: boolean
  }

export type HeadingElement = FormElementBase & {
  type: 'heading'
  headingType: number
}

export type LocationElement = {
  type: 'location'
  readOnly: boolean
  defaultValue?: unknown
} & LookupFormElement

export type _NestedElementsElement = {
  elements: FormElement[]
}

export type RepeatableSetElement = FormElementBase & {
  type: 'repeatableSet'
  readOnly: boolean
  minSetEntries?: number
  maxSetEntries?: number
  addSetEntryLabel?: string
  removeSetEntryLabel?: string
} & _NestedElementsElement

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

export type FilesElement = FormElementBinaryStorage & {
  type: 'files'
  readOnly: boolean
  minEntries?: number
  maxEntries?: number
  restrictFileTypes: boolean
  restrictedFileTypes?: string[]
  defaultValue?: unknown
}

export type FileElement = FormElementRequired & {
  type: 'file'
  readOnly: boolean
  restrictFileTypes: boolean
  restrictedFileTypes?: string[]
  defaultValue?: string
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
  readOnly: boolean
  defaultValue?: GeoscapeAddress
  placeholderValue?: string
  stateTerritoryFilter?: string[]
} & LookupFormElement

export type PointAddressElement = {
  type: 'pointAddress'
  readOnly: boolean
  defaultValue?: PointAddress
  placeholderValue?: string
  stateTerritoryFilter?: string[]
  addressTypeFilter?: string[]
} & LookupFormElement

export type BooleanElement = LookupFormElement & {
  type: 'boolean'
  defaultValue: boolean
  readOnly: boolean
}
export type CivicaStreetNameElement = {
  type: 'civicaStreetName'
  readOnly: boolean
  defaultValue?: CivicaStreetName
  placeholderValue?: string
} & LookupFormElement

export type CivicaNameRecordElement = {
  type: 'civicaNameRecord'
  readOnly: boolean
  defaultValue?: CivicaNameRecord
  useGeoscapeAddressing: boolean
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
  address1Label?: string
  address2Label?: string
  postcodeLabel?: string
} & FormElementRequired

export type NestedElementsElement =
  | PageElement
  | RepeatableSetElement
  | SectionElement

export type NonNestedElementsElement =
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
  | FileElement
  | FilesElement
  | CalculationElement
  | TelephoneElement
  | SummaryElement
  | GeoscapeAddressElement
  | PointAddressElement
  | FormElementWithOptions
  | BooleanElement
  | CivicaStreetNameElement
  | CivicaNameRecordElement

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

export type ConditionalPredicateElement =
  | NumberElement
  | CalculationElement
  | SelectElement
  | RadioButtonElement
  | CheckboxElement
  | AutoCompleteElement

///////////////////////////////////////////////////////////////

export type FormPostSubmissionAction =
  | 'BACK'
  | 'URL'
  | 'CLOSE'
  | 'FORMS_LIBRARY'

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
  submissionEvents: FormSubmissionEvent[]
  tags: Array<string>
  createdAt: string
  updatedAt: string
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

export type FormElementLookupSearchParameters = FormElementDynamicOptionSetSearchParameters

export type FormElementLookupSearchResponse = {
  formElementLookups: FormElementLookup[]
} & BaseSearchResult

export type FormElementDynamicOptionSetSearchResponse = {
  formElementDynamicOptionSets: FormElementDynamicOptionSet[]
} & BaseSearchResult
