// @flow

declare type ConditionalPredicateBase = {
  elementId: string,
}

declare type ConditionalPredicateNumeric = ConditionalPredicateBase & {
  type: 'NUMERIC',
  operator: '===' | '!==' | '>' | '>=' | '<' | '<=',
  value: number,
}

declare type ConditionalPredicateOptions = ConditionalPredicateBase & {
  type: 'OPTIONS',
  optionIds: Array<string>,
}

declare type ConditionalPredicateHasValue = ConditionalPredicateBase & {
  type: 'VALUE',
  hasValue: boolean,
}

declare type ConditionalPredicateBetween = ConditionalPredicateBase & {
  type: 'BETWEEN',
  min: number,
  max: number,
}

declare type ConditionalPredicate =
  | ConditionalPredicateNumeric
  | ConditionalPredicateOptions
  | ConditionalPredicateHasValue
  | ConditionalPredicateBetween
