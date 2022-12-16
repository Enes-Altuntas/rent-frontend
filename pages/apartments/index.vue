<template>
    <v-data-table :headers="headers" :items="apartments" :search="search" :single-expand="singleExpand"
        item-key="apartmentId" :expanded.sync="expanded" show-expand class="elevation-1"
        no-data-text="Hiçbir apartman bulunamamıştır!">
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>Apartman Listesi</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Arama" single-line
                    hide-details></v-text-field>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-btn color="primary" class="mb-2" @click="openNewApartmentDialog()" light>
                    Yeni Apartman Ekle
                </v-btn>
                <EditApartmentDialog :dialogProp.sync="dialog" :selectedIdProp.sync="selectedId" />
                <DeleteApartmentDialog :dialogProp.sync="dialogDelete" :selectedIdProp.sync="selectedId" />
                <EditFlatDialog :dialogProp.sync="dialogFlats" :selectedApartmentIdProp.sync="selectedId"
                    :selectedFlatIdProp.sync="selectedFlatId" />
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
                    <v-icon color="primary" class="mr-2" v-bind="attrs" v-on="on" @click="openNewFlatDialog(item)">
                        mdi-store-plus
                    </v-icon>
                </template>
                <span>Daire Ekle</span>
            </v-tooltip>
            <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                    <v-icon color="error" class="ml-2" v-bind="attrs" v-on="on" @click="openDeleteDialog(item)">
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
                        <div small class="mr-2 clickable" @click="openEditFlatDialog(item)">
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
                    <template v-slot:item.renter="{ item }">
                        <nuxt-link :to="'/renters/' + item.renter.renterId" v-if="item.renter != null">{{
                                item.renter.nameSurname
                        }}</nuxt-link>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-tooltip bottom v-if="item.renter == null">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon color="primary" class="mr-2" v-bind="attrs" v-on="on">
                                    mdi-account-plus
                                </v-icon>
                            </template>
                            <span>Sözleşme Yap</span>
                        </v-tooltip>
                        <v-tooltip bottom v-if="item.renter != null">
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon color="primary" class="mr-2" v-bind="attrs" v-on="on">
                                    mdi-account-minus
                                </v-icon>
                            </template>
                            <span>Sözleşme Bitir</span>
                        </v-tooltip>
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                                <v-icon color="error" class="ml-2" v-bind="attrs" v-on="on">
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
    color: rgb(243, 178, 0);
    text-decoration: underline;
}
</style>

<script>
import EditApartmentDialog from '~/components/dialogues/editApartment.vue'
import DeleteApartmentDialog from '~/components/dialogues/deleteApartment.vue'
import EditFlatDialog from '~/components/dialogues/editFlat.vue'
import { mapState, mapActions } from 'vuex'

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
            { text: 'Apartman Adı', value: 'apartmentName', align: "center" },
            { text: 'Apartman No.', value: 'number', align: "center" },
            { text: 'Sokak Adı', value: 'streetName', align: "center" },
            { text: 'Mahalle', value: 'neighborhood', align: "center" },
            { text: 'İlçe', value: 'state', align: "center" },
            { text: 'Şehir', value: 'city', align: "center" },
            { text: 'İşlemler', value: 'actions', sortable: false, align: "center" }
        ],
        flatHeaders: [
            { text: 'Daire No.', value: 'flatNumber', align: "center" },
            { text: 'Daire Tipi', value: 'flatType', align: "center" },
            { text: 'Daire Fiyatı', value: 'flatPrice', align: "center" },
            { text: 'Daire Alanı', value: 'flatArea', align: "center" },
            { text: 'Kiracı Adı - Soyadı', value: 'renter', align: "center" },
            { text: 'İşlemler - Soyadı', value: 'actions', sortable: false, align: "center" },
        ],
    }),

    mounted() {
        this.getApartmentData()
    },

    computed: {
        ...mapState({
            apartments: state => state.apartments.apartments_list,
            flatTypes: state => state.flat_type_list,
            currencies: state => state.currency_list
        }),
    },

    methods: {
        ...mapActions({
            getApartments: "apartments/getApartments"
        }),

        async getApartmentData() {
            await this.getApartments()
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


