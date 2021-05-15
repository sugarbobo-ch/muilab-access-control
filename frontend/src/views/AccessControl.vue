<template>
  <b-container>
    <b-row>
      <b-col class="center">
        <b-img :src="require('../assets/images/MUILab-logo.jpg')" height="250" width="250" />
        <h3>MUILab 實聯制門禁登記</h3>
        <h3 :class="{ 'text-danger': count > 5, 'text-success': count <= 5 }">當前人數：{{ count }}</h3>
      </b-col>
    </b-row>
    <b-row class="fill-form">
      <b-col class="center">
        <b-card
          title="實聯制登錄"
          class="card"
        >
          <b-card-text class="text-center">為配合中央流行疫情指揮中心實施「<b-link href="https://www.cdc.gov.tw/File/Get/t-_Xs5DDee2qzBFC1fRXJA">實聯制</b-link>」，進出實驗室門前請進行 QRCode 掃碼登錄，蒐集之資料僅供配合疫調使用，並由國立陽明交通大學 MUILab 實驗室管理，資料存放期間為28日，當您進行掃碼登錄時，代表您同意我們進行資料的蒐集。</b-card-text>
          <b-form autocomplete="on">
            <b-form-group
              label="管制門ID"
              label-for="input-phone"
              label-cols="4"
              class="text-left"
            >
              <b-form-input id="input-phone" v-model="doorId" trim placeholder="Door ID" disabled />
            </b-form-group>
            <b-form-group
              label="姓名"
              label-for="input-name"
              label-cols="4"
              class="text-left"
            >
              <b-form-input id="input-name" v-model="name" name="name" autocomplete="name" trim placeholder="Name" />
            </b-form-group>
            <b-form-group
              label="連絡電話"
              label-for="input-phone"
              label-cols="4"
              class="text-left"
            >
              <b-form-input id="input-phone" v-model="phoneNumber" name="tel" trim placeholder="Contact Phone Number" />
            </b-form-group>
            <b-form-group v-slot="{ ariaDescribedby }" label="動作" label-cols="4" class="text-left">
              <b-form-radio-group
                id="btn-radios-1"
                v-model="action"
                :options="options"
                :aria-describedby="ariaDescribedby"
                button-variant="outline-dark"
                name="action"
                buttons
              />
            </b-form-group>
          </b-form>
          <hr>
          <b-button variant="dark" block class="mt-3 p-3" @click="handleClickSumbit">完成</b-button>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { addLog, getCurrentCount } from '@/api'

export default {
  name: 'AccessControl',
  data() {
    return {
      doorId: 'muilab-715',
      name: '',
      phoneNumber: '',
      action: 'in',
      options: [
        { text: '進入 Enter', value: 'in' },
        { text: '離開 Exit', value: 'out' }
      ],
      status: 'entering'
    }
  },
  computed: {
    ...mapGetters([
      'count'
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
            footerClass: 'p-2 border-top-0 msgbox-footer',
            centered: true
          })
          this.name = ''
          this.phoneNumber = ''
          const { data } = await getCurrentCount()
          if (data.code === 200) {
            console.log(data.data)
            this.$store.commit('SET_COUNT', data.data)
          }
        } else {
          this.$bvModal.msgBoxOk(data.message, {
            title: '錯誤',
            okVariant: 'danger',
            okTitle: '確定',
            headerClass: 'p-2 border-bottom-0',
            footerClass: 'p-2 border-top-0 msgbox-footer',
            centered: true
          })
        }
      } catch (error) {
        this.$bvModal.msgBoxOk(error.message, {
          title: '錯誤',
          okVariant: 'danger',
          okTitle: '確定',
          headerClass: 'p-2 border-bottom-0',
          footerClass: 'p-2 border-top-0 msgbox-footer',
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
  margin-top: 1rem;
  @media screen and (min-width: map-get($grid-breakpoints, sm)){
    margin-bottom: 4rem;
  }
}
</style>
