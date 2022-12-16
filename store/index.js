export const state = () => ({
    loading: false,
    flat_type_list: [],
    currency_list: [],
})

export const mutations = {
    setLoading(state, value) {
        state.loading = value
    },
    setCurrencies(state, data) {
        state.currency_list = data
    },
    setFlatTypeList(state, data) {
        state.flat_type_list = data
    },
}

export const actions = {

    async getCurrencies({ commit }) {
        commit('setLoading', true, { root: true })
        await this.$axios.get('/currency')
            .then(res => {
                commit('setCurrencies', res.data)
            })
            .catch(err => {
                this.$swal({
                    title: err.message,
                    text: 'Devam etmek ister misiniz ?',
                    icon: 'error',
                    confirmButtonText: 'Yes'
                });
                console.log(err)
            })
            .finally(() => {
                commit('setLoading', false, { root: true })
            })
    },

    async getFlatTypes({ commit }) {
        commit('setLoading', true, { root: true })
        await this.$axios.get('/flattype')
            .then(res => {
                commit('setFlatTypeList', res.data)
            })
            .catch(err => {
                this.$swal({
                    title: err.message,
                    text: 'Devam etmek ister misiniz ?',
                    icon: 'error',
                    confirmButtonText: 'Yes'
                });
                console.log(err)
            })
            .finally(() => {
                commit('setLoading', false, { root: true })
            })
    }
}