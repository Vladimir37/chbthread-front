<template>
    <div class="container">
      <h1>Анкеты</h1>
      <b-alert :show="errMessage" variant="danger">{{ errMessage }}</b-alert>
      <b-form-group label="">
        <b-form-radio-group
          id="targetGender"
          v-model="showArchive"
          :options="showArchiveOptions"
          buttons
          name="targetGenderRadio"
        />
      </b-form-group>
      <b-table 
        striped 
        hover 
        class="profileTable" 
        v-if="targetProfiles.length" 
        :items="targetProfiles" 
        :fields="fields"
      >
        <template v-slot:cell(aboutTarget)="data">
            <collapsed-text :text="data.item.aboutTarget" :symbols="100" />
        </template>
        <template v-slot:cell(aboutMe)="data">
            <collapsed-text :text="data.item.aboutMe" :symbols="100" />
        </template>
        <template v-slot:cell(remove)="data">
            <b-button variant="danger" @click="openRemoveModal(data)">Удалить</b-button>
        </template>
      </b-table>
      <remove-profile-admin @success="successHandler" :targetProfile="targetProfile" />
    </div>
</template>

<script>
import { BButton, BFormGroup, BFormRadioGroup, BAlert } from "bootstrap-vue";
import moment from 'moment';
import collapsedText from './elements/collapsedText';
import removeProfileAdmin from './modals/removeProfileAdmin';
import provider from '../utils/provider';

export default {
  name: 'ProfileList',
  components: {
    BButton, 
    BFormGroup, 
    BFormRadioGroup, 
    BAlert,
    collapsedText,
    removeProfileAdmin,
  },
  data() {
    return {
      errMessage: null,
      targetProfile: {},
      showArchive: false,
      showArchiveOptions: [
        { text: 'Актуальное', value: false },
        { text: 'Архив', value: true },
      ],
      profiles: {
        actual: [],
        archive: [],
      },
      fields: [
        {
            key: 'city',
            label: 'Локация ↑↓',
            sortable: true,
            class: 'sortableCell autoBreakCell cityCell',
        },
        {
            key: 'gender',
            label: 'Пол ↑↓',
            formatter: (val) => val ? 'Тян' : 'Кун',
            sortable: true,
            class: 'sortableCell',
        },
        {
            key: 'age',
            label: 'Возраст ↑↓',
            sortable: true,
            class: 'sortableCell',
        },
        {
            key: 'targetGender',
            label: 'Ищу... ↑↓',
            formatter: (val) => {
                switch(val) {
                    case 0:
                        return 'Ищу куна';
                    case 1:
                        return 'Ищу тян';
                    case 2:
                        return 'Ищу кого угодно';
                }
            },
            sortable: true,
            class: 'sortableCell targetGenderCell',
        },
        {
            key: 'aboutTarget',
            label: 'Кого хотелось бы найти',
            class: 'autoBreakCell'
        },
        {
            key: 'aboutMe',
            label: 'Немного информации о себе',
            class: 'autoBreakCell'
        },
        {
            key: 'contacts',
            label: 'Контакты',
            class: 'autoBreakCell contactsCell'
        },
        {
            key: 'date',
            label: 'Дата ↑↓',
            formatter: (val) => moment(val).format('DD.MM.YYYY'),
            sortable: true,
            class: 'sortableCell',
        },
        {
          key: 'remove',
          label: '',
        }
      ],
    }
  },
  mounted() {
    this.getAllProfiles();
  },
  computed: {
    targetProfiles() {
      return this.showArchive ? this.profiles.archive : this.profiles.actual;
    },
  },
  methods: {
    async getAllProfiles() {
      try {
        const actualProfiles = await provider.get('/profiles/getAll');
        const archiveProfiles = await provider.get('/profiles/getArchive');
        this.profiles = {
          actual: actualProfiles.data.body,
          archive: archiveProfiles.data.body,
        };
      } catch (err) {
        console.log(err);
        this.errMessage = 'Произошла ошибка при загрузке анкет. Пожалуйста, обновите страницу.'
      }
    },
    successHandler() {
      this.$bvModal.hide('removeProfileAdminModal');
      this.getAllProfiles();
    },
    openRemoveModal(data) {
      this.targetProfile = data.item;
      this.$bvModal.show('removeProfileAdminModal');
    }
  }
}
</script>

<style>
.profileTable th {
    white-space: nowrap;
}
.profileTable td {
    text-align: left;
}
th.sortableCell {
    cursor: pointer;
}
.autoBreakCell {
    word-break: break-word;
}
.cityCell {
    min-width: 120px;
}
.contactsCell {
    min-width: 180px;
}
.targetGenderCell {
    white-space: nowrap;
}
</style>