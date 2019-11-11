<template>
  <div class="container">
    <div class="loginContainer">
      <b-form-input type="text" class="elem" placeholder="Логин" v-model="login" />
      <b-form-input type="password" class="elem" placeholder="Пароль" v-model="pass" />
      <captcha @captchaChanged="captchaUpdate" :updateCount="captchaUpdateCount" />
      <b-alert :show="errMessage" variant="danger">{{ errMessage }}</b-alert>
      <b-button variant="outline-primary" class="elem" @click="auth">Войти</b-button>
    </div>
  </div>
</template>

<script>
import { BFormInput, BButton, BAlert } from "bootstrap-vue";
import Captcha from './elements/captcha';
import provider from '../utils/provider';

export default {
  name: 'Login',
  components: {
    BFormInput,
    BButton,
    BAlert,
    Captcha,
  },
  data () {
    return {
      login: '',
      pass: '',
      captcha: '',
      captchaUpdateCount: 0,
      errMessage: null,
    }
  },
  methods: {
    async auth() {
      this.errMessage = null;
      const authData = {
        username: this.login,
        password: this.pass,
        captcha: this.captcha,
      };
      
      if (!authData.username || !authData.password || !authData.captcha) {
        this.errMessage = 'Не все поля заполнены!';
        return;
      }

      try {
        await provider.post('/auth/login', authData);
        this.$router.push({
          path: '/profiles',
        });
      } catch(err) {
        this.captchaUpdateCount++;
        const resMessage = err.response.data.message;
        if (resMessage === 'captcha') {
          this.errMessage = 'Неверная капча';
        } else if (resMessage === 'login') {
          this.errMessage = 'Неверный логин или пароль';
        } else {
          this.errMessage = 'Неизвестная ошибка';
        }
      }
    },
    captchaUpdate(val) {
      this.captcha = val;
    }
  },
}
</script>

<style scoped>
.loginContainer {
  max-width: 350px;
  margin: 0 auto;
  margin-top: 60px;
}
.elem {
  margin-bottom: 30px;
}
</style>