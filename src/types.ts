
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

  link: string,
  linkText: string,

}

export type AppProps = {
  plans: Plan[],
  typicalSpeedType: 'evening' | 'business',
}
