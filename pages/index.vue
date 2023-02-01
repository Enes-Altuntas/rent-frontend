<template>
  <v-data-table :headers="recapHeader" :items="recaps" :search="search" class="elevation-1" hide-default-footer
                item-key="flatId" no-data-text="Hiçbir daire bulunamamıştır!">
    <template v-slot:top>
      <v-toolbar color="secondary" flat light>
        <v-toolbar-title>Daire Özet Listesi</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" hide-details label="Arama" single-line></v-text-field>
      </v-toolbar>
    </template>
    <template v-slot:item.paymentStatus="{ item }">
      <v-chip :color="getColorPayment(item.paymentStatus)" dark>
        {{ item.paymentStatus }}
      </v-chip>
    </template>
    <template v-slot:item.flatStatus="{ item }">
      <v-chip :color="getColorStatus(item.flatStatus.statusValue)" dark>
        {{ item.flatStatus.statusValue }}
      </v-chip>
    </template>
    <template v-slot:item.flatNumber="{ item }">
      <div class="mr-2 clickable" small @click="routeToRenter(item.renterId)">
        Daire {{ item.flatNumber }}
      </div>
    </template>
    <template v-slot:item.apartmentName="{ item }">
      {{ item.apartmentName }} Apt.
    </template>
    <template v-slot:item.employee="{ item }">
      {{ item.employee.nameSurname }}
    </template>
  </v-data-table>
</template>

<style>
.clickable {
  color: #FF8F00;
  text-decoration: underline;
}
</style>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  data: () => ({
    search: "",
    recapHeader: [
      {text: 'Apartman Adı', value: 'apartmentName', align: "center"},
      {text: 'Daire No.', value: 'flatNumber', align: "center", sortable: false},
      {text: 'İlçe', value: 'state', align: "center"},
      {text: 'İl', value: 'city', align: "center"},
      {text: 'İlgili Personel', value: 'employee', align: "center"},
      {text: 'Daire Ödeme Durumu', value: 'paymentStatus', align: "center"},
      {text: 'Daire Durumu', value: 'flatStatus', align: "center"},
    ],
  }),

  computed: {
    ...mapState({
      recaps: state => state.recap_list,
    }),
  },

  async mounted() {
    await this.getRecap()
  },

  methods: {
    ...mapActions({
      getRecap: "getRecap"
    }),

    getColorPayment(status) {
      if (status === "Kira Ödendi" || status === "Satıldı") return 'green'
      else if (status === "Kira Bekleniyor") return 'orange'
      else if (status === "Kira Gecikti") return 'red'
      else return 'gray'
    },

    getColorStatus(status) {
      if (status === "Kiralık") return 'green'
      else return 'orange'
    },

    routeToRenter(renterId) {
      if (renterId != null) {
        this.$router.push("/renters/" + renterId)
      }
    }
  }
}
</script>
