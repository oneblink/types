import { MiscTypes } from '..'

interface WithVersion {
  versionId: number
  createdAt: string
}
export type DayOfWeek = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN'

// // Task Action // //
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

// Form Task Action //
export type NewFormTaskAction = BaseTaskAction & {
  type: 'FORM'
  /** The related form id that will be used for the action */
  formId: number
}
export type EditedFormTaskAction = NewFormTaskAction & {
  taskActionId: string
}
export type FormTaskAction = EditedFormTaskAction & WithVersion

// Change Status Action //
export type NewChangeStatusTaskAction = BaseTaskAction & {
  type: 'CHANGE_STATUS'
  /** The status that will be set on the task for the action */
  status: 'COMPLETE'
}
export type EditedChangeStatusAction = NewChangeStatusTaskAction & {
  taskActionId: string
}
export type ChangeStatusTaskAction = EditedChangeStatusAction & WithVersion

// Final Actions //
export type NewTaskAction = NewFormTaskAction | NewChangeStatusTaskAction
export type EditedTaskAction = EditedFormTaskAction | EditedChangeStatusAction
export type TaskAction = FormTaskAction | ChangeStatusTaskAction

// // Task // //
export type linkedResource = {
  label: string
  url: string
}
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
  actionIds: string[]
  /** Optional action identifiers for user swipe gestures */
  swipeLeftActionId?: string
  swipeRightActionId?: string
  /** Web links to resources associated with task */
  linkedResources?: linkedResource[]
}

export type EditedTask = NewTask & {
  taskId: string
}

export type Task = EditedTask & WithVersion

// // Completed Task // //
export interface NewCompletedTask {
  /** The id of the app displaying the tasks */
  formsAppId: number
  /** The version id of the task */
  taskVersionId: number
  /** The version id of the task group */
  taskGroupVersionId?: number
  /** The version id of the task action that triggered the task completion */
  taskActionVersionId?: number
  /** The id of the task group instance that displayed this task in the app */
  taskGroupInstanceVersionId?: number
  /** The submissionId relating to the form action */
  submissionId?: string
  /** The user which actioned the task */
  completedBy?: MiscTypes.UserProfile
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

// // Task Group // //

export type NewTaskGroup = {
  /** The label of the task group */
  name: string
  /**
   * The identifiers of tasks that the task group will show within a Forms App.
   * The order of the identifiers is respected when displayingActions
   */
  taskIds: Array<Task['taskId']>
  /** The related forms app environment id that this task group belongs to */
  formsAppEnvironmentId: number
  /** The organisation id that this task group belongs to */
  organisationId: string
}

export type EditedTaskGroup = NewTaskGroup & {
  taskGroupId: string
}
export interface TaskGroup extends EditedTaskGroup, WithVersion {}

export interface NewTaskGroupInstance {
  label: string
  taskGroupId: TaskGroup['taskGroupId']
}
export interface EditedTaskGroupInstance extends NewTaskGroupInstance {
  taskGroupInstanceId: string
}
export interface TaskGroupInstance
  extends EditedTaskGroupInstance,
    WithVersion {}
