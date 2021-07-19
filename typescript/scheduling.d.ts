export type NewSchedulingBooking = {
  submissionId: string
  formId: number
  schedulingReceiptUrl: string
  schedulingCancelUrl: string
  nylasSchedulingPageId: number
}

export type SchedulingBooking = NewSchedulingBooking & {
  nylasCalendarId?: string
  nylasEditHash?: string
  emailAddress?: string
  name?: string
  location?: string
  startTime?: number
  endTime?: number
  previousStartTime?: number
  previousEndTime?: number
  timezone?: string
  cancelledReason?: string
  isDenied: boolean
  createdAt: string
  updatedAt: string
}
