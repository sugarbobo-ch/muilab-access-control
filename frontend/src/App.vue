<template>
  <div id="app">
    <div id="wrapper">
      <transition
        name="fade"
        mode="out-in"
        :duration="500"
      >
        <router-view ref="router-view" />
      </transition>
    </div>
  </div>
</template>

<script>
import { getCurrentCount } from '@/api'

export default {
  name: 'App',
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      try {
        const { data } = await getCurrentCount()
        if (data.code === 200) {
          this.$store.commit('SET_COUNT', data.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
