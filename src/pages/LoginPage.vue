<template>
    <div>
        <h2>Login</h2>
        <button class="btn btn-primary" @click="userLogin(true)">Login</button>

    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    methods:{

        ...mapActions(['login']),
        userLogin(validation_passed){
            if(validation_passed){
                //login this user
                this.login()
                // show his dashboard page
                this.$router.push({name:'dashboard',params:{user_type:'worker'}})
            }
        }
    }
}
</script>