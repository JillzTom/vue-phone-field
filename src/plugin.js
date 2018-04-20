import PhoneField from './component/phone-field.vue';

module.exports = {
  install: function (Vue, options) {
    Vue.component('vue-phone-field', PhoneField);
  }
};