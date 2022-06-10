export type FreshdeskFieldOption = {
  value: string | number
  label: string
  options?: FreshdeskFieldOption[]
}

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
  /** There are only a specific number of types Freshdesk support */
  type:
    | 'custom_number'
    | 'custom_decimal'
    | 'custom_date'
    | 'custom_text'
    | 'custom_paragraph'
    | 'custom_checkbox'
    | 'custom_dropdown'
    | 'default_company'
    | 'default_source'
    | 'default_status'
    | 'default_priority'
    | 'default_agent'
    | 'default_group'
    | 'default_ticket_type'
    | 'default_requester'
    | 'default_subject'
    | 'default_description'
    | 'nested_field'
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
  updated_at: string
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
   *
   * Record<string, Record<string, string[]>>: Options are nested, value and
   * label are the same for each option
   *
   * ```json
   * {
   *   "Australia": {
   *     "NSW": ["Gosford", "Springfield"],
   *     "QLD": ["Brisbane", "Gold Coast"]
   *   },
   *   "US": {
   *     "Texas": ["Dalis", "Cinco Ranch"],
   *     "Virginia": ["Arlington", "Short Pump"]
   *   }
   * }
   * ```
   */
  choices?:
    | string[]
    | Record<string, number | string[] | Record<string, string[]>>
  /** If the type is "nested_field" this will be an array containing the two sub categories */
  nested_ticket_fields?: FreshdeskField[]
  options?: FreshdeskFieldOption[]
}
