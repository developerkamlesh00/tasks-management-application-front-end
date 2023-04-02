<template> 
<div class="login-page">
    <div class="form">
      <div class="title">Welcome</div>
      <div class="subtitle">Let's signin to your account!</div>
      
      <div class="input-container ic1">
        <input id="name" class="input" type="text" placeholder="Name"/>
        <div class="cut"></div>
        <label for="user" class="placeholder">First name</label>
      </div>
      
      <div class="input-container ic2">
        <input id="password" class="input" type="password" placeholder="Password" />
        <div class="cut"></div>
        <label for="password" class="placeholder">Password</label>
      </div>
      
      <button type="text" class="submit">submit</button>
    </div>

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

<style scoped>


.login-page {
  align-items: center;
  background-color: whitesmoke;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-image: url("https://img.freepik.com/free-vector/white-abstract-background-design_23-2148825582.jpg?size=626&ext=jpg&ga=GA1.2.704438712.1680255261&semt=sph");
  background-repeat: no-repeat;
  background-size: cover;
}

.form {
  margin: 50px auto;
  background-color: #15172b;
  border-radius: 20px;
  box-sizing: border-box;
  height: 559px;
  padding: 20px;
  width: 419px;
  margin-top: 22px;
}

.title {
  color: #eee;
  font-family: sans-serif;
  font-size: 36px;
  font-weight: 600;
  margin-top: 60px;
}

.subtitle {
  color: #eee;
  font-family: sans-serif;
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
}

.input-container {
  height: 50px;
  position: relative;
  width: 100%;
}

.ic1 {
  margin-top: 40px;
}

.ic2 {
  margin-top: 30px;
}

.input {
  background-color: #303245;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  font-size: 18px;
  height: 100%;
  outline: 0;
  padding: 4px 20px 0;
  width: 100%;
}

.cut {
  background-color: #15172b;
  border-radius: 10px;
  height: 20px;
  left: 20px;
  position: absolute;
  top: -20px;
  transform: translateY(0);
  transition: transform 200ms;
  width: 76px;
}

.cut-short {
  width: 50px;
}

.input:focus ~ .cut,
.input:not(:placeholder-shown) ~ .cut {
  transform: translateY(8px);
}

.placeholder {
  color: #65657b;
  font-family: sans-serif;
  left: 20px;
  line-height: 14px;
  pointer-events: none;
  position: absolute;
  transform-origin: 0 50%;
  transition: transform 200ms, color 200ms;
  top: 20px;
}

.input:focus ~ .placeholder,
.input:not(:placeholder-shown) ~ .placeholder {
  transform: translateY(-30px) translateX(10px) scale(0.75);
}

.input:not(:placeholder-shown) ~ .placeholder {
  color: #808097;
}

.input:focus ~ .placeholder {
  color: #dc2f55;
}

.submit {
  background-color: #08d;
  border-radius: 12px;
  border: 0;
  box-sizing: border-box;
  color: #eee;
  cursor: pointer;
  font-size: 18px;
  height: 50px;
  margin-top: 38px;
  text-align: center;
  width: 100%;
}

.submit:active {
  background-color: #06b;
}

</style>