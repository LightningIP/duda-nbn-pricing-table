
export type DudaLink = {
  href: string,
  raw_url: string,
  rel: string,
  target: string,
  type: string,
}

export type Plan = {
  name: string,
  monthly: number,

  typicalDownload: number,
  typicalUpload: number,

  description: string,

  techFTTP: boolean,
  techHFC: boolean,
  techFTTN: boolean,
  techFTTB: boolean,
  techFTTC: boolean,
  techFW: boolean,
  techSat: boolean,

  link: DudaLink,
  linkText: string,

}

export type Breakpoint = {
  break: number,
  itemsToShow: number,
  itemsToScroll: number,
}

export type AppProps = {
  plans: Plan[],
  typicalSpeedType: 'evening' | 'business',
  breakpoints: Breakpoint[],
}
