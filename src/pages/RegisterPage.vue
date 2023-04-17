<template>
    <div>
        <h2>Register</h2>
        <button class="btn btn-primary" @click="userRegister(true)">Register</button>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    methods:{
        ...mapActions(['login']),
        userRegister(validation_passed){
            if(validation_passed){
                // Create new organization and director account
                //login this user
                this.login()
                // show director dashboard page
                this.$router.push({name:'dashboard',params:{user_type:'director'}})
            }
        }
    }
}
</script>