import type { TierLimitation } from './organisations'

/**
 * Monthly AI token usage for an organisation.
 *
 * Usage resets on the 1st of each calendar month at 00:00 UTC. Unused tokens do
 * not roll over to the next period.
 */
export type OrganisationAITokenUsage = {
  /** Tokens consumed from user/model input during the current usage period. */
  inputTokensUsed: number
  /** Tokens consumed from model output during the current usage period. */
  outputTokensUsed: number
  /**
   * Inclusive start of the current usage period in ISO 8601 format. Resets on
   * the 1st of each month at 00:00 UTC.
   */
  periodStartAt: string
  /** Exclusive end of the current usage period in ISO 8601 format. */
  periodEndAt: string
}

/**
 * Monthly AI token usage paired with the effective account limits for the
 * organisation after applying tier configuration and tier overrides.
 */
export type OrganisationAITokenUsageSummary = OrganisationAITokenUsage & {
  inputTokensLimit: TierLimitation
  outputTokensLimit: TierLimitation
}

export type OrganisationAITokenLimitDirectionStatus = {
  limit: TierLimitation
  used: number
  isLimitReached: boolean
}

/** Resolved monthly AI token limits and usage for each token direction. */
export type OrganisationAITokenLimitStatus = {
  inputTokens: OrganisationAITokenLimitDirectionStatus
  outputTokens: OrganisationAITokenLimitDirectionStatus
}
