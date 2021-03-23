export interface ConditionalPredicateBase {
  elementId: string
}

export type ConditionalPredicateNumeric = ConditionalPredicateBase & {
  type: 'NUMERIC'
  operator: '===' | '!==' | '>' | '>=' | '<' | '<='
  value: number
}

export type ConditionalPredicateOptions = ConditionalPredicateBase & {
  type: 'OPTIONS'
  optionIds: string[]
}

export declare type ConditionalPredicateHasValue = ConditionalPredicateBase & {
  type: 'VALUE'
  hasValue: boolean
}

export type ConditionalPredicateBetween = ConditionalPredicateBase & {
  type: 'BETWEEN'
  min: number
  max: number
}

export type ConditionalPredicate =
  | ConditionalPredicateNumeric
  | ConditionalPredicateOptions
  | ConditionalPredicateHasValue
  | ConditionalPredicateBetween
