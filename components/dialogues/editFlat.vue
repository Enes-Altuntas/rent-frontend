<template>
    <v-dialog v-model="dialogProp" persistent max-width="600px">
        <v-card>
            <v-card-title class="text-h5">
                {{ formTitle }}
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-form ref="form" v-model="valid" :lazy-validation="true">
                        <v-row>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model="editedItem.flatNumber" label="Daire Numarası" counter
                                    :rules="[rules.required]" maxlength="6" prefix="No." required
                                    clearable></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-select :items="flatTypes" label="Daire Tipi" outlined v-model="editedItem.flatType"
                                    :rules="[rules.required]" item-text="flatTypeValue" item-value="flatTypeId" required
                                    clearable></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model="editedItem.flatPrice" label="Daire Kira Fiyatı" counter
                                    maxlength="8" :rules="[rules.required, rules.numeric]" required
                                    clearable></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-select :items="currencies" label="Para Birimi" outlined v-model="editedItem.currency"
                                    :rules="[rules.required]" item-text="currencyValue" item-value="currencyId" required
                                    clearable></v-select>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model="editedItem.flatArea" label="Daire Alanı(m2)" counter
                                    :rules="[rules.required, rules.numeric]" maxlength="4" required suffix="m2"
                                    clearable></v-text-field>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="closeFlatsDialog">Kaydet</v-btn>
                <v-btn color="error" text @click="closeFlatsDialog">Vazgeç</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

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
                flatType: null,
                flatPrice: "",
                currency: null,
                flatArea: ""
            },
            defaultItem: {
                apartmentId: null,
                flatId: null,
                flatNumber: null,
                flatType: null,
                flatPrice: "",
                currency: null,
                flatArea: ""
            },
            flatHeaders: [
                { text: 'Daire No.', value: 'flatNumber' },
                { text: 'Daire Tipi', value: 'flatType' },
                { text: 'Daire Fiyatı', value: 'flatPrice' },
                { text: 'Daire Alanı', value: 'flatArea' },
                { text: 'Para Birimi', value: 'currency' },
                { text: 'Kiracı Adı - Soyadı', value: 'renters.nameSurname' },
                { text: 'Kiracı İşlemleri', value: 'actions' },
            ],
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
            flatTypes: state => state.flat_type_list,
            currencies: state => state.currency_list
        }),
    },

    watch: {
        dialogProp(val) {
            if (val && this.selectedFlatIdProp > -1) {
                if (this.apartments.filter((el) => el.apartmentId === this.selectedApartmentIdProp).length > 0) {
                    var apartment = this.apartments.filter((el) => el.apartmentId === this.selectedApartmentIdProp)[0]
                    var flat = apartment.flatList.filter((el) => el.flatId === this.selectedFlatIdProp)[0]
                    this.editedItem = Object.assign({}, flat)
                }
            }
        }
    },

    methods: {
        ...mapActions({
            assignRenter: "apartments/assignRenter",
            unassignRenter: "apartments/unassignRenter",
        }),

        closeFlatsDialog() {
            this.$refs.form.resetValidation()
            this.$emit('update:dialogProp', false)
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.$emit('update:selectedFlatIdProp', -1)
                this.$emit('update:selectedApartmentIdProp', -1)
            })
        },

        assignRenter(item) {
            this.unassignRenter(item.renterId)
        },

        unassignRenter(item) {
            this.unassignRenter(item.renterId)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>