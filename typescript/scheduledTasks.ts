import { MiscTypes } from '..'

export type DayOfWeek = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN'

type BaseTaskAction = {
  /** The label of the action */
  label: string
  /** The icon that will be displayed with the action */
  icon: string
  /** The related forms app environment id that this action belongs to */
  formsAppEnvironmentId: number
  /** The organisation id that this action belongs to */
  organisationId: string
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
  /** Optional action identifiers for user swipe gestures */
  swipeLeftActionId?: number
  swipeRightActionId?: number
}
export type Task = NewTask & MiscTypes.IdResource

export interface NewCompletedTask {
  /** The id of the app displaying the tasks */
  formsAppId: number
  /** The id of the task */
  taskId: number
  /** The submissionId relating to the form action */
  submissionId?: string
  /** The id of the task group instance that displayed this task in the app */
  taskGroupInstanceId?: string
  /** The id of the task group that the task was a part of */
  taskGroupId?: number
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

export interface CompletedTask extends NewCompletedTask {
  /** The id of the completed task record */
  id: string
}

export type NewTaskGroup = {
  /** The label of the task group */
  name: string
  /**
   * The identifiers of tasks that the task group will show within a Forms App.
   * The order of the identifiers is respected when displayingActions
   */
  taskIds: number[]
  /** The related forms app environment id that this task group belongs to */
  formsAppEnvironmentId: number
  /** The organisation id that this task group belongs to */
  organisationId: string
}

export type TaskGroup = NewTaskGroup & MiscTypes.IdResource

export type TaskGroupInstance = {
  createdAt: string
  taskGroupId: number
  taskGroupInstanceId: string
  label: string
}
