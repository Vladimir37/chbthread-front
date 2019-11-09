<template>
    <div>
      <b-navbar toggleable="lg" type="dark" variant="info">
        <div class="container">
          <b-navbar-nav class="ml-auto">
            <b-nav-item href="#"><b>Админы</b></b-nav-item>
            <b-nav-item href="#">Профили</b-nav-item>
            <b-nav-item href="#">Выход</b-nav-item>
          </b-navbar-nav>
        </div>
      </b-navbar>
    </div>
</template>

<script>
import { BNavbar, BNavbarNav, BNavItem } from "bootstrap-vue";

export default {
  name: 'AdminList',
  components: {
    BNavbar, 
    BNavbarNav, 
    BNavItem,
  },
}
</script>

<style scoped>

</style>