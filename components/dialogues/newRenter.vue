<template>
  <v-dialog v-model="dialogProp" fullscreen hide-overlay persistent transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>
          <span class="font-weight-bold">Yeni Kiracı Oluştur</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn color="error" @click="closeDialog()">Vazgeç</v-btn>
          <v-btn color="success">Kaydet</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <v-form ref="form" v-model="valid" :lazy-validation="true" class="mt-5">
          <v-row class="ml-0 mb-5 text-h6">Daire Bilgileri</v-row>
          <v-divider class="mb-5"></v-divider>
          <v-row>
            <v-col cols="12" md="6" sm="6">
              <v-text-field v-model="editedItem.nameSurname" clearable counter
                            label="Kiracı İsim-Soyisim" maxlength="30"></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field v-model="editedItem.tckn" clearable counter label="T.C. Kimlik No."
                            maxlength="30"></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field v-model="editedItem.iban" clearable counter label="Kiracı IBAN"
                            maxlength="26"></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field v-model="editedItem.email" clearable counter label="Kiracı E-Mail"
                            maxlength="30"></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field v-model="editedItem.phoneNumber" clearable counter label="Kiracı Tel."
                            maxlength="30"></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  name: 'NewRenterDialog',
  props: ["dialogProp"],
  data() {
    return {
      valid: false,
      editedItem: {
        renterId: null,
        code: '',
        tckn: '',
        iban: '',
        nameSurname: '',
        email: '',
        phoneNumber: '',
        isActive: undefined,
        flatList: [],
        payments: [],
      },
      defaultItem: {
        renterId: null,
        code: '',
        tckn: '',
        iban: '',
        nameSurname: '',
        email: '',
        phoneNumber: '',
        isActive: undefined,
        flatList: [],
        payments: [],
      },
    }
  },

  computed: {},

  methods: {
    closeDialog() {
      this.$refs.form.resetValidation()
      this.$emit('update:dialogProp', false)
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
