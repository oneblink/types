declare type GeneratePDFOptions = {
  page?: {
    orientation?: 'Portrait' | 'Landscape',
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
      | 'A6',
    margins?: {
      top?: string,
      right?: string,
      bottom?: string,
      left?: string,
    },
  },
  header?: {
    html: string,
  },
  footer?: {
    html: string,
  },
  body: {
    html: string,
  },
}
