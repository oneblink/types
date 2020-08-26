// @flow

////////////////////////////////////////
// Element Types

declare type FormElementTypeGroup =
  | 'STATIC'
  | 'INPUT'
  | 'DATE'
  | 'OPTIONS'
  | 'ADVANCED'

declare type FormElementType =
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

declare type ElementType = {
  id: FormElementType,
  display: string,
  isInfoPageType: boolean,
  group: FormElementTypeGroup,
}

declare type ElementTypeGroup = {
  id: FormElementTypeGroup,
  isInfoPageType: boolean,
  display: string,
  elementTypes: ElementType[],
}

declare type LookupFormElement = {
  isDataLookup: boolean,
  dataLookupId?: number,
  isElementLookup: boolean,
  elementLookupId?: number,
} & FormElementRequired

declare type ConditionallyShowPredicateBase = {
  elementId: string,
}

declare type ConditionallyShowPredicateNumeric = ConditionallyShowPredicateBase & {
  type: 'NUMERIC',
  operator: '===' | '!==' | '>' | '>=' | '<' | '<=',
  value: number,
}

declare type ConditionallyShowPredicateOptions = ConditionallyShowPredicateBase & {
  type: 'OPTIONS',
  optionIds: Array<string>,
}

declare type ConditionallyShowPredicate =
  | ConditionallyShowPredicateNumeric
  | ConditionallyShowPredicateOptions

declare type _FormElementBase = {
  isNew?: boolean,
  id: string,
  conditionallyShow: boolean,
  requiresAllConditionallyShowPredicates: boolean,
  conditionallyShowPredicates?: ConditionallyShowPredicate[],
}

declare type FormElementBase = _FormElementBase & {
  name: string,
  label: string,
}

declare type FormElementRequired = FormElementBase & {
  required: boolean,
}

// Choice element types
declare type DynamicChoiceElementOption = {
  label: string,
  value: string,
  colour?: string,
}

declare type ChoiceElementOptionAttribute = {
  label?: string,
  value?: string,
  elementId: string,
  optionIds: string[],
}

declare type ChoiceElementOption = {
  id: string,
  attributes?: ChoiceElementOptionAttribute[],
} & DynamicChoiceElementOption

declare type DynamicOptionsSetAttributeMap = {
  elementId: string,
  attribute: string,
}

type FormElementWithOptionsBase = LookupFormElement & {
  options: ChoiceElementOption[],
  optionsType: 'CUSTOM' | 'DYNAMIC' | 'SEARCH',
  dynamicOptionSetId: ?number,
  conditionallyShowOptions?: boolean,
  conditionallyShowOptionsElementIds?: string[],
  attributesMapping?: DynamicOptionsSetAttributeMap[],
}

declare type FormFormElement = _FormElementBase & {
  type: 'form',
  name: string,
  formId: number,
  elements?: FormElement[],
}

declare type InfoPageElement = _FormElementBase & {
  type: 'infoPage',
  name: string,
  formId: number,
  elements?: FormElement[],
}

declare type RadioButtonElement = FormElementWithOptionsBase & {
  type: 'radio',
  buttons: boolean,
  readOnly: boolean,
  defaultValue: ?string,
}

declare type CheckboxElement = FormElementWithOptionsBase & {
  type: 'checkboxes',
  buttons: boolean,
  readOnly: boolean,
  defaultValue: ?(string[]),
}

declare type SelectElement = FormElementWithOptionsBase & {
  type: 'select',
  multi: boolean,
  readOnly: boolean,
  defaultValue: ?(string | string[]),
}

declare type AutoCompleteElement = FormElementWithOptionsBase & {
  type: 'autocomplete',
  readOnly: boolean,
  defaultValue: ?string,
  searchUrl?: string,
  placeholderValue?: string,
}

declare type FormElementWithOptions =
  | RadioButtonElement
  | CheckboxElement
  | SelectElement
  | AutoCompleteElement

// date element types
type DateElementBase = {
  readOnly: boolean,
  fromDate?: ?Date,
  toDate?: ?Date,
  defaultValue: ?(Date | 'NOW'),
} & LookupFormElement

declare type DateElement = DateElementBase & {
  type: 'date',
  placeholderValue?: string,
}

declare type DateTimeElement = DateElementBase & {
  type: 'datetime',
  placeholderValue?: string,
}

declare type TimeElement = {
  type: 'time',
  readOnly: boolean,
  defaultValue: ?(Date | 'NOW'),
  placeholderValue?: string,
} & LookupFormElement

declare type NumberElement = {
  type: 'number',
  readOnly: boolean,
  minNumber?: ?number,
  maxNumber?: ?number,
  defaultValue: ?number,
  isSlider: boolean,
  sliderIncrement?: ?number,
  placeholderValue?: string,
} & LookupFormElement

declare type TextElement = {
  type: 'text',
  readOnly: boolean,
  defaultValue: ?string,
  placeholderValue?: string,
} & LookupFormElement

declare type TextareaElement = {
  type: 'textarea',
  readOnly: boolean,
  defaultValue: ?string,
  placeholderValue?: string,
} & LookupFormElement

declare type EmailElement = {
  type: 'email',
  readOnly: boolean,
  defaultValue: ?string,
  placeholderValue?: string,
} & LookupFormElement

declare type ImageElement = FormElementBase & {
  type: 'image',
  defaultValue: string,
}

