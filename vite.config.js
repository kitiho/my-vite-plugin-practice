import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import myPlugin from './my-plugin/my-plugin'
import vueI18n from './my-plugin/vite-plugin-vue-i18n'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), myPlugin(), vueI18n]
})
