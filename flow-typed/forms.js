// @flow

import { type Address as GeoscapeAddress } from './geoscape/address-details'
import { type Address as PointAddress } from './point/address-details'
import { type CivicaStreetName } from './civica/street-name'
import { type CivicaNameRecord } from './civica/name-record'
import { type ConditionalPredicate } from './conditions'
import { type FormSubmissionEvent } from './submission-events'
import { type BaseSearchResult } from './misc'

////////////////////////////////////////
// Element Types

declare type LookupFormElement = {
  isDataLookup: boolean,
  dataLookupId?: number,
  isElementLookup: boolean,
  elementLookupId?: number,
} & FormElementRequired

declare type _FormElementBase = {
  isNew?: boolean,
  id: string,
  conditionallyShow: boolean,
  requiresAllConditionallyShowPredicates: boolean,
  conditionallyShowPredicates?: ConditionalPredicate[],
}

declare type FormElementBase = _FormElementBase & {
  name: string,
  label: string,
  hint?: string,
}

declare type FormElementRequired = FormElementBase & {
  required: boolean,
}

declare type FormElementBinaryStorage = FormElementBase & {
  storageType?: 'legacy' | 'public' | 'private',
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
  dynamicOptionSetId?: number,
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
  defaultValue?: string,
}

declare type CheckboxElement = FormElementWithOptionsBase & {
  type: 'checkboxes',
  buttons: boolean,
  readOnly: boolean,
  defaultValue?: string[],
  canToggleAll?: boolean,
}

declare type SelectElement = FormElementWithOptionsBase & {
  type: 'select',
  multi: boolean,
  readOnly: boolean,
  defaultValue?: string | string[],
  canToggleAll?: boolean,
}

declare type AutoCompleteElement = FormElementWithOptionsBase & {
  type: 'autocomplete',
  readOnly: boolean,
  defaultValue?: string,
  searchUrl?: string,
  placeholderValue?: string,
}

declare type ComplianceElement = FormElementWithOptionsBase &
  FormElementBinaryStorage & {
    type: 'compliance',
    readOnly: boolean,
    defaultValue?: string,
  }

declare type FormElementWithOptions =
  | RadioButtonElement
  | CheckboxElement
  | SelectElement
  | AutoCompleteElement
  | ComplianceElement

// date element types
declare type FormElementWithDate = {
  readOnly: boolean,
  fromDate?: string | 'NOW',
  fromDateDaysOffset?: number,
  toDate?: string | 'NOW',
  toDateDaysOffset?: number,
  defaultValue?: string | 'NOW',
  defaultValueDaysOffset?: number,
  placeholderValue?: string,
} & LookupFormElement

declare type DateElement = FormElementWithDate & {
  type: 'date',
}

declare type DateTimeElement = FormElementWithDate & {
  type: 'datetime',
}

declare type TimeElement = FormElementWithDate & {
  type: 'time',
}

declare type FormElementWithInput<DefaultValue> = {
  readOnly: boolean,
  defaultValue?: DefaultValue,
  placeholderValue?: string,
  regexPattern?: string,
  regexFlags?: string,
  regexMessage?: string,
} & LookupFormElement

export type NumberElement = {
  type: 'number',
  minNumber?: number,
  maxNumber?: number,
  isSlider: boolean,
  sliderIncrement?: number,
  isInteger?: boolean,
} & FormElementWithInput<number>

declare type TextElement = {
  type: 'text',
  minLength?: number,
  maxLength?: number,
} & FormElementWithInput<string>

declare type TextareaElement = {
  type: 'textarea',
  minLength?: number,
  maxLength?: number,
} & FormElementWithInput<string>

declare type EmailElement = {
  type: 'email',
} & FormElementWithInput<string>

declare type BarcodeScannerElement = {
  type: 'barcodeScanner',
  restrictBarcodeTypes: boolean,
  restrictedBarcodeTypes?: string[],
} & FormElementWithInput<string>

declare type TelephoneElement = {
  type: 'telephone',
} & FormElementWithInput<string>

declare type ImageElement = FormElementBase & {
  type: 'image',
  defaultValue: string,
}

declare type DrawElement = FormElementRequired &
  FormElementBinaryStorage & {
    type: 'draw',
    readOnly: boolean,
    defaultValue?: string,
  }

declare type CameraElement = FormElementRequired &
  FormElementBinaryStorage & {
    type: 'camera',
    readOnly: boolean,
    defaultValue?: string,
    includeTimestampWatermark: boolean,
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
  minSetEntries?: number,
  maxSetEntries?: number,
  addSetEntryLabel?: string,
  removeSetEntryLabel?: string,
} & _NestedElementsElement

declare type PageElement = _FormElementBase & {
  type: 'page',
  label: string,
} & _NestedElementsElement

