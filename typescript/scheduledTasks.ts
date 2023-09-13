export type DayOfWeek = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN'

type BaseTaskAction = {
  /** The label of the action */
  label: string
  /** The direction a user will have to swipe for this action to occur */
  swipeDirection: 'LEFT' | 'RIGHT'
}
export type TaskAction = BaseTaskAction &
  (
    | {
        type: 'FORM'
        /** The related form id that will be used for the action */
        formId: number
      }
    | {
        type: 'CHANGE_STATUS'
        /** The status that will be set on the task for the action */
        status: 'COMPLETE'
      }
  )

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
    startDate?: string
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
  }
  /** A description of the task */
  description?: string
  /** A group of actions that the task can utilise within a Forms App */
  actions: TaskAction[]
}
export type Task = NewTask & {
  /** The id of the related Task */
  id: number
  /** The time the task was created */
  createdAt: string
  /** The time the task was last updated */
  updatedAt: string
}
