<template>
    <div>
        <img :src="captchaUrl" @click="reload" alt="captcha">
        <b-form-input type="text" class="captchaInput" placeholder="Введите числа с картинки" v-model="captchaValue" />
    </div>
</template>

<script>
import config from '../../config';

export default {
    name: 'Captcha',
    props: {
        updateCount: Number,
    },
    data() {
        return {
            captchaValue: '',
            currentUpdateCount: 0,
        };
    },
    methods: {
        reload() {
            this.currentUpdateCount++;
        }
    },
    computed: {
        captchaUrl() {
            return `${config.apiUrl}captcha/get?update=${this.currentUpdateCount}`;
        },
    },
    watch: {
        captchaValue(value) {
            this.$emit('captchaChanged', value);
        },
        updateCount() {
            this.reload();
        }
    } 
}
</script>

<style scoped>
.captchaInput {
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>