<template>
  <v-dialog v-model="dialogProp" fullscreen hide-overlay persistent transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>
          <span class="font-weight-bold">{{ formTitle }}</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn color="error" @click="closeFlatsDialog">Vazgeç</v-btn>
          <v-btn color="success" @click="save">Kaydet</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <v-form ref="form" v-model="valid" :lazy-validation="true" class="mt-5">
          <v-row class="ml-0 mb-5 text-h6">Daire Bilgileri</v-row>
          <v-divider class="mb-5"></v-divider>
          <v-row>
            <v-col cols="12" md="6" sm="6">
              <v-text-field v-model="editedItem.flatNumber" :rules="[rules.required]" clearable
                            counter label="Daire Numarası" maxlength="6" prefix="No." required></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-select v-model="editedItem.flatTypeId" :items="flatTypeDropdown" :rules="[rules.required]" clearable
                        item-text="flatTypeValue" item-value="flatTypeId" label="Daire Tipi" outlined
                        required></v-select>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field v-model="editedItem.flatPrice" :rules="[rules.required, rules.numeric]" clearable counter
                            label="Daire Kira Fiyatı" maxlength="8" required></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-select v-model="editedItem.currencyId" :items="currencyDropdown" :rules="[rules.required]" clearable
                        item-text="currencyValue" item-value="currencyId" label="Para Birimi" outlined
                        required></v-select>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-text-field v-model="editedItem.flatArea" :rules="[rules.required, rules.numeric]" clearable
                            counter label="Daire Alanı(m2)" maxlength="4" required
                            suffix="m2"></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-select v-model="editedItem.flatStatusId" :items="flat_status_dropdown" :rules="[rules.required]"
                        clearable
                        item-text="statusValue" item-value="flatStatusId" label="Daire Durumu" outlined
                        required></v-select>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-select v-model="editedItem.flatUsageId" :items="flat_usage_dropdown" :rules="[rules.required]"
                        clearable
                        item-text="usageValue" item-value="flatUsageId" label="Daire Kullanım Tipi" outlined
                        required></v-select>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-select v-model="editedItem.employeeId" :items="employee_dropdown" :rules="[rules.required]" clearable
                        item-text="nameSurname" item-value="employeeId" label="İlgili Personel" outlined
                        required></v-select>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-select v-model="editedItem.ownerId" :items="owner_dropdown" :rules="[rules.required]" clearable
                        item-text="nameSurname" item-value="ownerId" label="Mal Sahibi" multiple outlined
                        required></v-select>
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
  name: 'EditFlatDialog',
  props: ["dialogProp", "selectedApartmentIdProp", "selectedFlatIdProp"],
  data() {
    return {
      valid: false,
      rules: {
        required: value => !!value || 'Alanı doldurmak zorunludur!',
        numeric: value => {
          const pattern = /^[1-9][0-9]*$/
          return pattern.test(value) || 'Sadece rakam girilebilir ve "0" ile başlayamaz!'
        },
      },
      editedItem: {
        apartmentId: null,
        flatId: null,
        flatNumber: null,
        flatTypeId: null,
        flatPrice: null,
        currencyId: null,
        flatArea: null,
        flatStatusId: null,
        flatUsageId: null,
        employeeId: null,
        ownerId: [],
      },
      defaultItem: {
        apartmentId: null,
        flatId: null,
        flatNumber: null,
        flatTypeId: null,
        flatPrice: null,
        currencyId: null,
        flatArea: null,
        flatStatusId: null,
        flatUsageId: null,
        employeeId: null,
        ownerId: [],
      },
    }
  },

  computed: {
    formTitle() {
      if (this.selectedFlatIdProp != -1) {
        return 'Daire Düzenle'
      }
      return 'Yeni Daire Ekle'
    },
    ...mapState({
      apartments: state => state.apartments.apartments_list,
      flatTypeDropdown: state => state.flat_type_dropdown,
      currencyDropdown: state => state.currency_dropdown,
      flat_usage_dropdown: state => state.flat_usage_dropdown,
      flat_status_dropdown: state => state.flat_status_dropdown,
      employee_dropdown: state => state.employee_dropdown,
      owner_dropdown: state => state.owner_dropdown
    }),
  },

  watch: {
    dialogProp(val) {
      if (val && this.selectedFlatIdProp > -1) {
        if (this.apartments.filter((el) => el.apartmentId === this.selectedApartmentIdProp).length > 0) {
          var apartment = this.apartments.filter((el) => el.apartmentId === this.selectedApartmentIdProp)[0]
          var flat = apartment.flatList.filter((el) => el.flatId === this.selectedFlatIdProp)[0]

          this.editedItem.flatArea = flat.flatArea
          this.editedItem.flatId = flat.flatId
          this.editedItem.apartmentId = flat.apartmentId
          this.editedItem.employeeId = flat.employee.employeeId
          this.editedItem.currencyId = flat.currency.currencyId
          this.editedItem.flatNumber = flat.flatNumber
          this.editedItem.flatTypeId = flat.flatType.flatTypeId
          this.editedItem.flatPrice = flat.flatPrice
          this.editedItem.flatStatusId = flat.flatStatus.flatStatusId
          this.editedItem.flatUsageId = flat.flatUsage.flatUsageId
          for (let i = 0; i < flat.flatOwners.length; i++) {
            this.editedItem.ownerId.push(flat.flatOwners[i].ownerId)
          }
        }
      } else {
        this.editedItem.apartmentId = this.selectedApartmentIdProp
      }
    }
  },

  methods: {
    ...mapActions({
      saveFlat: "apartments/saveFlat",
      updateFlat: "apartments/updateFlat",
    }),

    closeFlatsDialog() {
      this.$refs.form.resetValidation()
      this.$emit('update:dialogProp', false)
      this.$nextTick(() => {
        this.defaultItem.ownerId = []
        Object.assign(this.editedItem, this.defaultItem)
        this.$emit('update:selectedFlatIdProp', -1)
        this.$emit('update:selectedApartmentIdProp', -1)
      })
    },

    save() {
      if (this.$refs.form.validate()) {
        if (this.editedItem.flatId != null) {
          this.updateFlat(this.editedItem)
        } else {
          this.saveFlat(this.editedItem)
        }
        this.closeFlatsDialog()
      }
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
