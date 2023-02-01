export const state = () => ({
  renters_list: [],
  selected_renter: undefined,
})

export const getters = {}

export const actions = {
  async getRenters({commit}) {
    commit('setLoading', true, {root: true})
    await this.$axios.get('/renter')
      .then(res => {
        commit('setRenters', res.data)
      })
      .catch(err => {
        this.$swal({
          title: err.response.data.message,
          text: err.response.data.details[0],
          icon: 'error',
          confirmButtonText: 'Devam Et'
        });
      })
      .finally(() => {
        commit('setLoading', false, {root: true})
      })
  },

  async getRenter({commit}, payload) {
    commit('setLoading', true, {root: true})
    await this.$axios.get('/renter/' + payload)
      .then(res => {
        commit('setRenter', res.data)
      })
      .catch(err => {
        this.$swal({
          title: err.response.data.message,
          text: err.response.data.details[0],
          icon: 'error',
          confirmButtonText: 'Devam Et'
        });
      })
      .finally(() => {
        commit('setLoading', false, {root: true})
      })
  },

  async updateRenter({commit}, payload) {
    commit('setLoading', true, {root: true})
    await this.$axios.put('/renter', payload)
      .then(res => {
        commit('setRenter', res.data)
      })
      .catch(err => {
        this.$swal({
          title: err.response.data.message,
          text: err.response.data.details[0],
          icon: 'error',
          confirmButtonText: 'Devam Et'
        });
      })
      .finally(() => {
        commit('setLoading', false, {root: true})
      })
  },

  async deleteRenter({commit}, payload) {
    commit('setLoading', true, {root: true})
    await this.$axios.delete('/renter/' + payload)
      .then(res => {
        commit('setRenters', res.data)
      })
      .catch(err => {
        this.$swal({
          title: err.response.data.message,
          text: err.response.data.details[0],
          icon: 'error',
          confirmButtonText: 'Devam Et'
        });
      })
      .finally(() => {
        commit('setLoading', false, {root: true})
      })
  },

  async createContract({commit}, payload) {
    commit('setLoading', true, {root: true})
    await this.$axios.post('/contract/create', payload)
      .then(res => {
        commit('setRenter', res.data)
      })
      .catch(err => {
        this.$swal({
          title: err.response.data.message,
          text: err.response.data.details[0],
          icon: 'error',
          confirmButtonText: 'Devam Et'
        });
      })
      .finally(() => {
        commit('setLoading', false, {root: true})
      })
  },

  async deleteContract({commit}, payload) {
    commit('setLoading', true, {root: true})
    await this.$axios.post('/contract/delete', payload)
      .then(res => {
        commit('setRenter', res.data)
      })
      .catch(err => {
        this.$swal({
          title: err.response.data.message,
          text: err.response.data.details[0],
          icon: 'error',
          confirmButtonText: 'Devam Et'
        });
      })
      .finally(() => {
        commit('setLoading', false, {root: true})
      })
  },

  async createPayment({commit}, payload) {
    commit('setLoading', true, {root: true})
    await this.$axios.post('/payment/create', payload, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        commit('setRenter', res.data)
      })
      .catch(err => {
        this.$swal({
          title: err.response.data.message,
          text: err.response.data.details[0],
          icon: 'error',
          confirmButtonText: 'Devam Et'
        });
      })
      .finally(() => {
        commit('setLoading', false, {root: true})
      })
  },

  async deletePayment({commit}, payload) {
    commit('setLoading', true, {root: true})
    await this.$axios.post('/payment/delete', payload)
      .then(res => {
        commit('setRenter', res.data)
      })
      .catch(err => {
        this.$swal({
          title: err.response.data.message,
          text: err.response.data.details[0],
          icon: 'error',
          confirmButtonText: 'Devam Et'
        });
      })
      .finally(() => {
        commit('setLoading', false, {root: true})
      })
  },
}

export const mutations = {
  setRenters(state, data) {
    state.renters_list = data
  },

  setRenter(state, data) {
    state.selected_renter = data
  },
}