declare type SectionElement = _FormElementBase & {
  type: 'section',
  isCollapsed: boolean,
  label: string,
  hint?: string,
} & _NestedElementsElement

declare type HtmlElement = FormElementBase & {
  type: 'html',
  defaultValue: string,
}

declare type CaptchaElement = FormElementRequired & {
  type: 'captcha',
}

declare type FilesElement = FormElementBinaryStorage & {
  type: 'files',
  readOnly: boolean,
  minEntries?: number,
  maxEntries?: number,
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
  calculation: string,
  preCalculationDisplay?: string,
  displayAsCurrency?: boolean,
}

declare type SummaryElement = FormElementBase & {
  type: 'summary',
  elementIds: string[],
}

declare type GeoscapeAddressElement = {
  type: 'geoscapeAddress',
  readOnly: boolean,
  defaultValue?: GeoscapeAddress,
  placeholderValue?: string,
  stateTerritoryFilter?: string[],
} & LookupFormElement

declare type PointAddressElement = {
  type: 'pointAddress',
  readOnly: boolean,
  defaultValue?: PointAddress,
  placeholderValue?: string,
  stateTerritoryFilter?: string[],
  addressTypeFilter?: string[],
} & LookupFormElement

declare type BooleanElement = LookupFormElement & {
  type: 'boolean',
  defaultValue: boolean,
  readOnly: boolean,
}
declare type CivicaStreetNameElement = {
  type: 'civicaStreetName',
  readOnly: boolean,
  defaultValue?: CivicaStreetName,
  placeholderValue?: string,
} & LookupFormElement

declare type CivicaNameRecordElement = {
  type: 'civicaNameRecord',
  readOnly: boolean,
  defaultValue?: CivicaNameRecord,
  useGeoscapeAddressing: boolean,
  titleLabel?: string,
  familyNameLabel?: string,
  givenName1Label?: string,
  givenName1IsRequired?: boolean,
  givenName1IsHidden?: boolean,
  emailAddressLabel?: string,
  emailAddressIsRequired?: boolean,
  emailAddressIsHidden?: boolean,
  homePhoneLabel?: string,
  homePhoneIsRequired?: boolean,
  homePhoneIsHidden?: boolean,
  businessPhoneLabel?: string,
  businessPhoneIsRequired?: boolean,
  businessPhoneIsHidden?: boolean,
  mobilePhoneLabel?: string,
  mobilePhoneIsRequired?: boolean,
  mobilePhoneIsHidden?: boolean,
  faxPhoneLabel?: string,
  faxPhoneIsRequired?: boolean,
  faxPhoneIsHidden?: boolean,
  streetAddressesLabel?: string,
  address1Label?: string,
  address2Label?: string,
  postcodeLabel?: string,
} & FormElementRequired

declare type NestedElementsElement =
  | PageElement
  | RepeatableSetElement
  | SectionElement

declare type NonNestedElementsElement =
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

declare type FormElementWithoutForm =
  | NonNestedElementsElement
  | NestedElementsElement

declare type FormElementWithForm = FormFormElement | InfoPageElement

declare type FormElement = FormElementWithoutForm | FormElementWithForm

declare type FormElementType = $PropertyType<FormElement, 'type'>

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

declare type FormPostSubmissionAction =
  | 'BACK'
  | 'URL'
  | 'CLOSE'
  | 'FORMS_LIBRARY'

type FormServerValidation =
  | {
      type: 'CALLBACK',
      configuration: {
        url: string,
      },
    }
  | {
      type: 'ONEBLINK_API',
      configuration: {
        apiId: string,
        apiEnvironment: string,
        apiEnvironmentRoute: string,
      },
    }
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
  publishStartDate?: string,
  publishEndDate?: string,
  isInfoPage: boolean,
  postSubmissionAction: FormPostSubmissionAction,
  redirectUrl?: string,
  cancelAction: FormPostSubmissionAction,
  cancelRedirectUrl?: string,
  submissionEvents: FormSubmissionEvent[],
  tags: Array<string>,
  createdAt: string,
  updatedAt: string,
  serverValidation?: FormServerValidation,
  externalIdGeneration?: FormServerValidation,
}

declare type PreviewUrl = {
  label: string,
  url: string,
}

declare type FormTemplate = {
  id: number,
  name: string,
  description?: string,
  elements: FormElement[],
  tags: string[],
  isInfoPage: boolean,
  isMultiPage: boolean,
  createdAt: string,
  updatedAt: string,
  previewUrls: PreviewUrl[],
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

declare type FormElementLookupSearchResponse = {
  formElementLookups: FormElementLookup[],
} & BaseSearchResult

declare type FormElementDynamicOptionSetSearchResponse = {
  formElementDynamicOptionSets: FormElementDynamicOptionSet[],
} & BaseSearchResult
