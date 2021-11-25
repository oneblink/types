export type FreshdeskField = {
  /** Not sure if this is useful for us */
  id: number
  /** I think this is what we will use to reference fields values when submitting tickets */
  name: string
  /** Label in fresh desk, we should prob display this in submission event config screen */
  label: string
  /**
   * Description in fresh desk, we should prob display this in submission event
   * config screen
   */
  description: null | string
  /** Order of fields on form to submit issue, we should respect this */
  position: number
  /** We can ignore this as its used by agents after tickets are created */
  required_for_closure: boolean
  /**
   * This will determine if the mapping is required or not along with
   * "required_for_customers"
   */
  required_for_agents: boolean
  /** Not really useful */
  type: string
  /** This is just true if its a default field (i.e. cannot be deleted), not really useful */
  default: boolean
  /**
   * This will determine the type of mapping in the submission event config if
   * true, show form element dropdown in submission event config if false, show
   * free text entry in submission event config
   */
  customers_can_edit: boolean
  /** I think we can ignore this */
  label_for_customers: string
  /**
   * This will determine if the mapping is required or not along with
   * "required_for_agents"
   */
  required_for_customers: boolean
  /** I think we can ignore this */
  displayed_to_customers: boolean
  /** ISO timestamp string */
  created_at: string
  /** ISO timestamp string */
  updated_at: Date
  /** I think we can ignore this */
  portal_cc?: boolean
  /** I think we can ignore this */
  portal_cc_to?: string
  /**
   * String[]: label and value are the same
   *
   * ```json
   * [
   *   "Customer",
   *   "CivicPlus",
   *   "OneBlink",
   *   "AWS",
   *   "Other"
   * ]
   * ```
   *
   * Record<string, number>: label is key (string), value is the number
   *
   * ```json
   * {
   *   "Email": 1,
   *   "Portal": 2,
   *   "Phone": 3,
   *   "Forum": 4
   * }
   * ```
   *
   * Record<string, string[]>: label is the last string in the array, value is
   * the key (parsed as an integer)
   *
   * ```json
   * {
   *   "2": ["Open", "Being Processed"],
   *   "3": ["Pending", "Awaiting your Reply"],
   *   "4": ["Resolved", "This ticket has been Resolved"],
   *   "5": ["Closed", "This ticket has been Closed"]
   * }
   * ```
   */
  choices?: string[] | Record<string, number | string[]>
  options?: Array<{ value: string | number; label: string }>
}