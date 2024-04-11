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
    ConditionalPredicate,
    ConditionalPredicateRepeatableSet
  >
}

export type ConditionalPredicateForm = ConditionalPredicateBase & {
  type: 'FORM',
  predicate: ConditionalPredicate
}

export type ConditionalPredicate =
  | ConditionalPredicateNumeric
  | ConditionalPredicateOptions
  | ConditionalPredicateHasValue
  | ConditionalPredicateBetween
  | ConditionalPredicateRepeatableSet
  | ConditionalPredicateForm
