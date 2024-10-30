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
  nylasProposedEventId?: string
  emailAddress?: string
  name?: string
  location?: string
  startTime?: number
  endTime?: number
  previousStartTime?: number
  previousEndTime?: number
  timezone?: string
  cancelledReason?: string
  createdAt?: string
  updatedAt?: string
}

export type NewNylasBooking = {
  submissionId: string
  formId: number
  schedulingReceiptUrl: string
  schedulingCancelUrl: string
  schedulingRescheduleUrl: string
  configurationId: string
  emailAddress?: string
  name?: string
}

export type NylasBooking = NewNylasBooking & {
  createdAt: string
  updatedAt: string
} & (
    | { bookingRef?: undefined }
    | {
        bookingRef: string
        calendarId: string
        proposedEventId?: string
        location?: string
        startTime: number
        endTime: number
        previousStartTime?: number
        previousEndTime?: number
        timezone: string
        cancelledReason?: string
      }
  )
