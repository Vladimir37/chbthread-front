<template>
  <div class="container">
    <div class="loginContainer">
      <b-form-input type="text" class="elem" placeholder="Логин" v-model="login" />
      <b-form-input type="password" class="elem" placeholder="Пароль" v-model="pass" />
      <b-button variant="outline-primary" class="elem" @click="auth">Войти</b-button>
      <b-button variant="outline-primary" class="elem" @click="check">Проверка</b-button>
    </div>
  </div>
</template>

<script>
import { BFormInput, BButton } from "bootstrap-vue";
import axios from 'axios';

export default {
  name: 'Login',
  components: {
    BFormInput,
    BButton,
  },
  data () {
    return {
      login: '',
      pass: '',
    }
  },
  methods: {
    auth() {
      const authData = {
        login: this.login,
        pass: this.pass,
      };
      axios.post(this.apiUrl + '/auth/login', authData).then(res => {
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      });
    },
    check() {
      axios.get(this.apiUrl + '/auth/status').then(res => {
        console.log(res.data);
      }).catch(err => {
        console.log(err);
      });
    }
  },
  computed: {
    apiUrl() {
      return this.$root.apiUrl;
    }
  }
}
</script>

<style scoped>
.loginContainer {
  max-width: 350px;
  margin: 0 auto;
}
.elem {
  margin-bottom: 30px;
}
</style>