declare type DrawElement = FormElementRequired & {
  type: 'draw',
  readOnly: boolean,
  defaultValue?: string,
}

declare type CameraElement = FormElementRequired & {
  type: 'camera',
  readOnly: boolean,
  defaultValue?: string,
}

declare type HeadingElement = FormElementBase & {
  type: 'heading',
  headingType: number,
}

declare type LocationElement = {
  type: 'location',
  readOnly: boolean,
  defaultValue?: mixed,
} & LookupFormElement

declare type _NestedElementsElement = {
  elements: FormElement[],
}

declare type RepeatableSetElement = FormElementBase & {
  type: 'repeatableSet',
  readOnly: boolean,
  minSetEntries: ?number,
  maxSetEntries: ?number,
  addSetEntryLabel?: string,
  removeSetEntryLabel?: string,
} & _NestedElementsElement

declare type PageElement = _FormElementBase & {
  type: 'page',
  label: string,
} & _NestedElementsElement

declare type NestedElementsElement = PageElement | RepeatableSetElement

declare type HtmlElement = FormElementBase & {
  type: 'html',
  defaultValue: string,
}

declare type BarcodeScannerElement = {
  type: 'barcodeScanner',
  readOnly: boolean,
  defaultValue: ?string,
  restrictBarcodeTypes: boolean,
  restrictedBarcodeTypes?: string[],
  placeholderValue?: string,
} & LookupFormElement

declare type CaptchaElement = FormElementRequired & {
  type: 'captcha',
}

declare type FilesElement = FormElementBase & {
  type: 'files',
  readOnly: boolean,
  minEntries: number | void,
  maxEntries: number | void,
  restrictFileTypes: boolean,
  restrictedFileTypes?: string[],
  defaultValue?: mixed,
}

declare type FileElement = FormElementRequired & {
  type: 'file',
  readOnly: boolean,
  restrictFileTypes: boolean,
  restrictedFileTypes?: string[],
  defaultValue?: string,
}

declare type CalculationElement = FormElementBase & {
  type: 'calculation',
  defaultValue: string,
  calculation: ?string,
  preCalculationDisplay: ?string,
}

declare type TelephoneElement = {
  type: 'telephone',
  readOnly: boolean,
  defaultValue: ?string,
  placeholderValue?: string,
} & LookupFormElement

declare type SummaryElement = FormElementBase & {
  type: 'summary',
  elementIds: string[],
}

declare type FormElementWithoutForm =
  | TextElement
  | EmailElement
  | TextareaElement
  | NumberElement
  | SelectElement
  | RadioButtonElement
  | CheckboxElement
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
  | AutoCompleteElement
  | SummaryElement

declare type FormElementWithForm = FormFormElement | InfoPageElement

declare type FormElement = FormElementWithoutForm | FormElementWithForm

declare type CalculationInsertionElement =
  | NumberElement
  | CalculationElement
  | SelectElement
  | RadioButtonElement
  | AutoCompleteElement

declare type ConditionalPredicateElement =
  | NumberElement
  | CalculationElement
  | SelectElement
  | RadioButtonElement
  | CheckboxElement
  | AutoCompleteElement

///////////////////////////////////////////////////////////////

declare type FormPostSubmissionAction = 'URL' | 'CLOSE' | 'FORMS_LIBRARY'

declare type Form = {
  id: number,
  name: string,
  description: string,
  organisationId: string,
  formsAppEnvironmentId: number,
  formsAppIds: number[],
  elements: Array<FormElement>,
  isAuthenticated: boolean,
  isMultiPage: boolean,
  publishStartDate: ?string,
  publishEndDate: ?string,
  isInfoPage: boolean,
  postSubmissionAction: FormPostSubmissionAction,
  redirectUrl?: ?string,
  submissionEvents: FormSubmissionEvent[],
  tags: Array<string>,
}

declare type FormQuerystringParameters = {
  name?: string,
  isAuthenticated?: boolean,
  isInfoPage?: boolean,
  limit?: number,
  offset: number,
  injectForms?: boolean,
}

// Options Sets/Lookups

declare type FormElementDynamicOptionSetEnvironment = {
  url: string,
  formsAppEnvironmentId: number,
}

declare type NewFormElementDynamicOptionSet = {
  name: string,
  organisationId: string,
  apiId?: string,
  environments: FormElementDynamicOptionSetEnvironment[],
}

declare type FormElementDynamicOptionSet = NewFormElementDynamicOptionSet & {
  id: number,
  createdAt: string,
  updatedAt: string,
}

declare type FormElementDynamicOptionSetSearchParameters = {
  organisationIds: string[],
  limit?: number,
  offset?: number,
}

declare type NewBuiltInFormElementLookup = {
  type: 'ELEMENT' | 'DATA',
  name: string,
  url: string,
  description: string,
  supportUrl: string,
  createdAt: string,
  updatedAt: string,
}

declare type BuiltInFormElementLookup = NewBuiltInFormElementLookup & {
  id: number,
}

declare type NewFormElementLookup = NewFormElementDynamicOptionSet & {
  type: 'ELEMENT' | 'DATA',
  builtInId?: number,
}

declare type FormElementLookup = NewFormElementLookup & {
  id: number,
  createdAt: string,
  updatedAt: string,
}

declare type FormElementLookupSearchParameters = FormElementDynamicOptionSetSearchParameters
