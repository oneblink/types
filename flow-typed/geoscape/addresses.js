// @flow

export type Messages = string[]

export interface AddressSuggestion {
  suggest: {
    id?: string,
    address?: string,
    rank?: number,
    [k: string]: mixed,
  }[];
  messages?: Messages;
  [k: string]: mixed;
}
