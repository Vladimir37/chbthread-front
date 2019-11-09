<template>
    <div class="container">
      <h1>Админы</h1>
      <b-alert :show="errMessage" variant="danger">{{ errMessage }}</b-alert>
      <div class="buttons">
        <b-button variant="outline-primary" @click="openCreateModal">Создать</b-button>
      </div>
      <b-table striped hover :items="list" :fields="fields">
        <template v-slot:cell(remove)="data">
          <b-button variant="danger" @click="openRemoveModal(data)" >Удалить</b-button>
        </template>
      </b-table>
      <remove-user-modal @success="successHandler" :targetUser="targetUser" />
      <create-user-modal @success="successHandler" />
    </div>
</template>

<script>
import { BButton, BAlert, BTable } from "bootstrap-vue";
import createUserModal from './modals/createUser';
import removeUserModal from './modals/removeUser';
import provider from '../utils/provider';

export default {
  name: 'AdminList',
  components: {
    BButton, 
    BAlert, 
    BTable,
    createUserModal,
    removeUserModal,
  },
  data() {
    return {
      list: [],
      targetUser: {},
      fields: [
        {
          key: 'login',
          label: 'Логин',
        },
        {
          key: 'status',
          label: 'Статус',
          formatter: (val) => val ? 'Модератор' : 'Владелец',
        },
        {
          key: 'remove',
          label: '',
        }
      ],
      errMessage: null,
    };
  },
  methods: {
    getAdmins() {
      provider.get('/admins/getAll').then(res => {
        this.list = res.data.body;
      }).catch(err => {
        console.log(err);
        this.errMessage = 'Произошла ошибка. Пожалуйста, повторите запрос позже.'
      });
    },
    openCreateModal() {
      this.$bvModal.show('createUserModal');
    },
    openRemoveModal(data) {
      this.targetUser = data.item;
      this.$bvModal.show('removeUserModal');
    },
    successHandler() {
      this.$bvModal.hide('createUserModal');
      this.$bvModal.hide('removeUserModal');
      this.getAdmins();
    }
  },
  mounted() {
    this.getAdmins();
  }
}
</script>

<style scoped>
.buttons {
  text-align: right;
  margin: 30px 0;
}
</style>