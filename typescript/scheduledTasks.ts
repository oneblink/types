export type DayOfWeek = 'MON' | 'TUE' | 'WED' | 'THU' | 'FRI' | 'SAT' | 'SUN'
export type TaskActionStatus = 'COMPLETE' | 'TODO'
type BaseTaskAction = {
  label: string
}
export type TaskAction = BaseTaskAction &
  (
    | {
        type: 'FORM'
        formId: number
      }
    | {
        type: 'HREF'
        link: {
          text: string
          url: string
        }
      }
    | {
        type: 'CHANGE_STATUS'
        status: TaskActionStatus
      }
  )

export interface NewTask {
  name: string
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
  enabled?: boolean
  actions?: TaskAction[]
}
export type Task = NewTask & {
  id: number
  organisationId: string
  createdAt: string
  updatedAt: string
}
