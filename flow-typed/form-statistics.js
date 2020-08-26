// @flow

declare type FormSubmissionMetaStatisticsParameters = {
  organisationId: string,
  formsAppEnvironmentId?: number,
  dateFrom: string,
  dateTo: string,
}

declare type FormSubmissionMetaStatisticsByPeriodParameters = {
  organisationId: string,
  formsAppEnvironmentId?: number,
  dateRanges: Array<{
    dateFrom: string,
    dateTo: string,
  }>,
}

declare type FormSubmissionMetaFormsStatistic = {
  formId: string,
  totalSubmissions: number,
}

declare type FormSubmissionMetaFormsAppsStatistic = {
  formsAppId: string,
  totalSubmissions: number,
}

declare type FormSubmissionMetaStatistic = {
  dateFrom: string,
  dateTo: string,
  totalSubmissions: number,
}

declare type FormSubmissionMetaAdministrationStatisticsParameters = {
  organisationId: string,
  dateFrom: string,
  dateTo: string,
  period: 'month' | 'day',
}

declare type FormSubmissionMetaAdministrationStatistic = {
  organisationId: string,
  totalSubmissions: number,
}
