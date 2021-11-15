export type GeneratePDFOptions = {
  page?: {
    /** `'Portrait'` or `'Landscape`'. Default is `'Portrait'` */
    orientation?: 'Portrait' | 'Landscape'
    /** `'Letter'`, `'Legal'`, `'Tabloid'`, `'Ledger'`, `'A0'`, `'A1'`, `'A2'`, `'A3'`, `'A4'`, `'A5'` or `'A6'`. Default is `'A4'` */
    size?:
      | 'Letter'
      | 'Legal'
      | 'Tabloid'
      | 'Ledger'
      | 'A0'
      | 'A1'
      | 'A2'
      | 'A3'
      | 'A4'
      | 'A5'
      | 'A6'
    margins?: {
      /**  How much space between the top of each page and the content. Supported dimension units are: `'mm'`, `'cm'`, `'in'`, `'px'` */
      top?: string
      /** How much space between the right of each page and the content. Supported dimension units are: `'mm'`, `'cm'`, `'in'`, `'px'` */
      right?: string
      /** How much space between the right of each page and the content. Supported dimension units are: `'mm'`, `'cm'`, `'in'`, `'px'` */
      bottom?: string
      /** How much space between the left of each page and the content. Supported dimension units are: `'mm'`, `'cm'`, `'in'`, `'px'` */
      left?: string
    }
  }
  /** The HTML to render at the top of every page */
  header?: {
    html: string
  }
  /** The HTML to render at the bottom of every page */
  footer?: {
    html: string
  }
  /** The HTML to render as a pdf */
  body: {
    html: string
  }
}
