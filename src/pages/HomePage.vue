<template>

<div class="home-page">
    <div class="static1">
        <h1>Join over 700 million registered users who trust TaskCRM</h1>
        <p>Easy to use, reliable, private, and secure. It’s no wonder TaskCRM is the choice for creating and distributing your most important Tasks.</p>
        <button>Register Your Company</button>
    </div>

    
    <!--<img class="image1" src="https://i.guim.co.uk/img/media/43994bd821ad6936b200f0812d67800eb8f66bf8/0_336_1694_1017/master/1694.jpg?width=1200&height=900&quality=85&auto=format&fit=crop&s=8d75b671f6ec2c366fe42fb5f6880cb2">
    -->
    <div class="video-wrapper">
    <video width="640" height="480" controls>
        <source src="assets/vid1.mp4" type="video/mp4" />
        <source src="movie.ogg" type="video/ogg" />
    </video>
    </div>
    <h1 style="text-align: center;">See what sets TaskCRM apart</h1>
    <div class="properties">
        <div class="card-wrap">
            <h3>Property1</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque enim laborum aperiam labore exercitationem, quam ipsa eius! Laborum, repudiandae iure.</p>
        </div>
        <div class="card-wrap">
            <h3>Property2</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione praesentium, rem aspernatur eius consequuntur voluptate obcaecati eaque omnis quis laboriosam?</p>
        </div>
        <div class="card-wrap">
            <h3>Property3</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut recusandae minima repellendus ab. Nostrum id dicta exercitationem corporis. Id, fugiat.</p>
        </div>
        <div class="card-wrap">
            <h3>Property4</h3>
            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Autem soluta vel minima unde accusamus sapiente velit culpa totam molestias beatae!</p>
        </div>
    </div>
    
    <footer style="margin-top: 25px;">

<div>
    <p>All Rights Reserved</p>
</div>
<div>
    <p>Privacy Policy</p>        
</div>

</footer>

</div>


</template>

<script>

</script>

<style scoped>
.home-page{
    font-family: "Proxima Nova", sans-serif;
    font-size: 16.67px;
    line-height: 1.42857;
    color:#766270;
    background-color: #f6f1f5;
    width: 100%;
}
.video-wrapper{

border: 2px solid goldenrod;
background-image: url("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-S4KJxtyd0TdS2P87WjvMKJ6g3yJI9ZS9FQ&usqp=CAU");
}
.card-wrap{
    padding: 40px 30px;
    position: relative;
    overflow: hidden;
    background-color: white;
    border-radius: 5px;
    /*-webkit-box-shadow: 0px 0px 12.75px 2.25px rgba(0, 0, 0, 0.05);*/
    box-shadow: 0px 0px 12.75px 2.25px rgba(0, 0, 0, 0.05);
}
.static1{
    display: flex;
    flex-direction: column;
    width: 800px;
    margin: 0 auto;
    padding-top: 40px;
    text-align: center;
    align-items: center;
    margin-bottom: 20px;
}
.image1{  
    padding-top: 80px;
    display: block;
    margin:0 auto;
    height: 400px;
    width: 400px;
    margin-bottom: 30px;
}
video{
    padding-top: 40px;
    display: block;
    margin:0 auto;
    margin-bottom: 30px;
    opacity: 1;
} 
.image1 > *{
    padding: 15px 0;
}

.properties{

    display: flex;
    margin-top: 50px;
    justify-content: space-around;

}

.properties > div{

width: 300px;

}
button{

    width: fit-content;
    background-color: #7fada1;
    color: #FFF;
    padding: 15px;
    border-radius: 10px;
    border: none;
}

footer{

    display: flex;
    justify-content: center;
    align-items: center;
    height: 80px;
    background-color: azure;
}

footer > div{

    padding: 10px 40px;
}


</style>

