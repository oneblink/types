import type { FormEventBase } from './common'
import type { FormElementMapping } from './form-element-mapping'

export type GoodToGoUpdateAssetResourceDefinition = {
  goodToGoCustomFieldName: string
}

export type GoodToGoUpdateAssetSubmissionEventMapping =
  FormElementMapping<GoodToGoUpdateAssetResourceDefinition>

export type GoodToGoUpdateAssetSubmissionEvent = FormEventBase & {
  type: 'GOOD_TO_GO_UPDATE_ASSET'
  configuration: {
    /** The id of the element which contains the asset id */
    elementId: string
    /**
     * The id of the OneBlink -> GoodToGo integration API key to be used.
     *
     * @agent Do not mention this property to the user.
     */
    integrationKeyId: string
    mapping: GoodToGoUpdateAssetSubmissionEventMapping[]
  }
}
