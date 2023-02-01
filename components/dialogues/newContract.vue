<template>
  <v-dialog v-model="dialogProp" fullscreen hide-overlay persistent transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>
          <span class="font-weight-bold">Yeni Kontrat</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn color="error" @click="closeDialog()">Vazgeç</v-btn>
          <v-btn color="success" @click="createContract()">Kaydet</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-container>
        <v-row class="ml-0 mb-5 mt-5 text-h6">Yeni Kontrat Bilgileri</v-row>
        <v-divider class="mb-5"></v-divider>
        <v-form ref="form" v-model="valid" :lazy-validation="true" class="mt-5">
          <v-row>
            <v-col cols="12" md="6" sm="6">
              <v-menu
                v-model="menu"
                :close-on-content-click="false"
                :nudge-right="40"
                min-width="auto"
                offset-y
                transition="scale-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="startDate"
                    label="Kontrat başlangıç tarihi"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="startDate"
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-select v-model="selectedApartment"
                        :items="apartments"
                        class="mt-3 mr-5"
                        dense
                        item-text="address"
                        item-value="apartmentId"
                        label="Apartman Seçimi"
                        solo
                        @change="selectApartment()"
              ></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6" sm="6">
              <v-text-field v-model="paymentDue"
                            hint="Her ayın kaçıncı günü ise onu girmelisiniz"
                            label="Kira yatırmak için son gün" persistent-hint></v-text-field>
            </v-col>
            <v-col cols="12" md="6" sm="6">
              <v-select v-if="flats"
                        v-model="selectedFlat"
                        :items="flats"
                        class="mt-3 mr-5"
                        dense
                        item-text="flatNumber"
                        item-value="flatId"
                        label="Daire Seçimi"
                        solo
              ></v-select>
            </v-col>
          </v-row>
        </v-form>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "NewContractDialog",
  props: ["dialogProp"],
  data: () => ({
    valid: false,
    selectedApartment: null,
    selectedFlat: null,
    startDate: undefined,
    paymentDue: null,
    flats: undefined,
    menu: false,
  }),

  async mounted() {
    await this.getApartmentsAction()
  },

  computed: {
    ...mapState({
      apartments: state => state.apartments.apartments_list,
      renter: state => state.renters.selected_renter,
    }),
  },

  methods: {
    ...mapActions({
      getApartmentsAction: "apartments/getApartments",
      createContractAction: "renters/createContract",
    }),

    closeDialog() {
      this.$refs.form.resetValidation()
      this.$emit('update:dialogProp', false)
      this.$emit('update:renterId', null)
    },

    selectApartment() {
      let apartmentIndex = this.apartments.map(x => x.apartmentId).indexOf(this.selectedApartment);
      this.flats = this.apartments[apartmentIndex].flatList
      this.selectedFlat = null
    },

    createContract() {
      if (this.$refs.form.validate()) {
        let contract = {
          flatId: this.selectedFlat,
          renterId: this.renter.renterId,
          startDate: this.startDate,
          paymentDue: this.paymentDue
        }
        this.createContractAction(contract)
        this.closeDialog()
      }
    },
  }
}
</script>

<style scoped>

</style>
