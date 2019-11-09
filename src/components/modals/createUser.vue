<template>
    <b-modal id="createUserModal">
        <template v-slot:modal-title>
            Создание юзера
        </template>
        <div class="d-block">
            <b-form-input type="text" class="textInput" placeholder="Логин" v-model="login" />
            <b-form-input type="text" class="textInput" placeholder="Пароль" v-model="pass" />
            <b-alert :show="errMessage" variant="danger">{{ errMessage }}</b-alert>
        </div>
        <template v-slot:modal-footer>
            <b-button @click="$bvModal.hide('createUserModal')">Отмена</b-button>
            <b-button variant="success" @click="createUser">Создать</b-button>
        </template>
    </b-modal>
</template>

<script>
import { BButton, BModal, BFormInput, BAlert } from "bootstrap-vue";
import provider from '../../utils/provider';

export default {
    name: 'CreateUserModal',
    components: {
        BButton, 
        BModal,
        BFormInput, 
        BAlert,
    },
    data() {
        return {
            login: '',
            pass: '',
            errMessage: null,
        }
    },
    methods: {
        createUser() {
            this.errMessage = null;
            const userData = {
                login: this.login,
                pass: this.pass,
            }
            if (!userData.login || !userData.pass) {
                this.errMessage = 'Не все поля заполнены';
                return;
            }

            provider.post('/admins/create', userData).then(res => {
                this.$emit('success');
            }).catch(err => {
                console.log(err);
                if (err.response.data.message == 'Login already exist') {
                    this.errMessage = 'Такой пользователь уже существует';
                } else {
                    this.errMessage = 'Ошибка сервера. Пожалуйста, повторите запрос позже';
                }
            });
        }
    }
}
</script>

<style scoped>
.textInput {
    margin: 30px 0;
}
</style>