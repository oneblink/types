import type { FormEventBase } from './common'
import type { FormElementMapping } from './form-element-mapping'
import type { MicrosoftSubmissionEventBase } from './microsoft'

export type ExcelFileColumnResourceDefinitionBase = {
  /** The name of the column */
  columnName: string
}

export type ExcelAddRowSubmissionEventMapping =
  FormElementMapping<ExcelFileColumnResourceDefinitionBase>

export type ExcelAddRowSubmissionEvent = FormEventBase & {
  type: 'EXCEL_ADD_ROW'
  configuration: MicrosoftSubmissionEventBase & {
    site: {
      /** The id of the Microsoft Site */
      id: string
      /** The display name of the Microsoft Site */
      displayName: string
    }
    drive: {
      /** The id of the Microsoft Drive */
      id: string
      /** The display name of the Microsoft Drive */
      displayName: string
    }
    excelFile: {
      /* the id of the excel file */
      id: string
      /* the name of the excel file */
      displayName: string
    }
    table: {
      /* the id of the table */
      id: string
      /* the name of the table */
      displayName: string
    }
    /** Array of mappings. */
    mapping: ExcelAddRowSubmissionEventMapping[]
  }
}
