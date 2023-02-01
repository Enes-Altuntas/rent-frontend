<template>
  <v-dialog v-model="dialogProp" fullscreen hide-overlay persistent transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>
          <span class="font-weight-bold">Yeni Ödeme Girişi</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn color="error" @click="closeDialog()">Vazgeç</v-btn>
          <v-btn color="success" @click="sendPayment()">Kaydet</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <v-row class="ml-0 mb-5 mt-5 text-h6">Ödeme Bilgileri</v-row>
        <v-divider class="mb-5"></v-divider>
        <v-form ref="form" v-model="valid" :lazy-validation="true" class="mt-5">
          <v-row>
            <v-file-input
              v-model="file"
              chips
              counter
              label="Dosya Ekle"
              outlined
              show-size
            ></v-file-input>
          </v-row>
          <v-row>
            <v-select v-model="selectedFlat"
                      :items="flatData"
                      class="mt-3 mr-5"
                      item-text="address"
                      item-value="flatId"
                      label="Daire Seçimi"
                      solo
            ></v-select>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>

import {mapActions, mapState} from "vuex";

export default {
  name: "NewPaymentDialog",
  props: ["dialogProp"],
  data: () => ({
    valid: false,
    file: undefined,
    selectedFlat: null,
    flatData: [],
  }),

  watch: {
    renter: {
      deep: true,
      immediate: true,
      handler: function () {
        if (this.renter != null) {
          this.renter.flatList.forEach(value => {
            let flat = {
              flatId: value.flatId,
              address: "Daire: " + value.flatNumber + " " + value.address
            }
            this.flatData.push(flat)
          })
        }
      }
    }
  },

  computed: {
    ...mapState({
      renter: state => state.renters.selected_renter,
    }),
  },

  methods: {
    ...mapActions({
      createPaymentActions: "renters/createPayment",
    }),

    sendPayment() {
      let formData = new FormData()
      formData.append("file", this.file)

      let data = {
        "flatId": this.selectedFlat,
        "renterId": this.renter.renterId
      }
      formData.append("data", JSON.stringify(data))

      this.createPaymentActions(formData)
      this.closeDialog()
    },

    closeDialog() {
      this.$refs.form.resetValidation()
      this.$emit('update:dialogProp', false)
      this.$emit('update:renterId', null)
    },
  }
}
</script>

<style scoped>

</style>
