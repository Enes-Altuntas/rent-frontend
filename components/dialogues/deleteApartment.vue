<template>
    <v-dialog v-model="dialogProp" persistent max-width="600px">
        <v-card>
            <v-card-title class="text-h5">Apartmanı silmek istediğinize emin misiniz?</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="error" text @click="closeDeleteDialog">Vazgeç</v-btn>
                <v-btn color="primary" text @click="deleteItemConfirm">Evet</v-btn>
                <v-spacer></v-spacer>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    name: 'DeleteApartmentDialog',
    props: ["dialogProp", "selectedIdProp"],
    data() {
        return {
        }
    },

    computed: {
        ...mapState({
            apartments: state => state.apartments.apartments_list
        })
    },

    methods: {
        ...mapActions({
            deleteApartment: "apartments/deleteApartment",
        }),

        deleteItemConfirm() {
            this.deleteApartment(this.selectedIdProp)
            this.closeDeleteDialog()
        },

        closeDeleteDialog() {
            this.$emit('update:dialogProp', false)
            this.$nextTick(() => {
                this.$emit('update:selectedIndexProp', -1)
            })
        },
    }
}
</script>