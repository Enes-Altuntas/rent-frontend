<template>
    <v-dialog v-bind:value="dialogProp" persistent max-width="500px">
        <v-card>
            <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-form ref="form" v-model="valid" :lazy-validation="true">
                        <v-row>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="editedItem.apartmentName" label="Apartman Adı" counter
                                    maxlength="30" suffix="Apt." :rules="[rules.required, rules.counter]" required
                                    clearable></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model="editedItem.number" label="Apartman No" type="number"
                                    :rules="[rules.required, rules.numeric]" maxlength="4" required
                                    clearable></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model="editedItem.streetName" label="Sokak Adı" counter
                                    :rules="[rules.required, rules.counter]" maxlength="30" suffix="Sok."
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field v-model="editedItem.neighborhood" label="Mahalle" counter
                                    :rules="[rules.required, rules.counter]" maxlength="30" suffix="Mah."
                                    required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model="editedItem.state" label="İlçe" counter maxlength="30"
                                    :rules="[rules.required, rules.counter]" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="6">
                                <v-text-field v-model="editedItem.city" label="Şehir" counter maxlength="30"
                                    :rules="[rules.required, rules.counter]" required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-form>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="save">
                    Kaydet
                </v-btn>
                <v-btn color="error" text @click="close">
                    Vazgeç
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

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