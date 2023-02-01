export const state = () => ({
  apartments_list: [],
})

export const actions = {

  async getApartments({commit}) {
    commit('setLoading', true, {root: true})
    await this.$axios.get('/apartment')
      .then(res => {
        commit('setApartments', res.data)
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

  async deleteApartment({commit}, payload) {
    commit('setLoading', true, {root: true})
    await this.$axios.delete('/apartment/' + payload)
      .then(res => {
        commit('setApartments', res.data)
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

  async saveApartment({commit}, payload) {
    commit('setLoading', true, {root: true})
    await this.$axios.post('/apartment', payload)
      .then(res => {
        commit('setApartments', res.data)
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

  async updateApartment({commit}, payload) {
    commit('setLoading', true, {root: true})
    await this.$axios.put('/apartment', payload)
      .then(res => {
        commit('setApartments', res.data)
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

  async saveFlat({commit}, payload) {
    commit('setLoading', true, {root: true})
    await this.$axios.post('/flat', payload)
      .then(res => {
        commit('setFlats', res.data)
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

  async updateFlat({commit}, payload) {
    commit('setLoading', true, {root: true})
    await this.$axios.put('/flat', payload)
      .then(res => {
        commit('setFlats', res.data)
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

  async deleteFlat({commit}, payload) {
    commit('setLoading', true, {root: true})
    await this.$axios.delete('/flat/' + payload)
      .then(res => {
        commit('setFlats', res.data)
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
  setApartments(state, data) {
    state.apartments_list = data
    state.apartments_list.map(value => {
      value.address = value.neighborhood + " Mah. "
        + value.streetName + " Sok. " + value.apartmentName + " Apt. " + "No: " + value.number + " "
        + value.state + "/" + value.city.toUpperCase()
    })
  },

  setFlats(state, data) {
    let index = state.apartments_list.map(x => x.apartmentId).indexOf(data.apartmentId);
    if (index !== -1) {
      state.apartments_list[index].flatList = data.flatList
    }
  },
}
