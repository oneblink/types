import { MiscTypes } from '..'

export type DayOfWeek = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN'

type BaseTaskAction = {
  /** The label of the action */
  label: string
  /** The icon that will be displayed with the action */
  icon: string
}

export type NewFormTaskAction = BaseTaskAction & {
  type: 'FORM'
  /** The related form id that will be used for the action */
  formId: number
}
export type FormTaskAction = NewFormTaskAction & MiscTypes.IdResource

export type NewChangeStatusTaskAction = BaseTaskAction & {
  type: 'CHANGE_STATUS'
  /** The status that will be set on the task for the action */
  status: 'COMPLETE'
}
export type ChangeStatusTaskAction = NewChangeStatusTaskAction &
  MiscTypes.IdResource

export type NewTaskAction = NewFormTaskAction | NewChangeStatusTaskAction
export type TaskAction = FormTaskAction | ChangeStatusTaskAction

export interface NewTask {
  /** The name of the task */
  name: string
  /** The related forms app environment id that this task belongs to */
  formsAppEnvironmentId: number
  /** The organisation id that this task belongs to */
  organisationId: string
  /** The schedule that will determine a task's frequency and date range */
  schedule: {
    /** The date a task becomes available */
    startDate: string
    /** The date a task becomes unavailable */
    endDate?: string
    /** The sequence in which the task will occur */
    recurrence:
      | {
          interval: 'DAY'
        }
      | {
          interval: 'WEEK'
          day: DayOfWeek
        }
      | {
          interval: 'CUSTOM'
          days: number
        }
  }
  /** A description of the task */
  description?: string
  /**
   * The identifiers of available actions that the task can utilise within a
   * Forms App. The order of the identifiers is respected when displaying actions.
   */
  actionIds: number[]
}
export type Task = NewTask & MiscTypes.IdResource

export interface CompletedTask {
  /** The id of the app displaying the tasks */
  formsAppId: number
  /** The id of the task */
  taskId: number
  /** The submissionId relating to the form action */
  submissionId?: string
  /** The user which actioned the task */
  completedBy: MiscTypes.UserProfile
  /** The timestamp for when the user marked the task as done */
  createdAt: string
  /**
   * If there is no form action then this will be the same as createdAt if there
   * is a form action this will be the timestamp for when a lambda has triggered
   * after the uploading of the s3 data
   */
  completedAt?: string
}
