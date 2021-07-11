export type NewSchedulingBooking = {
  submissionId: string
  formId: number
  schedulingReceiptUrl: string
  schedulingCancelUrl: string
  nylasSchedulingPageId: number
}

export type SchedulingBooking = NewSchedulingBooking & {
  nylasCalendarId?: string
  nylasEventId?: string
  nylasEditHash?: string
  emailAddress?: string
  name?: string
  location?: string
  startTime?: number
  endTime?: number
  timezone?: string
  cancelledReason?: string
  createdAt?: string
  updatedAt?: string
}
