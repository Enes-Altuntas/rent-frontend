<template>
  <v-data-table :expanded.sync="expanded" :headers="headers" :items="apartments" :search="search"
                :single-expand="singleExpand" class="elevation-1" item-key="apartmentId"
                no-data-text="Hiçbir apartman bulunamamıştır!"
                show-expand>
    <template v-slot:top>
      <v-toolbar color="secondary" flat light>
        <v-toolbar-title>Apartman Listesi</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-text-field v-model="search" append-icon="mdi-magnify" hide-details label="Arama"
                      single-line></v-text-field>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-btn class="mb-2" color="success" light @click="openNewApartmentDialog()">
          Yeni Apartman Ekle
        </v-btn>
        <EditApartmentDialog :dialogProp.sync="dialog" :selectedIdProp.sync="selectedId"/>
        <DeleteApartmentDialog :dialogProp.sync="dialogDelete" :selectedIdProp.sync="selectedId"/>
        <EditFlatDialog :dialogProp.sync="dialogFlats" :selectedApartmentIdProp.sync="selectedId"
                        :selectedFlatIdProp.sync="selectedFlatId"/>
      </v-toolbar>
    </template>
    <template v-slot:item.apartmentName="{ item }">
      <div class="clickable" @click="openEditDialog(item)">
        {{ item.apartmentName }} Apt.
      </div>
    </template>
    <template v-slot:item.number="{ item }">
      <div>
        No. {{ item.number }}
      </div>
    </template>
    <template v-slot:item.streetName="{ item }">
      <div>
        {{ item.streetName }} Sok.
      </div>
    </template>
    <template v-slot:item.neighborhood="{ item }">
      <div>
        {{ item.neighborhood }} Mah.
      </div>
    </template>
    <template v-slot:item.city="{ item }">
      <div>
        {{ item.city }} / Türkiye
      </div>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon class="mr-2" color="secondary" v-bind="attrs" @click="openNewFlatDialog(item)" v-on="on">
            mdi-store-plus
          </v-icon>
        </template>
        <span>Daire Ekle</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon class="ml-2" color="error" v-bind="attrs" @click="openDeleteDialog(item)" v-on="on">
            mdi-delete
          </v-icon>
        </template>
        <span>Apartman Sil</span>
      </v-tooltip>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td colspan="100%">
        <v-data-table :headers="flatHeaders" :items="item.flatList" hide-default-footer item-key="flatId"
                      no-data-text="Hiçbir daire bulunamamıştır!">
          <template v-slot:item.flatNumber="{ item }">
            <div class="mr-2 clickable" small @click="openEditFlatDialog(item)">
              Daire {{ item.flatNumber }}
            </div>
          </template>
          <template v-slot:item.flatPrice="{ item }">
            {{ item.flatPrice }} {{ item.currency.currencyValue }}
          </template>
          <template v-slot:item.flatType="{ item }">
            {{ item.flatType.flatTypeValue }}
          </template>
          <template v-slot:item.flatArea="{ item }">
            {{ item.flatArea }} m2
          </template>
          <template v-slot:item.flatStatus="{ item }">
            {{ item.flatStatus.statusValue }}
          </template>
          <template v-slot:item.flatUsage="{ item }">
            {{ item.flatUsage.usageValue }}
          </template>
          <template v-slot:item.employee="{ item }">
            {{ item.employee.nameSurname }}
          </template>
          <template v-slot:item.flatOwners="{ item }">
            {{ combineOwnerNames(item.flatOwners) }}
          </template>
          <template v-slot:item.renter="{ item }">
            <nuxt-link v-if="item.renter != null" :to="'/renters/' + item.renter.renterId">{{
                item.renter.nameSurname
              }}
            </nuxt-link>
          </template>
          <template v-slot:item.actions="{ item }">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-icon class="ml-2" color="error" v-bind="attrs" @click="deleteFlat(item)" v-on="on">
                  mdi-delete
                </v-icon>
              </template>
              <span>Daire Sil</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </td>
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
import EditApartmentDialog from '~/components/dialogues/editApartment.vue'
import DeleteApartmentDialog from '~/components/dialogues/deleteApartment.vue'
import EditFlatDialog from '~/components/dialogues/editFlat.vue'
import {mapActions, mapState} from 'vuex'

export default {
  components: {
    EditApartmentDialog,
    DeleteApartmentDialog,
    EditFlatDialog
  },
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dialogFlats: false,
    selectedId: -1,
    selectedFlatId: -1,
    singleExpand: true,
    expanded: [],
    search: '',
    headers: [
      {text: 'Apartman Adı', value: 'apartmentName', align: "center"},
      {text: 'Apartman No.', value: 'number', align: "center"},
      {text: 'Sokak Adı', value: 'streetName', align: "center"},
      {text: 'Mahalle', value: 'neighborhood', align: "center"},
      {text: 'İlçe', value: 'state', align: "center"},
      {text: 'Şehir', value: 'city', align: "center"},
      {text: 'İşlemler', value: 'actions', sortable: false, align: "center"}
    ],
    flatHeaders: [
      {text: 'Daire No.', value: 'flatNumber', align: "center"},
      {text: 'Daire Durumu', value: 'flatStatus', align: "center"},
      {text: 'Daire Kullanım Tipi', value: 'flatUsage', align: "center"},
      {text: 'Daire Tipi', value: 'flatType', align: "center"},
      {text: 'Daire Fiyatı', value: 'flatPrice', align: "center"},
      {text: 'Daire Alanı', value: 'flatArea', align: "center"},
      {text: 'Mal Sahibi Adı - Soyadı', value: 'flatOwners', align: "center"},
      {text: 'İlgili Personel', value: 'employee', align: "center"},
      {text: 'Kiracı Adı - Soyadı', value: 'renter', align: "center"},
      {text: 'İşlemler', value: 'actions', sortable: false, align: "center"},
    ],
  }),

  async mounted() {
    await this.getApartmentsAction()
  },

  computed: {
    ...mapState({
      apartments: state => state.apartments.apartments_list,
    }),
  },

  methods: {
    ...mapActions({
      getApartmentsAction: "apartments/getApartments",
      deleteFlatAction: "apartments/deleteFlat"
    }),

    deleteFlat(item) {
      if (item.renter == null) {
        this.deleteFlatAction(item.flatId)
      } else {
        this.$swal({
          title: "Dolu Daire!",
          text: 'Dairede oturmakta olan bir kiracı bulunmaktadır. İlk önce kiracının sözleşmesini bitirmelisiniz!',
          icon: 'warning',
          confirmButtonText: 'Yes'
        });
      }
    },

    combineOwnerNames(owners) {
      const ownerNames = [];

      for (let i = 0; i < owners.length; i++) {
        ownerNames.push(owners[i].nameSurname)
      }

      return ownerNames.join(', ');
    },

    openNewApartmentDialog() {
      this.selectedId = -1
      this.dialog = true
    },

    openEditDialog(item) {
      this.selectedId = item.apartmentId
      this.dialog = true
    },

    openDeleteDialog(item) {
      this.selectedId = item.apartmentId
      this.dialogDelete = true
    },

    openEditFlatDialog(item) {
      this.selectedId = item.apartmentId
      this.selectedFlatId = item.flatId
      this.dialogFlats = true
    },

    openNewFlatDialog(item) {
      this.selectedId = item.apartmentId
      this.selectedFlatId = -1
      this.dialogFlats = true
    },
  },
}
</script>


