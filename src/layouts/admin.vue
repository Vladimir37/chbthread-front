<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info">
            <div class="container">
                <b-navbar-nav>
                    <b-nav-item to="/">
                        <b>Главная</b>
                    </b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item v-if="userStatus == 0" to="/admins">Админы</b-nav-item>
                    <b-nav-item to="/profiles">Анкеты</b-nav-item>
                    <b-nav-item @click="logout">Выход</b-nav-item>
                </b-navbar-nav>
            </div>
        </b-navbar>
        <div class="content">
            <router-view/>
        </div>
    </div>
</template>

<script>
import { BNavbar, BNavbarNav, BNavItem } from "bootstrap-vue";
import provider from '../utils/provider';

export default {
    name: 'AdminLayout',
    components: {
        BNavbar, 
        BNavbarNav, 
        BNavItem,
    },
    data() {
        return {
            userStatus: 1,
        };
    },
    mounted() {
        this.getStatus();
    },
    methods: {
        async logout() {
            try {
                await provider.post('/auth/logout');
                this.$router.push({
                    path: '/auth',
                });
            } catch (err) {
                console.log(err);
            }
        },
        async getStatus() {
            try {
                const res = await provider.get('/auth/status');
                this.userStatus = res.data.user.status;
            } catch (err) {
                console.log(err);
            }
        }
    }
}
</script>

<style scoped>
.content {
    margin-top: 50px;
}
.topLink {
    text-decoration: none;
    color: inherit;
}
</style>