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
        grantId: string
        proposedEventId: string
        startTime: number
        endTime: number
        timezone: string
        location?: string
        previousStartTime?: number
        previousEndTime?: number
        cancelledReason?: string
      }
  )

export type NylasSchedulingConfiguration = {
  /* The Configuration object ID. */
  id: string
  /* The name of the Scheduling Page. If not set, it defaults to the organizer's name. */
  name: string
  /* The slug of the Configuration object. This is an optional, unique identifier for the Configuration object, and you can use the slug instead of the configuration_id when making requests to other Scheduling endpoints. Slugs are unique to the Nylas application. */
  slug: string
  /* If true, the scheduling Availability and Bookings endpoints require a valid session ID to authenticate requests when you use this configuration. */
  requires_session_auth: boolean
  /* The list of participants that is included in the scheduled event. All participants must have a valid Nylas grant. */
  participants: Array<{
    /* The participant's name. */
    name: string
    /* The participant's email address. */
    email: string
    /* Whether the participant is the organizer of the event. For non-round-robin meetings, one of the participants must be specified as an organizer. For round-robin meetings, remove the is_organizer key/value pair or set is_organizer to false for all participants. */
    is_organizer: boolean
    /* The availability data for the participant. If omitted, the participant is considered to be available at all times. At least one participant must have availability data. */
    availability: {
      /* A list of calendar IDs associated with the participant's email address. These calendars are used to check the participant's availability. */
      calendar_ids: string[]
      /* An array of objects for the participant's open hours. Nylas searches for free time slots within these open hours. */
      open_hours: Array<{
        /* The days of the week that the open hour settings are applied to. Sunday corresponds to 0, and Saturday corresponds to 6. */
        days: number[]
        /* The start time in 24-hour time format. Single-digit hours doesn't have a leading zero. The earliest start time is 0:00, and the latest start time is 23:49. */
        start: string
        /*  The end time in a 24-hour time format. Single-digit hours doesn't have a leading zero. */
        end: string
        /* A list of dates that are excluded from the open hours. Dates should be formatted as YYYY-MM-DD. */
        exdates: string[]
      }>
    }
    /* The booking data for the participant. If omitted, the participant is not included in the booked event. At least one participant must have booking data. */
    booking: {
      /* The calendar ID that the event is created in. */
      calendar_id: string
    }
    /* The participant's timezone. This is used when calculating the participant's open hours and in email notifications. */
    timezone: string
  }>
  /* The rules that determine the available time slots for the event. */
  availability: {
    /* The total number of minutes the event should last. */
    duration_minutes: number

    /* The interval between meetings. Nylas checks from the nearest interval of the passed start_time. For example, you schedule 30-minute meetings (duration_minutes) with 15 minutes between them (interval_minutes). If you have a meeting starting at 9:59, the API returns times starting at 10:00 (10:00-10:30, 10:15-10:45). */
    interval_minutes: number
    /* Nylas rounds each time slot to the nearest round_to value. For example, if a time slot starts at 9:05a.m. and round_to is set to 15, Nylas rounds it to 9:15a.m. Must be a multiple of 5 minutes. */
    round_to: number

    /* Availability rules for the scheduling configuration. These rules define how Nylas calculates availability for all participants. */
    availability_rules: {
      /* The method that Nylas uses to calculate availability for all participants. For one-on-one meetings, the availability_method is always collective. */
      availability_method: 'collective' | 'max-fairness' | 'max-availability'
      /* The amount of buffer time to add around existing meetings, in minutes. For example, if an account has a meeting scheduled from 10–11a.m., and you set a buffer of 30 minutes, Nylas treats 9:30–11:30a.m. as busy. */
      buffer: {
        /* The amount of buffer time to add before meetings, in increments of five minutes. For example, if an account has a meeting scheduled from 10:00–11:00a.m., and you set a before buffer of 30 minutes, Nylas treats 9:30–11:00a.m. as busy. 
  This value must be between 0 and 120, and must be divisible by 5. */
        before: number
        /* The amount of buffer time to add after meetings, in increments of five minutes. For example, if an account has a meeting scheduled from 10:00–11:00a.m., and you set an after buffer of 15 minutes, Nylas treats 10:00–11:15a.m. as busy. 
  This value must be between 0 and 120, and must be divisible by 5. */
        after: number
      }
      /* A default set of open hours to apply to all participants. You can overwrite these open hours for individual participants by specifying open_hours on the participant object. */
      default_open_hours: Array<{
        /* The days of the week that the open hour settings are applied to. Sunday corresponds to 0, and Saturday corresponds to 6. */
        days: number[]
        /* The start time in 24-hour time format. Single-digit hours doesn't have a leading zero. The earliest start time is 0:00, and the latest start time is 23:49. */
        start: string
        /* The end time in a 24-hour time format. Single-digit hours doesn't have a leading zero. */
        end: string
        /* A list of dates that are excluded from the open hours. Dates should be formatted as YYYY-MM-DD. */
        exdates: string[]
      }>
    }
  }
  /* The booking data for the event. */
  event_booking: {
    /* The title of the event. */
    title: string
    /* The description of the event. */
    description: string
    /* The location of the event. */
    location: string
    /* The timezone for displaying the times in confirmation email messages and reminders. The timezone must be an IANA time zone database formatted string. For example, America/New_York. */
    timezone: string
    /* The type of booking. If set to booking, Scheduler follows the standard booking flow and instantly creates the event. If set to organizer-confirmation, Scheduler creates an event marked "Pending" in the organizer's calendar and sends an confirmation request email to the organizer. The confirmation request email includes a link to a page where the organizer can confirm or cancel the booking. */
    booking_type: 'booking' | 'organizer-confirmation'
    /* An object that allows you to automatically create a conference or enter conferencing details manually. 
  You cannot use autocreate and details in the same request. */
    conferencing:
      | {
          provider: 'Google Meet' | 'Zoom Meeting' | 'Microsoft Teams'
          /* Include autocreate in your request to indicate that you want Nylas to automatically create conferencing details. If you specify the provider as Zoom Meeting, you must also include the conf_grant_id for the user creating the event.
    You can include additional provider settings in autocreate.settings, but Nylas does not validate them. */
          autocreate: unknown
        }
      | {
          provider: 'Google Meet'
          details: {
            /* The phone number associated with the Google Meet conference. This array accepts only one phone number. */
            phone: string[]

            /* The PIN associated with the Google Meet conference, if applicable. */
            pin: string

            /* The URL for the Google Meet conference. */
            url: string
          }
        }
      | {
          provider: 'Zoom Meeting'
          details: {
            /* A unique ID associated with the Zoom conference. */
            meeting_code: string

            /* The password for the Zoom conference, if applicable. */
            password: string

            /* The URL for the Zoom conference. */
            url: string
          }
        }
      | {
          provider: 'Microsoft Teams'
          details: {
            /* The URL for the Microsoft Teams conference. */
            url: string
          }
        }

    /* If true, Nylas doesn't send any email messages when an event is booked, cancelled, or rescheduled. */
    disable_emails: boolean

    reminders: Array<{
      /* The reminder type. */
      type: 'email' | 'webhook'

      /* The number of minutes before the event to send the reminder. */
      minutes_before_event: number

      /* (Email only) The recipient of the reminder. */
      recipient: 'host' | 'guest' | 'all'

      /* (Email only) The subject of the reminder email. If set, this replaces the default reminder email subject. */
      email_subject: string
    }>
  }
  scheduler: {
    additional_fields: {
      /* The definitions for additional fields to be displayed in the Scheduler UI. Guest will see the additional fields on the Scheduling Page when they book an event. */
      [key: string]: {
        /* The text label to be displayed in the Scheduler UI. */
        label: string

        /* The field type. Supported values are text, multi_line_text, email, phone_number, dropdown, date, checkbox, and radio_button. */
        type: string

        /* Whether the field is required to be filled out by the guest when booking an event. */
        required: boolean

        /* A regular expression pattern that the value of the field must match. */
        pattern: string

        /* The order in which the field will be displayed in the Scheduler UI. Fields with lower order values will be displayed first. */
        order: number

        /* A list of options for the dropdown or radio_button types. This field is required for the dropdown and radio_button types. */
        options: string[]
      }
    }
    /* The number of days in the future that Scheduler is available for scheduling events. */
    available_days_in_future: number

    /* The minimum number of minutes in the future that a user can make a new booking. */
    min_booking_notice: number

    /* The minimum number of minutes before a booking can be cancelled. */
    min_cancellation_notice: number

    /* A message about the cancellation policy to display to users when booking an event. */
    cancellation_policy: string

    /* The URL used to reschedule bookings. This URL is included in confirmation email messages. */
    rescheduling_url: string

    /* The URL used to cancel bookings. This URL is included in confirmation email messages. */
    cancellation_url: string

    /* The URL used to confirm or cancel pending bookings. This URL is included in booking request email messages. */
    organizer_confirmation_url: string

    /* The custom URL to redirect to once the booking is confirmed. */
    confirmation_redirect_url: string

    /* If true, the option to reschedule an event is hidden in booking confirmations and email notifications. */
    hide_rescheduling_options: boolean
    /* If true, the option to cancel an event is hidden in booking confirmations and email notifications. */
    hide_cancellation_options: boolean
    /* Whether to hide the Additional guests field on the Scheduling Page. If true, guests cannot invite additional guests to the event. */
    hide_additional_guests: boolean

    /* Configurable settings for booking emails. */
    email_template: {
      /* The URL to a custom logo that appears at the top of the booking email. Replaces the default Nylas logo. The URL must be publicly accessible. */
      logo: string

      /* Configurable settings specifically for booking confirmed emails. */
      booking_confirmed: {
        /* The title to replace the default 'Booking Confirmed' title. This doesn't change the email subject line. Only visible in emails sent to guests. */
        title: string

        /* The additional body to be appended after the default body. Only visible in emails sent to guests. */
        body: string
      }
    }
  }
  /* Appearance settings definitions for the Scheduling Page. */
  appearance: {
    /* A key-value pair. For pre-defined keys for hosted Scheduling Pages, see Styling options for hosted Scheduling Pages. */
    [key: string]: string
  }
}
