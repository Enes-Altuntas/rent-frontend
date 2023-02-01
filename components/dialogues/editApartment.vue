<template>
  <v-dialog fullscreen hide-overlay persistent transition="dialog-bottom-transition" v-bind:value="dialogProp">
    <v-card>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>
          <span class="font-weight-bold">{{ formTitle }}</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn color="error" @click="close">
            Vazgeç
          </v-btn>
          <v-btn color="success" @click="save">
            Kaydet
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <v-form ref="form" v-model="valid" :lazy-validation="true" class="ml-5 mt-5">
          <v-row class="ml-0 mb-5 text-h6">Apartman Bilgileri</v-row>
          <v-divider class="mb-5"></v-divider>
          <v-row>
            <v-col cols="12" md="6" sm="6">
              <v-text-field v-model="editedItem.apartmentName" :rules="[rules.required, rules.counter]" clearable
                            counter
                            label="Apartman Adı" maxlength="30" required
                            suffix="Apt."></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field v-model="editedItem.number" :rules="[rules.required, rules.numeric]" clearable
                            label="Apartman No" maxlength="4" required
                            type="number"></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field v-model="editedItem.streetName" :rules="[rules.required, rules.counter]" counter
                            label="Sokak Adı" maxlength="30" required
                            suffix="Sok."></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field v-model="editedItem.neighborhood" :rules="[rules.required, rules.counter]" counter
                            label="Mahalle" maxlength="30" required
                            suffix="Mah."></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field v-model="editedItem.state" :rules="[rules.required, rules.counter]" counter label="İlçe"
                            maxlength="30" required></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field v-model="editedItem.city" :rules="[rules.required, rules.counter]" counter label="Şehir"
                            maxlength="30" required></v-text-field>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'EditApartmentDialog',
  props: ["dialogProp", "selectedIdProp"],
  data() {
    return {
      valid: false,
      rules: {
        required: value => !!value || 'Alanı doldurmak zorunludur!',
        counter: value => value.length <= 30 || 'Karakter uzunluğu 30 harften kısa olmalıdır!',
        numeric: value => {
          const pattern = /^[1-9][0-9]*$/
          return pattern.test(value) || 'Sadece rakam girilebilir ve "0" ile başlayamaz!'
        },
      },
      editedItem: {
        apartmentId: null,
        apartmentName: '',
        number: null,
        streetName: '',
        neighborhood: '',
        state: '',
        city: '',
        flats: []
      },
      defaultItem: {
        apartmentId: null,
        apartmentName: '',
        number: null,
        streetName: '',
        neighborhood: '',
        state: '',
        city: '',
        flats: []
      },
    }
  },

  computed: {
    formTitle() {
      return this.selectedIdProp === -1 ? 'Yeni Apartman Ekle' : 'Apartman Düzenle'
    },
    ...mapState({
      apartments: state => state.apartments.apartments_list,
    })
  },

  watch: {
    dialogProp(val) {
      if (val && this.selectedIdProp > -1) {
        if (this.apartments.filter((el) => el.apartmentId === this.selectedIdProp).length > 0) {
          this.editedItem = Object.assign({}, this.apartments.filter((el) => el.apartmentId === this.selectedIdProp)[0])
        }
      }
    }
  },

  methods: {
    ...mapActions({
      saveApartment: "apartments/saveApartment",
      updateApartment: "apartments/updateApartment",
    }),

    close() {
      this.$refs.form.resetValidation()
      this.$emit('update:dialogProp', false)
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.$emit('update:selectedIndexProp', -1)
      })
    },

    save() {
      if (this.$refs.form.validate()) {
        if (this.selectedIdProp > -1) {
          this.updateApartment(this.editedItem)
        } else {
          this.saveApartment(this.editedItem)
        }
        this.close()
      }
    },
  }
}
</script>
