import { MiscTypes } from '..'

export type DayOfWeek = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN'
type BaseTaskAction = {
  label: string
  swipeDirection: 'LEFT' | 'RIGHT'
}
export type TaskAction = BaseTaskAction &
  (
    | {
        type: 'FORM'
        formId: number
      }
    | {
        type: 'CHANGE_STATUS'
        status: 'COMPLETE'
      }
  )

export interface NewTask {
  name: string
  formsAppEnvironmentId: number
  organisationId: string
  schedule: {
    startDate?: string
    endDate?: string
    recurrence:
      | {
          interval: 'DAY'
        }
      | {
          interval: 'WEEK'
          day: DayOfWeek
        }
  }
  description?: string
  actions: TaskAction[]
}
export type Task = NewTask & {
  id: number
  createdAt: string
  updatedAt: string
}

export interface CompletedTask {
  /** the id of the app displaying the tasks */
  formsAppId: number
  /** the id of the task */
  taskId: number
  /** the submissionId relating to the form action  */
  submissionId?: string
  /** the user which actioned the task */
  completedBy: MiscTypes.UserProfile
  /** the timestamp for when the user marked the task as done */
  createdAt: string
  /** if there is no form action then this will be the same as createdAt
   * if there is a form action this will be the timestamp for when a lambda
   * has triggered after the uploading of the s3 data
   */
  completedAt?: string
}
