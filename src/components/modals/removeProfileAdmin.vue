<template>
    <b-modal id="removeProfileAdminModal">
        <template v-slot:modal-title>
            Удаление юзера
        </template>
        <div class="d-block">
            <p>Вы уверены, что хотите удалить анкету</p>
            <p class="aboutMeRemoveText">"{{ shortcutAboutMeText }}"</p>
            <p>созданную <b>{{ handledDate }}</b>?</p>
            <b-alert :show="errMessage" variant="danger">{{ errMessage }}</b-alert>
        </div>
        <template v-slot:modal-footer>
            <b-button @click="$bvModal.hide('removeProfileAdminModal')">Отмена</b-button>
            <b-button variant="danger" @click="removeUser">Удалить</b-button>
        </template>
    </b-modal>
</template>

<script>
import { BButton, BModal, BAlert } from "bootstrap-vue";
import moment from 'moment';
import provider from '../../utils/provider';

export default {
    name: 'removeProfileAdminModal',
    components: {
        BButton, 
        BModal,
        BAlert,
    },
    props: {
        targetProfile: {
            type: Object,
            required: true,
        }
    },
    data() {
        return {
            errMessage: null,
        }
    },
    computed: {
        shortcutAboutMeText() {
            if (!this.targetProfile.aboutMe) {
                return '';
            } else if (this.targetProfile.aboutMe.length < 100) {
                return this.targetProfile.aboutMe;
            }
            return this.targetProfile.aboutMe.slice(0, 100) + '...';
        },
        handledDate() {
            if (!this.targetProfile.date) {
                return '';
            }
            return moment(this.targetProfile.date).format('DD.MM.YYYY');
        }
    },
    methods: {
        removeUser() {
            const userData = {
                id: this.targetProfile._id,
            };

            provider.post('/profiles/removeAdmin', userData).then(res => {
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
.aboutMeRemoveText {
    font-weight: bold;
    word-break: break-word;
}
</style>