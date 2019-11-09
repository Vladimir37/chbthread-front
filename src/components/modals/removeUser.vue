<template>
    <b-modal id="removeUserModal">
        <template v-slot:modal-title>
            Удаление юзера
        </template>
        <div class="d-block">
            <p>Вы уверены, что хотите удалить админа <b>{{ targetUser.login }}</b>?</p>
            <b-alert :show="errMessage" variant="danger">{{ errMessage }}</b-alert>
        </div>
        <template v-slot:modal-footer>
            <b-button @click="$bvModal.hide('removeUserModal')">Отмена</b-button>
            <b-button variant="danger" @click="removeUser">Удалить</b-button>
        </template>
    </b-modal>
</template>

<script>
import { BButton, BModal, BAlert } from "bootstrap-vue";
import provider from '../../utils/provider';

export default {
    name: 'RemoveUserModal',
    components: {
        BButton, 
        BModal,
        BAlert,
    },
    props: {
        targetUser: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            errMessage: null,
        }
    },
    methods: {
        removeUser() {
            const userData = {
                id: this.targetUser._id,
            };

            provider.post('/admins/remove', userData).then(res => {
                this.$emit('success');
            }).catch(err => {
                console.log(err);
                this.errMessage = 'Ошибка сервера. Пожалуйста, повторите запрос позже';
            });
        }
    }
}
</script>

<style scoped>

</style>