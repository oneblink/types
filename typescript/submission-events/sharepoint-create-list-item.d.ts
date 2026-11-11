import type { FormEventBase } from './common'
import type { FormElementMapping } from './form-element-mapping'
import type { SharepointSubmissionEventBase } from './microsoft'

export type SharepointColumnResourceDefinitionBase = {
  /**
   * The API-facing name of the column. Use this in the `fields` property when
   * creating the list item.
   */
  sharepointColumnDefinitionName: string
}

export type SharepointCreateListItemSubmissionEventMapping =
  FormElementMapping<SharepointColumnResourceDefinitionBase>

export type SharepointCreateListItemSubmissionEvent = FormEventBase & {
  type: 'SHAREPOINT_CREATE_LIST_ITEM'
  configuration: SharepointSubmissionEventBase & {
    /** The Sharepoint List */
    sharepointList: {
      /** The id of the Sharepoint List */
      id: string
      /** The display name of the Sharepoint List */
      displayName: string
    }
    /** Array of mappings. */
    mapping: SharepointCreateListItemSubmissionEventMapping[]
  }
}
