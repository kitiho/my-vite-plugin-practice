<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import axios from 'axios'
import { getCurrentInstance, ref, computed } from 'vue';



const ins = getCurrentInstance()
const { locale, t } = useI18n({
  inheritLocale: true
})
function useI18n() {
  console.log("🚀 ~ file: App.vue ~ line 11 ~ ins", ins)
  const locale = ref('en')
  const i18n = ins.type.i18n
  const t = (msg) => {
    return computed(() => i18n[locale.value][msg])
  }
  return { locale, t }
}
async function testMock() {
  const res = await axios.get('api/users')
  console.log(res)
}
testMock()
</script>

<template>
  <label>{{ t('language') }}</label>
  <select v-model="locale">
    <option value="en">en</option>
    <option value="ja">ja</option>
  </select>
  <p>{{ t('hello') }}</p>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
<i18n>
{
  "en": {
    "language": "Language",
    "hello": "hello, world!"
  },
  "ja": {
    "language": "言語",
    "hello": "こんにちは、世界！"
  }
}
</i18n>
