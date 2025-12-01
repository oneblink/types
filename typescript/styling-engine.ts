import { HeadingElement } from './forms'

export type FormStyle = BackgroundStyle & {
  /** The font family to use for the entire form page */
  fontFamily?: string
  /** The container that houses the form elements */
  formContainer?: BorderStyle &
    BackgroundStyle & {
      /** In pixels */
      maxWidth?: number
      /** In REM */
      padding?: number
      /** The container that houses the form elements */
      elementContainer?: {
        /** In REM */
        marginBottom?: number

        label?: FontStyles
        /** The heading element */
        heading?: BorderStyle &
          BackgroundStyle & {
            /**
             * A map of styles assigned to heading sizes. Possible options are
             * 1-5. See also {@link HeadingElement.headingType}
             */
            headingSize?: Record<number, FontStyles>
          }
      }
    }
}

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
