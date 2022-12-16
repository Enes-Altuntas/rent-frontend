<template>
  <v-app dark>
    <div class="loading-page" v-if="loading">
      <div class="lds-hourglass"></div>
    </div>
    <v-navigation-drawer clipped fixed app>
      <v-list shaped>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact color="primary">
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar clipped-left fixed app color="primary" light>
      <v-toolbar-title color="appBarTitle">{{ title }}</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <Nuxt />
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
import { mapState, mapActions } from 'vuex'

export default {
  name: 'DefaultLayout',
  data() {
    return {
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
          icon: 'mdi-account',
          title: 'Profil',
          to: '/profile'
        },
        {
          icon: 'mdi-logout',
          title: 'Çıkış Yap',
          to: '/logout'
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

  mounted() {
    this.getCurrencyData()
    this.getFlatTypeData()
  },

  methods: {
    ...mapActions({
      getCurrencies: "getCurrencies",
      getFlatTypes: "getFlatTypes"
    }),

    async getCurrencyData() {
      await this.getCurrencies()
    },

    async getFlatTypeData() {
      await this.getFlatTypes()
    },
  }
}
</script>
