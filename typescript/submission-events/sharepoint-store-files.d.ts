import type { FormEventBase, PDFConfiguration } from './common'
import type { SharepointSubmissionEventBase } from './microsoft'

export type SharepointStoreFilesSubmissionEvent = FormEventBase & {
  type: 'SHAREPOINT_STORE_FILES'
  configuration: PDFConfiguration &
    SharepointSubmissionEventBase & {
      sharepointDrive: {
        /** The id of the Sharepoint Drive */
        id: string
        /** The display name of the Sharepoint Drive */
        displayName: string
      }
      /**
       * The folder within the selected drive to upload files to. If not
       * specified the root of the drive will be used. If the folder does not
       * exist it will be created as part of the upload. Path must begin with a
       * forward slash and not end with a forward slash e.g.
       * "/forms/1/submissions"
       */
      folderPath?: string
      /**
       * Set to `true` to prevent all form submission attachments from being
       * uploaded to SharePoint.
       */
      excludeAttachments: boolean
    }
}
