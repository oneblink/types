import { GeoscapeAddress } from './geoscape'
import type { NoU } from './misc'
import type { FormSubmissionEvent } from './submissionEvents'
import type { ConditionalPredicate } from './conditions'

////////////////////////////////////////
// Element Types

export type FormElementType =
  | 'text'
  | 'email'
  | 'textarea'
  | 'number'
  | 'select'
  | 'checkboxes'
  | 'radio'
  | 'draw'
  | 'camera'
  | 'date'
  | 'time'
  | 'datetime'
  | 'heading'
  | 'location'
  | 'repeatableSet'
  | 'page'
  | 'html'
  | 'barcodeScanner'
  | 'captcha'
  | 'image'
  | 'file'
  | 'files'
  | 'calculation'
  | 'telephone'
  | 'autocomplete'
  | 'form'
  | 'infoPage'
  | 'summary'
  | 'geoscapeAddress'
  | 'compliance'

export type LookupFormElement = {
  isDataLookup: boolean
  dataLookupId?: number
  isElementLookup: boolean
  elementLookupId?: number
} & FormElementBase

export interface _FormElementBase {
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

// Choice element types
export interface DynamicChoiceElementOption {
  label: string
  value: string
  colour?: string
}

export interface ChoiceElementOptionAttribute {
  label?: string
  value?: string
  elementId: string
  optionIds: string[]
}

export type ChoiceElementOption = {
  id: string
  attributes?: ChoiceElementOptionAttribute[]
} & DynamicChoiceElementOption

export interface DynamicOptionsSetAttributeMap {
  elementId: string
  attribute: string
}

export type FormElementWithOptionsBase = FormElementRequired & {
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
  defaultValue?: string | NoU
} & LookupFormElement

export type CheckboxElement = FormElementWithOptionsBase & {
  type: 'checkboxes'
  buttons: boolean
  readOnly: boolean
  defaultValue?: string[] | NoU
} & LookupFormElement

export type SelectElement = FormElementWithOptionsBase & {
  type: 'select'
  multi: boolean
  readOnly: boolean
  defaultValue?: NoU | (string | string[])
} & LookupFormElement

export type AutoCompleteElement = FormElementWithOptionsBase & {
  type: 'autocomplete'
  readOnly: boolean
  defaultValue?: string | NoU
  searchUrl?: string
  placeholderValue?: string
} & LookupFormElement

export type ComplianceElement = FormElementWithOptionsBase & {
  type: 'compliance'
  readOnly: boolean
  defaultValue?: NoU | string
} & LookupFormElement

export type FormElementWithOptions =
  | RadioButtonElement
  | CheckboxElement
  | SelectElement
  | AutoCompleteElement
  | ComplianceElement

// date element types
export type DateElementBase = FormElementRequired & {
  readOnly: boolean
  fromDate?: Date | NoU
  toDate?: Date | NoU
  defaultValue?: NoU | (Date | 'NOW')
} & LookupFormElement

export type DateElement = DateElementBase & {
  type: 'date'
  placeholderValue?: string
} & LookupFormElement

export type DateTimeElement = DateElementBase & {
  type: 'datetime'
  placeholderValue?: string
} & LookupFormElement

export type TimeElement = FormElementRequired & {
  type: 'time'
  readOnly: boolean
  defaultValue?: NoU | (Date | 'NOW')
  placeholderValue?: string
} & LookupFormElement

export type NumberElement = FormElementRequired & {
  type: 'number'
  readOnly: boolean
  minNumber?: NoU | number
  maxNumber?: NoU | number
  defaultValue?: NoU | number
  isSlider: boolean
  sliderIncrement?: NoU | number
  placeholderValue?: string
  isInteger?: boolean
} & LookupFormElement

export type TextElement = FormElementRequired & {
  type: 'text'
  readOnly: boolean
  defaultValue?: NoU | string
  placeholderValue?: string
  minLength?: number
  maxLength?: number
} & LookupFormElement

export type TextareaElement = FormElementRequired & {
  type: 'textarea'
  readOnly: boolean
  defaultValue?: NoU | string
  placeholderValue?: string
  minLength?: number
  maxLength?: number
} & LookupFormElement

export type EmailElement = FormElementRequired & {
  type: 'email'
  readOnly: boolean
  defaultValue?: NoU | string
  placeholderValue?: string
} & LookupFormElement

export type ImageElement = FormElementBase & {
  type: 'image'
  defaultValue: string
}

export type DrawElement = FormElementRequired & {
  type: 'draw'
  readOnly: boolean
}

export type CameraElement = FormElementRequired & {
  type: 'camera'
  readOnly: boolean
  defaultValue?: string
  includeTimestampWatermark: boolean
}

export type HeadingElement = FormElementBase & {
  type: 'heading'
  headingType: number
}

export type LocationElement = FormElementRequired & {
  type: 'location'
  readOnly: boolean
} & LookupFormElement

export interface _NestedElementsElement {
  elements: FormElement[]
}

export type RepeatableSetElement = FormElementBase & {
  type: 'repeatableSet'
  readOnly: boolean
  minSetEntries: undefined | number
  maxSetEntries: undefined | number
  addSetEntryLabel?: string
  removeSetEntryLabel?: string
} & _NestedElementsElement

export type PageElement = _FormElementBase & {
  type: 'page'
  label: string
} & _NestedElementsElement

export type NestedElementsElement = PageElement | RepeatableSetElement

export type HtmlElement = FormElementBase & {
  type: 'html'
  defaultValue: string
}

export type BarcodeScannerElement = FormElementRequired & {
  type: 'barcodeScanner'
  readOnly: boolean
  defaultValue?: NoU | string
  restrictBarcodeTypes: boolean
  restrictedBarcodeTypes?: string[]
  placeholderValue?: string
} & LookupFormElement

export type CaptchaElement = FormElementRequired & {
  type: 'captcha'
}

export type FilesElement = FormElementBase & {
  type: 'files'
  readOnly: boolean
  minEntries: number | undefined
  maxEntries: number | undefined
  restrictFileTypes: boolean
  restrictedFileTypes?: string[]
}

export type FileElement = FormElementRequired & {
  type: 'file'
  readOnly: boolean
  restrictFileTypes: boolean
  restrictedFileTypes?: string[]
}

export type CalculationElement = FormElementBase & {
  type: 'calculation'
  defaultValue: string
  calculation: NoU | string
  preCalculationDisplay: NoU | string
}

export type TelephoneElement = FormElementRequired & {
  type: 'telephone'
  readOnly: boolean
  defaultValue?: NoU | string
  placeholderValue?: string
} & LookupFormElement

export type SummaryElement = FormElementBase & {
  type: 'summary'
  elementIds: string[]
}

export type GeoscapeAddressElement = FormElementRequired & {
  type: 'geoscapeAddress'
  readOnly: boolean
  defaultValue?: GeoscapeAddress
  placeholderValue?: string
  stateTerritoryFilter?: string[]
} & LookupFormElement

export type FormElementWithoutForm =
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
  | RepeatableSetElement
  | PageElement
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
  | FormElementWithOptions

export type FormElementWithForm = FormFormElement | InfoPageElement

export type FormElement = FormElementWithoutForm | FormElementWithForm

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

export type FormPostSubmissionAction = 'URL' | 'CLOSE' | 'FORMS_LIBRARY'

export interface Form {
  id: number
  name: string
  description: string
  organisationId: string
  formsAppEnvironmentId: number
  formsAppIds: number[]
  elements: FormElement[]
  isAuthenticated: boolean
  isMultiPage: boolean
  publishStartDate?: NoU | string
  publishEndDate?: NoU | string
  isInfoPage: boolean
  postSubmissionAction: FormPostSubmissionAction
  redirectUrl?: NoU | string
  submissionEvents: FormSubmissionEvent[]
  tags: string[]
}

export type PreviewUrl = {
  label: string
  url: string
}

export interface FormTemplate {
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

export interface FormElementDynamicOptionSetEnvironment {
  url: string
  formsAppEnvironmentId: number
}

export interface FormElementDynamicOptionSet {
  id?: number
  apiId?: string
  name: string
  organisationId: string
  environments: FormElementDynamicOptionSetEnvironment[]
  createdAt?: string
  updatedAt?: string
}

export type FormElementLookup = FormElementDynamicOptionSet & {
  type: 'ELEMENT' | 'DATA'
  builtInId?: number
}

export interface BaseSearchResult {
  meta: {
    limit: null
    offset: null
    nextOffset: null
  }
}

export type FormElementLookupSearchResponse = {
  formElementLookups: FormElementLookup[]
} & BaseSearchResult

export type FormElementDynamicOptionSetSearchResponse = {
  formElementDynamicOptionSets: FormElementDynamicOptionSet[]
} & BaseSearchResult
