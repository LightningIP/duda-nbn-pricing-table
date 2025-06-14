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

let app: IApp<Element> | null = null
export function init({ container, props = {} }: { container?: any, props?: {} } = {}) {
  console.log('[LIP_DUDA_NBN_PRICING_TABLE] Init widget with props:', props);
  app = createApp(App, props);
  registerPlugins(app)
  app.mount(container)
}

export function clean() {
  app?.unmount();
}


(function(global){
  var handler: any = {
    init: init,
    clean: clean,
  };
  (global as any).dmAPI.registerExternalWidget('nbn-pricing-table', handler)
}(window));
