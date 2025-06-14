/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { App as IApp, createApp } from 'vue'
import { AppProps } from './types';

let app: IApp<Element> | null = null
export function init(initData: { container?: any, props: AppProps }) {
  app = createApp(App, initData.props);
  registerPlugins(app)
  app.mount(initData.container)
}

export function clean() {
  app?.unmount();
}

init({ container: '#app', props: {
  plans: [
    {
      name: 'Basic',
      monthly: 75,

      typicalDownload: 25,
      typicalUpload: 10,

      description: 'A low-cost plan suitable for light users who mainly browse the web and check emails.',

      techFTTP: true,
      techHFC: true,
      techFTTN: true,
      techFTTB: true,
      techFTTC: true,
      techFW: false,
      techSat: false,

      link: 'https://bolt.lip.net.au/signup?wantedPlan=nbn-25-10',
      linkText: 'Get Started',

    },
    {
      name: 'Standard',
      monthly: 85,

      typicalDownload: 50,
      typicalUpload: 20,

      description: 'A low-cost plan suitable for light users who mainly browse the web and check emails.',


      techFTTP: true,
      techHFC: true,
      techFTTN: true,
      techFTTB: true,
      techFTTC: true,
      techFW: false,
      techSat: false,

      link: 'https://bolt.lip.net.au/signup?wantedPlan=nbn-25-10',
      linkText: 'Get Started',

    },
    {
      name: 'Fast',
      monthly: 95,

      typicalDownload: 100,
      typicalUpload: 40,

      description: 'A low-cost plan suitable for light users who mainly browse the web and check emails.A low-cost plan suitable for light users who mainly browse the web and check emails.',


      techFTTP: true,
      techHFC: true,
      techFTTN: true,
      techFTTB: true,
      techFTTC: true,
      techFW: false,
      techSat: false,

      link: 'https://bolt.lip.net.au/signup?wantedPlan=nbn-25-10',
      linkText: 'Get Started',

    },
    {
      name: 'Super Fast',
      monthly: 105,

      typicalDownload: 250,
      typicalUpload: 25,

      description: 'A low-cost plan suitable for light users who mainly browse the web and check emails.',

      techFTTP: true,
      techHFC: true,
      techFTTN: true,
      techFTTB: true,
      techFTTC: true,
      techFW: false,
      techSat: false,

      link: 'https://bolt.lip.net.au/signup?wantedPlan=nbn-25-10',
      linkText: 'Get Started',

    },
    {
      name: 'Ultra Fast',
      monthly: 115,

      typicalDownload: 1000,
      typicalUpload: 50,

      description: 'A low-cost plan suitable for light users who mainly browse the web and check emails.',

      techFTTP: true,
      techHFC: true,
      techFTTN: true,
      techFTTB: true,
      techFTTC: true,
      techFW: false,
      techSat: false,

      link: 'https://bolt.lip.net.au/signup?wantedPlan=nbn-25-10',
      linkText: 'Get Started',
    },
    {
      name: 'Hyper Fast',
      monthly: 160,

      description: 'A low-cost plan suitable for light users who mainly browse the web and check emails.',

      typicalDownload: 2000,
      typicalUpload: 100,

      techFTTP: true,
      techHFC: true,
      techFTTN: true,
      techFTTB: true,
      techFTTC: true,
      techFW: false,
      techSat: false,

      link: 'https://bolt.lip.net.au/signup?wantedPlan=nbn-25-10',
      linkText: 'Get Started',
    },
  ],
  typicalSpeedType: 'evening',
} });
