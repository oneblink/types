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
    startDate: string
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
