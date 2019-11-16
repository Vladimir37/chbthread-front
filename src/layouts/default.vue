<template>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <div class="container">
          <b-navbar-nav>
            <b-nav-item to="/">Главная</b-nav-item>
            <b-nav-item to="/archive">Архив</b-nav-item>
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-button variant="primary" @click="openCreateProfile">
              Добавить анкету
            </b-button>
            <b-nav-item @click="openRemoveProfile">Удалить анкету</b-nav-item>
          </b-navbar-nav>
        </div>
      </b-navbar>
      <div class="content">
          <router-view :updateProfilesCount="updateProfilesCount" />
      </div>
      <remove-profile-modal @success="successHandler" />
      <create-profile-modal @success="successHandler" />
    </div>
</template>

<script>
import { BNavbar, BNavbarNav, BNavItem, BButton } from "bootstrap-vue";
import removeProfileModal from '../components/modals/removeProfile';
import createProfileModal from '../components/modals/createProfile';

export default {
  name: 'DefaultLayout',
  components: {
    BNavbar, 
    BNavbarNav, 
    BNavItem, 
    BButton,
    removeProfileModal,
    createProfileModal,
  },
  data() {
    return {
      updateProfilesCount: 0,
    };
  },
  methods: {
    openCreateProfile() {
      this.$bvModal.show('createProfileModal');
    },
    openRemoveProfile() {
      this.$bvModal.show('removeProfileModal');
    },
    successHandler() {
      this.updateProfilesCount++;
    }
  }
}
</script>