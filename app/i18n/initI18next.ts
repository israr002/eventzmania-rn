import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';
import { resources } from './resources';

const getDeviceLanguage = (): string => {
  const locales = RNLocalize.getLocales();
  return locales[0]?.languageCode  || 'en';
};

export const I18NEXT_CONFIG = {
  resources,
  lng: getDeviceLanguage(),
  interpolation: {
    escapeValue: false,
  },
  fallbackLng: 'en',
};

export default function initI18next() {
  return i18next
    .use(initReactI18next)
    .init(I18NEXT_CONFIG);
}
