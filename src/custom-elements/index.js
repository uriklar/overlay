import '@webcomponents/custom-elements';
import { defineCustomElement } from 'vue';
import Indicator from './Indicator.vue';
import { initEventListenersAndStore } from './webapp-events';

initEventListenersAndStore();

// Workaround for https://github.com/vuejs/core/issues/4662
const modules = import.meta.glob('./**/*.vue');
Promise.all(Object.values(modules).map((module) => module())).then((modules) => {
  const styles = modules.map((module) => module.default.styles);
  Indicator.styles = [styles.flat().join('')];

  let indicatorCustomElement = defineCustomElement(Indicator);
  customElements.define('overlay-indicator', indicatorCustomElement);

  console.log('Custom element defined');
});
