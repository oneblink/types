import { HeadingElement } from './forms'

export type FormsAppStyle = {
  /** The font family to use for the entire app */
  fontFamily?: string
  contentContainer?: {
    /** In pixels */
    maxWidth?: number
  }
  formPage?: FormStyle
}

export type FormStyle = BackgroundStyle & {
  /** The container that houses the form elements */
  formContainer?: FormContainerStyle
}

export type FormContainerStyle = BorderStyle &
  BackgroundStyle &
  PaddingStyle & {
    /** The container that houses the form elements */
    elementContainer?: ElementContainerStyle
  }

export type ElementContainerStyle = {
  /** In REM */
  marginBottom?: number

  label?: FontStyles
  /** The heading element */
  heading?: HeadingElementStyle
}

export type HeadingElementStyle = BorderStyle &
  BackgroundStyle &
  PaddingStyle & {
    /**
     * A map of styles assigned to heading sizes. Possible options are 1-5. See
     * also {@link HeadingElement.headingType}
     */
    headingSize?: Record<number, FontStyles>
  }

// Re-usable types
export type FontStyles = {
  /** In REM */
  fontSize?: number
  /** Font weight eg. 300, 500, 700 etc. */
  fontWeight?: number
  /** Hex code */
  fontColor?: string
}

export type BorderStyle = {
  /** Hex code */
  borderColour?: string
  /** In pixels */
  borderRadius?: number
  /* In pixels */
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
