<template>
  <b-container>
    <b-row>
      <b-col class="center">
        <b-img :src="require('../assets/images/MUILab-logo.jpg')" height="250" width="250" />
        <h3>MUILab 實聯制門禁登記</h3>
        <h3>當前人數：{{ count }}</h3>
      </b-col>
    </b-row>
    <b-row class="fill-form">
      <b-col v-if="!isLogin" class="center" />
      <b-col v-else class="center">
        <b-table striped hover :items="log" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { addLog } from '@/api'

export default {
  name: 'AccessControl',
  data() {
    return {
      log: []
    }
  },
  computed: {
    ...mapGetters([
      'count', 'isLogin'
    ])
  },
  created() {
  },
  methods: {
    async handleClickSumbit() {
      const requestBody = {
        doorId: this.doorId,
        name: this.name,
        phoneNumber: this.phoneNumber,
        action: this.action
      }
      try {
        const { data } = await addLog(requestBody)
        if (data.code === 200) {
          this.status = 'success'
          this.$bvModal.msgBoxOk('感謝您的填寫', {
            title: '成功',
            okVariant: 'success',
            okTitle: '確定',
            headerClass: 'p-2 border-bottom-0',
            footerClass: 'p-2 border-top-0',
            centered: true
          })
        }
      } catch (error) {
        this.$bvModal.msgBoxOk(error.message, {
          title: '錯誤',
          okVariant: 'danger',
          okTitle: '確定',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0',
          centered: true
        })
        this.status = 'failed'
      }
    }
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

.card {
  max-width: 768px;
}

.fill-form {
  @media screen and (min-width: map-get($grid-breakpoints, sm)){
    margin-bottom: 4rem;
  }
}
</style>
