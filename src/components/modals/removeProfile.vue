<template>
    <b-modal id="removeProfileModal">
        <template v-slot:modal-title>
            Удаление анкеты
        </template>
        <div class="d-block">
            <p>Для удаления введите секретный код, выданный при создании анкеты.</p>
            <b-form-input type="text" class="elem" placeholder="Секретный код удаления" v-model="code" />
            <div class="captcha">
                <captcha @captchaChanged="captchaUpdate" :updateCount="captchaUpdateCount" />
            </div>
            <b-alert :show="errMessage" variant="danger">{{ errMessage }}</b-alert>
        </div>
        <template v-slot:modal-footer>
            <b-button @click="$bvModal.hide('removeProfileModal')">Отмена</b-button>
            <b-button variant="danger" @click="removeProfile">Удалить</b-button>
        </template>
    </b-modal>
</template>

<script>
import { BButton, BModal, BAlert, BFormInput } from "bootstrap-vue";
import Captcha from '../elements/captcha';
import provider from '../../utils/provider';

export default {
    name: 'RemoveProfileModal',
    components: {
        BButton, 
        BModal,
        BAlert,
        BFormInput,
        Captcha,
    },
    data() {
        return {
            errMessage: null,
            code: '',
            captcha: '',
            captchaUpdateCount: 0,
        }
    },
    methods: {
        removeProfile() {
            //
        },
        captchaUpdate(val) {
            this.captcha = val;
        }
    }
}
</script>

<style scoped>
.captcha {
    margin-top: 30px;
    text-align: center;
}
</style>