import { PointStatesAndTerritories } from './point'

export interface ConditionalPredicateBase {
  /** The identifier of the element to evaluate against */
  elementId: string
}

export type ConditionalPredicateNumeric = ConditionalPredicateBase & {
  /** Evaluate against a numeric type element or an element with options */
  type: 'NUMERIC'
  /** How the predicate element's value will be compared to `value` */
  operator: '===' | '!==' | '>' | '>=' | '<' | '<='
} & (
    | {
        compareWith?: 'VALUE'
        /** The value to compare against the predicate element */
        value: number
      }
    | {
        compareWith: 'ELEMENT'
        /** The value to compare against the predicate element */
        value: string
      }
  )

export type ConditionalPredicateOptions = ConditionalPredicateBase & {
  /** Evaluate against a numeric type element or an element with options */
  type?: 'OPTIONS'
  /**
   * The predicate element option identifiers that must be selected for this
   * predicate to evaluate true
   */
  optionIds: string[]
}

export declare type ConditionalPredicateHasValue = ConditionalPredicateBase & {
  /** Evaluate against a numeric type element or an element with options */
  type: 'VALUE'
  hasValue: boolean
}

export type ConditionalPredicateBetween = ConditionalPredicateBase & {
  /** Evaluate against a numeric type element or an element with options */
  type: 'BETWEEN'
  min: number
  max: number
}

export type ConditionalPredicateRepeatableSet = ConditionalPredicateBase & {
  type: 'REPEATABLESET'
  repeatableSetPredicate: Exclude<
    FormElementConditionalPredicate,
    ConditionalPredicateRepeatableSet
  >
}

export type ConditionalPredicateForm = ConditionalPredicateBase & {
  type: 'FORM'
  predicate: FormElementConditionalPredicate
}

export type ConditionalPredicateAddressElement = ConditionalPredicateBase & {
  type: 'ADDRESS_PROPERTY'
  definition:
    | {
        property: 'IS_PO_BOX_ADDRESS'
        value: boolean
      }
    | {
        property: 'STATE_EQUALITY'
        value: PointStatesAndTerritories
      }
}

/**
 * A date used when evaluating a datetime condition. Either a custom ISO date or
 * a date/datetime element, with an optional day offset.
 *
 * @example
 *   // Custom date with a +30 day offset
 *   { compareWith: 'VALUE', value: '2026-07-01', daysOffset: 30 }
 *
 * @example
 *   // Date element with a -14 day offset
 *   { compareWith: 'ELEMENT', formElementId: '<date-element-id>', daysOffset: -14 }
 */
export type ConditionalPredicateDateValue =
  | {
      compareWith?: 'VALUE'
      /** An ISO date string to compare against the datetime */
      value: string
      /** The number of days to offset the comparison date */
      daysOffset?: number
    }
  | {
      compareWith: 'ELEMENT'
      /**
       * The id of a date or datetime element to compare against the submission
       * datetime
       */
      formElementId: string
      /** The number of days to offset the comparison date */
      daysOffset?: number
    }

/**
 * Evaluate against the timestamp the form was submitted. Intended for
 * conditional logic configured outside the form (e.g. workflow events and
 * approval steps).
 *
 * - `AFTER` — submission timestamp is after (exclusive) the comparison date
 * - `BEFORE` — submission timestamp is before (exclusive) the comparison date
 * - `BETWEEN` — submission timestamp is between `min` and `max` (inclusive)
 *
 * @example
 *   // Submission is before AGM + 30 days
 *   const predicate = {
 *     type: 'SUBMISSION_TIMESTAMP',
 *     operator: 'BEFORE',
 *     compareWith: 'ELEMENT',
 *     formElementId: '<agm-date-element-id>',
 *     daysOffset: 30,
 *   }
 */
export type ConditionalPredicateSubmissionTimestamp = {
  type: 'SUBMISSION_TIMESTAMP'
} & (
  | ({
      /**
       * How the submission timestamp will be compared to the date value.
       * `AFTER` is exclusive, `BEFORE` is exclusive.
       */
      operator: 'AFTER' | 'BEFORE'
    } & ConditionalPredicateDateValue)
  | {
      /** Inclusive range check between `min` and `max` */
      operator: 'BETWEEN'
      min: ConditionalPredicateDateValue
      max: ConditionalPredicateDateValue
    }
)

export type FormElementConditionalPredicate =
  | ConditionalPredicateNumeric
  | ConditionalPredicateOptions
  | ConditionalPredicateHasValue
  | ConditionalPredicateBetween
  | ConditionalPredicateRepeatableSet
  | ConditionalPredicateForm
  | ConditionalPredicateAddressElement

export type ConditionalPredicate =
  | FormElementConditionalPredicate
  | ConditionalPredicateSubmissionTimestamp
