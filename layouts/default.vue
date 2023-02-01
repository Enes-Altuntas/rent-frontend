<template>
  <v-app dark>
    <div v-if="loading" class="loading-page">
      <div class="lds-hourglass"></div>
    </div>
    <v-navigation-drawer v-model="drawer" app
                         clipped>
      <v-list shaped>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" color="secondary" exact router>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app clipped-left color="primary" dark fixed>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="font-weight-bold" color="appBarTitle">{{ title }}</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <Nuxt/>
    </v-main>
  </v-app>
</template>

<style>
.loading-page {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  padding-top: 25%;
  font-size: 128px;
  font-family: sans-serif;
  z-index: 100;
}

.lds-hourglass {
  display: inline-block;
  position: relative;
  width: 128px;
  height: 128px;
}

.lds-hourglass:after {
  content: " ";
  display: block;
  border-radius: 50%;
  width: 0;
  height: 0;
  margin: 6px;
  box-sizing: border-box;
  border: 26px solid #fff;
  border-color: #fff transparent #fff transparent;
  animation: lds-hourglass 1.2s infinite;
}

@keyframes lds-hourglass {
  0% {
    transform: rotate(0);
    animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
  }

  50% {
    transform: rotate(900deg);
    animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
  }

  100% {
    transform: rotate(1800deg);
  }
}
</style>

<script>
import {mapActions, mapState} from 'vuex'

export default {
  name: 'DefaultLayout',
  data() {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Ana Sayfa',
          to: '/'
        },
        {
          icon: 'mdi-home-city',
          title: 'Apartmanlarım',
          to: '/apartments'
        },
        {
          icon: 'mdi-door',
          title: 'Kiracılarım',
          to: '/renters'
        },
        {
          icon: 'mdi-island',
          title: 'Arsalarım',
          to: '/lands'
        },
        {
          icon: 'mdi-account-cash',
          title: 'Mal Sahipleri',
          to: '/owners'
        },
        {
          icon: 'mdi-account-supervisor',
          title: 'Sorumlu Personeller',
          to: '/employees'
        }
      ],
      title: 'Apartman Yönetim Sistemi'
    }
  },

  computed: {
    ...mapState({
      loading: state => state.loading,
    }),
  },

  async mounted() {
    await this.getCurrencyDropdown()
    await this.getFlatTypeDropdown()
    await this.getFlatUsageDropdown()
    await this.getFlatStatusDropdown()
    await this.getEmployeeDropdown()
    await this.getOwnerDropdown()
  },

  methods: {
    ...mapActions({
      getCurrencyDropdown: "getCurrencyDropdown",
      getFlatTypeDropdown: "getFlatTypeDropdown",
      getFlatUsageDropdown: "getFlatUsageDropdown",
      getFlatStatusDropdown: "getFlatStatusDropdown",
      getEmployeeDropdown: "getEmployeeDropdown",
      getOwnerDropdown: "getOwnerDropdown"
    })
  }
}
</script>
