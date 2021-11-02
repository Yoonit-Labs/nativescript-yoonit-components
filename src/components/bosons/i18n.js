import Vue from 'nativescript-vue'
import i18next from 'i18next'
import VueI18Next from '@panter/vue-i18next'
import en from '@quarks/en.i18n'

Vue.use(VueI18Next)

i18next.init({
  lng: 'en',
  resources: {
    ...en
  }
})

const i18n = new VueI18Next(i18next)

export default i18n
