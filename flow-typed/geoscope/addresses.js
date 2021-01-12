// @flow

export type Messages = string[]

export interface AddressSuggestion {
  suggest: {
    id?: string
    address?: string
    rank?: number
    [k: string]: unknown
  }[]
  messages?: Messages
  [k: string]: unknown
}
