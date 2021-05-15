<template>
  <b-container>
    <b-row>
      <b-col class="center">
        <b-img :src="require('../assets/images/MUILab-logo.jpg')" height="250" width="250" />
        <h3>MUILab 實聯制門禁登記</h3>
        <h3 :class="{ 'text-danger': count > 10, 'text-warning': count > 5, 'text-success': count <= 5 }">當前人數：{{ count }}</h3>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="py-5">
        <b-nav align="center">
          <b-nav-item to="/access">前往登記</b-nav-item>
          <b-nav-item disabled>查看記錄</b-nav-item>
        </b-nav>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  computed: {
    ...mapGetters([
      'count'
    ])
  },
  created() {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
.center {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
}
</style>
