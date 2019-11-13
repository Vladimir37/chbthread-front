<template>
    <b-modal id="createProfileModal">
        <template v-slot:modal-title>
            Создание анкеты
        </template>
        <div class="d-block">
            <div v-if="!sended">
                <b-form-group label="Я...">
                    <b-form-radio-group
                        id="gender"
                        v-model="form.gender"
                        :options="options.gender"
                        buttons
                        name="radios-btn-primary"
                    />
                </b-form-group>
                <div class="ageBlock">
                    Мне
                    <b-form-input type="number" placeholder="18" min="10" id="ageField" v-model="form.age" />
                    лет
                </div>
                <div class="cityBlock">
                    Мой город: 
                    <b-form-input type="text" placeholder="Москва" v-model="form.city" />
                </div>
                <p class="textLabel">Обо мне:</p>
                <b-form-textarea
                    id="textarea"
                    v-model="form.aboutMe"
                    :placeholder="aboutMePlaceholder"
                    class="textareaObj"
                    rows="3"
                    max-rows="12"
                />
                <b-form-group label="Я ищу...">
                    <b-form-radio-group
                        id="targetGender"
                        v-model="form.targetGender"
                        :options="options.targetGender"
                        buttons
                        name="radios-btn-primary"
                    />
                </b-form-group>
                <p class="textLabel">О том, кого я ищу:</p>
                <b-form-textarea
                    id="textarea"
                    v-model="form.aboutTarget"
                    :placeholder="aboutTargetPlaceholder"
                    class="textareaObj"
                    rows="3"
                    max-rows="12"
                />
                <p class="textLabel">Контакты:</p>
                <b-form-input type="text" placeholder="@telegram, /vk, pochta@mail.ru" v-model="form.contacts" />
                <div class="captcha">
                    <captcha @captchaChanged="captchaUpdate" :updateCount="captchaUpdateCount" />
                </div>
                <b-alert :show="errMessage" variant="danger">{{ errMessage }}</b-alert>
            </div>
            <div v-else>
                <p>Анкета успешно создана! Вот ваш секретный код удаления:</p>
                <p class="secretCode">{{ responseDeleteCode }}</p>
                <p>
                    Запишите или скопируйте его себе. Вы сможете удалить анкету в любой момент с помощью этого кода.
                    Никому не говорите этот код, так как им может воспользоваться любой человек.
                </p>
            </div>
        </div>
        <template v-slot:modal-footer>
            <div v-if="!sended">
                <b-button @click="$bvModal.hide('createProfileModal')">Отмена</b-button>
                <b-button variant="primary" @click="createProfile">Отправить</b-button>
            </div>
            <div v-else>
                <b-button variant="primary" @click="$bvModal.hide('createProfileModal')">Готово</b-button>
            </div>
        </template>
    </b-modal>
</template>

<script>
import { BButton, BFormGroup, BFormRadioGroup, BModal, BAlert, BFormInput, BFormTextarea } from "bootstrap-vue";
import Captcha from '../elements/captcha';
import provider from '../../utils/provider';

export default {
    name: 'CreateProfileModal',
    components: {
        BButton, 
        BFormGroup, 
        BFormRadioGroup,
        BModal,
        BAlert,
        BFormInput,
        BFormTextarea,
        Captcha,
    },
    data() {
        return {
            errMessage: null,
            sended: false,
            responseDeleteCode: null,
            captcha: '',
            form: {
                gender: null,
                targetGender: null,
                age: null,
                aboutMe: '',
                aboutTarget: '',
                city: '',
                contacts: '',
            },
            options: {
                gender: [
                    { text: 'Кун', value: 0 },
                    { text: 'Тян', value: 1 },
                ],
                targetGender: [
                    { text: 'Куна', value: 0 },
                    { text: 'Тян', value: 1 },
                    { text: 'Кого угодно', value: 2 },
                ],
            },
            captchaUpdateCount: 0,
        }
    },
    computed: {
        aboutMePlaceholder() {
            if (!Number.isInteger(this.form.gender)) {
                return '';
            }
            return this.form.gender ? 'Я ламповая тяночка...' : 'Я ламповый кунчик...';
        },
        aboutTargetPlaceholder() {
            if (!Number.isInteger(this.form.targetGender)) {
                return '';
            } else if (this.form.targetGender == 2) {
                return 'Ищу хорошего человека...';
            }
            return this.form.targetGender ? 'Ищу хорошую тяночку...' : 'Ищу хорошего кунчика...';
        },
        validForm() {
            return Number.isInteger(this.form.gender) && Number.isInteger(this.form.targetGender) &&
                this.form.aboutMe && this.form.aboutTarget && this.form.age && 
                this.form.city && this.form.contacts;
        },
        checkLength() {
            if (this.form.city.length > 100) {
                return 'Город';
            }
            if (this.form.contacts.length > 100) {
                return 'Контакты';
            }
            if (this.form.aboutMe.length > 5000) {
                return 'Обо мне';
            }
            if (this.form.aboutTarget.length > 5000) {
                return 'О том, кого я ищу';
            }
            return null;
        }
    },
    methods: {
        async createProfile() {
            this.errMessage = null;
            if (!this.validForm) {
                this.errMessage = 'Не все поля заполнены';
                return;
            }
            if (this.checkLength) {
                this.errMessage = `Поле "${this.checkLength}" слишком длинное. Пожалуйста, сократите его.`;
                return;
            }
            if (!this.form.age || this.form.age > 99 || this.form.age < 10) {
                this.errMessage = 'Неправильно указан возраст';
                return;
            }
            if (!this.captcha) {
                this.errMessage = 'Введите числа с картинки';
                return;
            }

            try {
                const form = {
                    ...this.form,
                    captcha: this.captcha,
                };
                const response = await provider.post('/profiles/create', form);
                this.responseDeleteCode = response.data.body;
                this.sended = true;
            } catch(err) {
                this.captchaUpdateCount++;
                const resMessage = err.response.data.message;
                if (resMessage === 'captcha') {
                    this.errMessage = 'Неверная капча';
                } else {
                    this.errMessage = 'Неизвестная ошибка';
                }
            }
        },
        captchaUpdate(val) {
            this.captcha = val;
        }
    }
}
</script>

<style scoped>
.ageBlock input {
    display: inline;
    width: 80px;
}
.cityBlock input {
    display: inline;
    margin: 20px 0;
    width: 50%;
}
.textLabel {
    margin-bottom: 5px;
}
.textareaObj {
    margin-bottom: 30px;
}
.secretCode {
    font-size: 20px;
    font-weight: bold;
}
.captcha {
    margin-top: 30px;
    text-align: center;
}
</style>