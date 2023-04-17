<template>
<div class="about-page">
    <h1>Our Team</h1>
    <!-- Mentors -->
    <div class="row">
        <div class="card mentor col-6">
            <h2 class="card-title">Girish</h2>
            <h3>Mentor</h3>
            <img
            src="../assets/profiles/gir.png">
        </div>
        <div class="card mentor col-6">
            <h2 class="card-title">Sachin</h2>
            <h3>Mentor</h3>
            <img
            src="../assets/profiles/sac.png">
        </div>
    </div>

    <!-- Team Members -->
    <div class="team row">
        <div class="card col-lg-3 col-sm-6 mb-3">
            <h2 class="card-title">Kamlesh</h2>
            <img class="mx-auto d-block" 
                src="../assets/profiles/kam.jpg">
        </div>
        <div class="card col-lg-3 col-sm-6 mb-3">
            <h2 class="card-title">Mayank</h2>
            <img class="mx-auto d-block" 
                src="../assets/profiles/may.jpg">
        </div>
        <div class="card col-lg-3 col-sm-6 mb-3">
            <h2 class="card-title">Navrachit</h2>
            <img class="mx-auto d-block" 
                src="../assets/profiles/nav.jpg">
        </div>
        <div class="card col-lg-3 col-sm-6 mb-3">
            <h2 class="card-title">Vrutik</h2>
            <img class="mx-auto d-block" 

            src="../assets/profiles/vru.png">

        </div>
    </div>

</div>


</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap');

a {
    font-weight: bold;
    font-size: 30px;
    font-family: "Sofia", sans-serif;
}

h1 {
    text-align: center;
}

h2 {
    font-weight: bolder;
    color: whitesmoke;
}

h3 {
    color: rgb(30, 0, 166);
}

img {
    height: 200px;
    width: 200px;
    border-radius: 50%;
    border: 4px solid  hsl(311deg 100% 86%)
}

.about-page {
    background: transparent;
    background-size:cover;
    font-family: 'Dancing Script', cursive;
}

.mentor {
    margin: 0 auto;
    width: 230px;
    text-align: center;
    margin-bottom: 30px;
}

.team {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    margin-bottom: 30px;
}

.card{
    background-color: transparent;
    border: none;
}
</style>