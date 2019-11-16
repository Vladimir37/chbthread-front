<template>
    <b-container class="filterBlock">
        <b-row>
            <b-col class="filterCol">
                <b-form-group label="Кто?">
                    <b-form-radio-group
                        id="gender"
                        v-model="filter.gender"
                        :options="filterOptions.gender"
                        buttons
                        stacked
                        @change="updateFilters"
                        name="genderFilter"
                    />
                </b-form-group>
            </b-col>
            <b-col class="filterCol">
                <b-form-group label="Кого ищет?">
                    <b-form-radio-group
                        id="targetGender"
                        v-model="filter.targetGender"
                        :options="filterOptions.targetGender"
                        buttons
                        stacked
                        @change="updateFilters"
                        name="targetGenderFilter"
                    />
                </b-form-group>
            </b-col>
            <b-col class="filterCol">
                <p class="filterLabel">Возраст:</p>
                <b-form-input 
                    type="text" 
                    placeholder="10" 
                    min="10" 
                    max="99" 
                    class="ageInput"
                    @change="updateFilters"
                    @keypress="isNumber($event)"
                    v-model.number="filter.minAge" 
                />
                |
                <b-form-input 
                    type="text" 
                    placeholder="99" 
                    min="10" 
                    max="99" 
                    class="ageInput"
                    @change="updateFilters"
                    @keypress="isNumber($event)"
                    v-model.number="filter.maxAge" 
                />
            </b-col>
            <b-col class="filterCol">
                    <p class="filterLabel">Город:</p>
                    <b-form-input 
                    type="text" 
                    placeholder="Мос..." 
                    class="cityInput"
                    @change="updateFilters"
                    v-model="filter.city" 
                />
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { BFormGroup, BFormRadioGroup, BContainer, BRow, BCol } from "bootstrap-vue";

export default {
    name: 'Filters',
    components: {
        BFormGroup, 
        BFormRadioGroup, 
        BContainer, 
        BRow, 
        BCol
    },
    data() {
        return {
            filter: {
                gender: 2,
                targetGender: 2,
                minAge: 10,
                maxAge: 99,
                city: '',
            },
            filterOptions: {
                gender: [
                    { text: 'Кун', value: 0 },
                    { text: 'Тян', value: 1 },
                    { text: 'Любой', value: 2 },
                ],
                targetGender: [
                    { text: 'Куна', value: 0 },
                    { text: 'Тян', value: 1 },
                    { text: 'Кого угодно', value: 2 },
                ],
            },
        }
    },
    methods: {
        isNumber: function(evt) {
            evt = (evt) ? evt : window.event;
            var charCode = (evt.which) ? evt.which : evt.keyCode;
            if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
        updateFilters() {
            this.$emit('filterChanged', this.filter);
        }
    },
}
</script>

<style scoped>
.filterBlock {
    margin: 30px 0;
    padding: 15px;
    border: 2px solid #593196;
}
.filterCol {
    min-width: 140px;
}
.filterLabel {
    margin-bottom: 7px;
}
.ageInput {
    width: 60px;
    margin: 0 auto;
}
</style>