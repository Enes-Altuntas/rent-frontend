export const state = () => ({
    apartments_list: [],
})

export const actions = {

    async getApartments({ commit }) {
        commit('setLoading', true, { root: true })
        await this.$axios.get('/apartment')
            .then(res => {
                commit('setApartments', res.data)
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

    async deleteApartment({ commit }, payload) {
        commit('setLoading', true, { root: true })
        await this.$axios.delete('/apartment/' + payload)
            .then(res => {
                commit('deleteApartment', res.data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                commit('setLoading', false, { root: true })
            })
    },

    async saveApartment({ commit }, payload) {
        commit('setLoading', true, { root: true })
        await this.$axios.post('/apartment', payload)
            .then(res => {
                commit('addApartment', res.data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                commit('setLoading', false, { root: true })
            })
    },

    async updateApartment({ commit }, payload) {
        commit('setLoading', true, { root: true })
        await this.$axios.put('/apartment', payload)
            .then(res => {
                commit('changeApartment', res.data)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                commit('setLoading', false, { root: true })
            })
    },

    saveFlat({ commit }, data) {
    },
    deleteFlat({ commit }, data) {
    },
    updateFlat({ commit }, data) {
    },
    assignRenter({ commit }, data) {
    },
    unassignRenter({ commit }, data) {
    }
}

export const mutations = {

    setApartments(state, data) {
        state.apartments_list = data
    },

    deleteApartment(state, data) {
        state.apartments_list.splice(state.apartments_list.findIndex(item => item.apartmentId === data), 1)
    },

    addApartment(state, data) {
        state.apartments_list.push(data)
    },

    changeApartment(state, data) {
        state.apartments_list.splice(state.apartments_list.findIndex(item => item.apartmentId === data.apartmentId), 1, data)
    },

}