export const state = () => ({
  loading: false,
  flat_type_dropdown: [],
  currency_dropdown: [],
  recap_list: [],
  flat_usage_dropdown: [],
  flat_status_dropdown: [],
  employee_dropdown: [],
  owner_dropdown: [],
  document: undefined
})

export const mutations = {
  setLoading(state, value) {
    state.loading = value
  },
  setCurrenciesDropdown(state, data) {
    state.currency_dropdown = data
  },
  setFlatTypeDropdown(state, data) {
    state.flat_type_dropdown = data
  },
  setRecapList(state, data) {
    state.recap_list = data
  },
  setFlatUsageDropdown(state, data) {
    state.flat_usage_dropdown = data
  },
  setFlatStatusDropdown(state, data) {
    state.flat_status_dropdown = data
  },
  setEmployeeDropdown(state, data) {
    state.employee_dropdown = data
  },
  setOwnerDropdown(state, data) {
    state.owner_dropdown = data
  },
  setDocument(state, data) {
    state.document = data
  },
}

export const actions = {

  async downloadDocument({commit}, payload) {
    commit('setLoading', true, {root: true})
    await this.$axios.get('/document/' + payload.type + "/" + payload.flatId, {
      responseType: 'blob',
    })
      .then(res => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', payload.fileName + '.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
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

  async getCurrencyDropdown({commit}) {
    commit('setLoading', true, {root: true})
    await this.$axios.get('/currency')
      .then(res => {
        commit('setCurrenciesDropdown', res.data)
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

  async getFlatTypeDropdown({commit}) {
    commit('setLoading', true, {root: true})
    await this.$axios.get('/flattype')
      .then(res => {
        commit('setFlatTypeDropdown', res.data)
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

  async getRecap({commit}) {
    commit('setLoading', true, {root: true})
    await this.$axios.get('/recap')
      .then(res => {
        commit('setRecapList', res.data)
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

  async getFlatUsageDropdown({commit}) {
    commit('setLoading', true, {root: true})
    await this.$axios.get('/flatusage')
      .then(res => {
        commit('setFlatUsageDropdown', res.data)
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

  async getFlatStatusDropdown({commit}) {
    commit('setLoading', true, {root: true})
    await this.$axios.get('/flatstatus')
      .then(res => {
        commit('setFlatStatusDropdown', res.data)
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

  async getEmployeeDropdown({commit}) {
    commit('setLoading', true, {root: true})
    await this.$axios.get('/employee')
      .then(res => {
        commit('setEmployeeDropdown', res.data)
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

  async getOwnerDropdown({commit}) {
    commit('setLoading', true, {root: true})
    await this.$axios.get('/owner')
      .then(res => {
        commit('setOwnerDropdown', res.data)
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
