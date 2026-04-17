import { HeadingElement } from './forms'

export type FormsAppStyle = {
  /** The font family to use for the entire app */
  fontFamily?: string
  contentContainer?: {
    /** In pixels */
    maxWidth?: number
  }
  /** The entire form page. `formPage.backgroundColour` does not effect `formPage.formContainer.backgroundColour`. It only sets the background colour outside of it. */
  formPage?: FormStyle
}

export type FormStyle = BackgroundStyle & {
  /** The container that houses all the form elements.
   * `backgroundColour` defaults to `white`. Does not inherit from `formPage.backgroundColour`.
   */
  formContainer?: FormContainerStyle
}

export type FormContainerStyle = BorderStyle &
  BackgroundStyle &
  PaddingStyle & {
    /** The container that houses each individual form element */
    elementContainer?: ElementContainerStyle
  }

export type ElementContainerStyle = {
  /** In REM */
  marginBottom?: number
  /** The label for form elements */
  label?: FontStyles
  /** The heading element */
  heading?: HeadingElementStyle
}

export type HeadingElementStyle = BorderStyle &
  BackgroundStyle &
  PaddingStyle & {
    /**
     * A map of styles assigned to heading sizes. Possible options are 1-5. See
     * also {@link HeadingElement.headingType}. When setting font colours, ensure you define all options.
     */
    headingSize?: Record<number, FontStyles>
  }

// Re-usable types
export type FontStyles = {
  /** In REM */
  fontSize?: number
  /** Font weight eg. 300, 500, 700 etc.
   * @max 1000
   * @min 100
   */
  fontWeight?: number
  /** Hex code */
  fontColour?: string
}

export type BorderStyle = {
  /** Hex code */
  borderColour?: string
  /** In pixels
   * @max 25
   * @min 0
   */
  borderRadius?: number
  /**  In pixels
   * @max 10
   * @min 0
   */
  borderWidth?: number
}

export type BackgroundStyle = {
  /** Hex code */
  backgroundColour?: string
}

export type PaddingStyle = {
  /** In REM */
  padding?: number
}
