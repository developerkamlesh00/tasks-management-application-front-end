<template>
    <div>Header
        <nav class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
                <router-link class="navbar-brand" :to="{ name: 'home' }">Home</router-link>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-if="!isLoggedIn">
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{ name: 'about' }">About Us</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{ name: 'login' }">Login</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link class="nav-link" :to="{ name: 'register' }">Register</router-link>
                        </li>
                    </ul>
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-else>
                        <li class="nav-item">
                            <a class="nav-link" @click="logout()" >Logout</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
export default {
    computed:{
        ...mapGetters({
			isLoggedIn: 'isAuthenticated',
		})
    },
    methods:{
        ...mapActions(['logout'])
    }
}
</script>