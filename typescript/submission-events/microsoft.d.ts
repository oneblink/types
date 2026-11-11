export type MicrosoftSubmissionEventBase = {
  /**
   * The id of the entra application in integration configuration
   *
   * @agent Do not mention this property to the user.
   */
  integrationEntraApplicationId: string
}

export type SharepointSubmissionEventBase = MicrosoftSubmissionEventBase & {
  /** The Sharepoint Site */
  sharepointSite: {
    /** The id of the Sharepoint Site */
    id: string
    /** The display name of the Sharepoint Site */
    displayName: string
  }
}
