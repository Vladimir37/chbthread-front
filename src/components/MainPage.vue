<template>
    <div class="container profileContainer">
        <b-table striped hover class="profileTable" :items="profilesList" :fields="fields">
            <template v-slot:cell(aboutTarget)="data">
                <collapsed-text :text="data.item.aboutTarget" />
            </template>
            <template v-slot:cell(aboutMe)="data">
                <collapsed-text :text="data.item.aboutMe" />
            </template>
        </b-table>
    </div>
</template>

<script>
import { BAlert, BTable } from "bootstrap-vue";
import moment from 'moment';
import collapsedText from './elements/collapsedText';
import provider from '../utils/provider';

export default {
    name: 'MainPage',
    components: {
        BAlert, 
        BTable,
        collapsedText,
    },
    data() {
        return {
            profilesList: null,
            errMessage: null,
            fields: [
                {
                    key: 'city',
                    label: 'Город ↑↓',
                    sortable: true,
                    class: 'sortableCell',
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
                },
                {
                    key: 'aboutMe',
                    label: 'О себе',
                },
                {
                    key: 'contacts',
                    label: 'Контакты',
                },
                {
                    key: 'date',
                    label: 'Дата ↑↓',
                    formatter: (val) => moment(val).format('DD.MM.YYYY'),
                    sortable: true,
                    class: 'sortableCell',
                },
            ],
        };
    },
    mounted() {
        this.getProfiles();
        moment.locale('ru');
    },
    methods: {
        getProfiles() {
            provider.get('/profiles/getAll').then(res => {
                this.profilesList = res.data.body;
            }).catch(err => {
                console.log(err);
                this.errMessage = 'Произошла ошибка. Пожалуйста, повторите запрос позже.'
            });
        }
    }
}
</script>

<style>
.profileContainer {
    overflow-x: scroll;
    padding: 0;
}
.profileTable th {
    white-space: nowrap;
}
.profileTable td {
    text-align: left;
}
th.sortableCell {
    cursor: pointer;
}
.targetGenderCell {
    white-space: nowrap;
}
</style>