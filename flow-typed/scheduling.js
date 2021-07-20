declare type NewSchedulingBooking = {
  submissionId: string,
  formId: number,
  schedulingReceiptUrl: string,
  schedulingCancelUrl: string,
  nylasSchedulingPageId: number,
}

declare type SchedulingBooking = NewSchedulingBooking & {
  nylasCalendarId?: string,
  nylasEditHash?: string,
  nylasProposedEventId?: string,
  emailAddress?: string,
  name?: string,
  location?: string,
  startTime?: number,
  endTime?: number,
  previousStartTime?: number,
  previousEndTime?: number,
  timezone?: string,
  cancelledReason?: string,
  createdAt?: string,
  updatedAt?: string,
}
