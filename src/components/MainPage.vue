<template>
    <div :class="{
            container: true,
            profileContainer: true,
            emptyContainer: !visibleProfiles.length
        }">
        <filters @filterChanged="filterChanged" />
        <b-alert :show="errMessage" variant="danger">{{ errMessage }}</b-alert>
        <b-table 
            striped 
            hover 
            class="profileTable" 
            v-if="visibleProfiles.length" 
            :items="visibleProfiles" 
            :fields="fields"
        >
            <template v-slot:cell(aboutTarget)="data">
                <collapsed-text :text="data.item.aboutTarget" />
            </template>
            <template v-slot:cell(aboutMe)="data">
                <collapsed-text :text="data.item.aboutMe" />
            </template>
        </b-table>
        <h2 v-else-if="profilesList && profilesList.length">Нет анкет, соответствующих критериям поиска.</h2>
        <h2 v-else>
            Пока здесь нет анкет. <span class="errLink" @click="openCreate">Создайте первую анкету</span> или загляните в 
            <span class="errLink" @click="toArchive">архив</span>.
        </h2>
    </div>
</template>

<script>
import { BAlert, BTable } from "bootstrap-vue";
import moment from 'moment';
import filters from './elements/filters';
import collapsedText from './elements/collapsedText';
import provider from '../utils/provider';

export default {
    name: 'MainPage',
    components: {
        BAlert, 
        BTable,
        filters,
        collapsedText,
    },
    props: {
        updateProfilesCount: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            profilesList: null,
            errMessage: null,
            filter: {
                gender: 2,
                targetGender: 2,
                minAge: 10,
                maxAge: 99,
                city: '',
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
        },
        filterChanged(filters) {
            this.filter = filters;
        },
        openCreate() {
            this.$bvModal.show('createProfileModal');
        },
        toArchive() {
            this.$router.push({
                path: '/archive',
            });
        }
    },
    computed: {
        visibleProfiles() {
            if (!this.profilesList) {
                return [];
            }

            let result = [...this.profilesList];

            if (this.filter.gender == 0 || this.filter.gender == 1) {
                result = result.filter(elem => elem.gender == this.filter.gender);
            }

            if (this.filter.targetGender == 0 || this.filter.targetGender == 1) {
                result = result.filter(elem => elem.targetGender == this.filter.targetGender);
            }

            if (this.filter.minAge) {
                result = result.filter(elem => elem.age >= this.filter.minAge);
            }

            if (this.filter.maxAge) {
                result = result.filter(elem => elem.age <= this.filter.maxAge);
            }

            if (this.filter.city) {
                result = result.filter(elem => elem.city.toLowerCase().includes(this.filter.city.toLowerCase()));
            }

            return result;
        },
    },
    watch: {
        updateProfilesCount() {
            this.getProfiles();
        }
    }
}
</script>

<style>
.profileContainer {
    overflow-x: scroll;
    padding: 0;
}
.emptyContainer {
    overflow-x: auto;
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
.errLink {
    text-decoration: none;
    color: #009CDC;
    cursor: pointer;
}
</style>