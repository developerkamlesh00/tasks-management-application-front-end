<template>
    <div>
        <nav class="navbar">
                    <div class="image">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Simbolo_konoha.svg/1200px-Simbolo_konoha.svg.png">  
                    </div>
                    
                    <div class="home">
                        
                        <router-link to="/">Home</router-link>
                    
                    </div>
                   
                
                    <div class="about">
                        
                        <router-link to="/about">About US</router-link>
                    
                    </div>
                
                  
                    <div class="login">
                        
                        <router-link to="/login">Login</router-link>
                    
                    </div>
                
                  
                   <!-- <div>
                        
                        <router-link to="/register">Register</router-link>
                        
                    </div>
                -->     
        </nav>
    </div>
</template>

<script>

export default {
  
}
</script>

<style scoped>

@import url('https://fonts.googleapis.com/css2?family=Alkatra:wght@500&family=Happy+Monkey&display=swap');
.navbar{
    display: flex;
    justify-content: space-around;
    background: linear-gradient(to bottom, #5b4b57, #85707f);
    height: 70px;
    font-family: 'Alkatra', cursive;
    

}

a{
    text-decoration: none;
    color: whitesmoke;
    font-weight: bolder;
    font-size: larger;
    padding: 15px;
}

a:hover, a:active,
a.router-link-active{
    color: #5b4b57;
    background-color: #f6f1f5;
    border-radius: 10px;
    
}
img{
    height: 50px;
    width: 55px;
    margin-left:40px ;

}

.image{
    flex: 3;
}

.home{
    flex: 1;
}
.about{
    flex: 1;
}
.login{
    flex: 1;
}
</style>