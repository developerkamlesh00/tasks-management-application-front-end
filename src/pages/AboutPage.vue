<template>
<div class="about-page">
    <h1>Our Team</h1>
    <div class="card mentor">
        <h2 class="card-title">Sanghamitra</h2>
        <h3>Mentor</h3>
        <img
            src="https://media.licdn.com/dms/image/D4D03AQGRl9IHCENGeA/profile-displayphoto-shrink_100_100/0/1673202273687?e=1685577600&v=beta&t=o7WfIy8R8Fjbq_QQwfcCOieB_jZTxVHx3FMC-PFWGrk">
    </div>
    <div class="team row">
        <div class="card col-lg-3 col-sm-6 mb-3">
            <h2 class="card-title">Vrutik</h2>
            <h3>dfsf dfs df</h3>
            <img class="mx-auto d-block" 
                src="https://pps.whatsapp.net/v/t61.24694-24/322994937_183801120940518_9036079215619264017_n.jpg?ccb=11-4&oh=01_AdTR473bAddddK4Ryb3a3fr3g3P5nJ_RMg2Cj_ypJAvhuw&oe=6433AF63">
        </div>
        <div class="card col-lg-3 col-sm-6 mb-3">
            <h2 class="card-title">Navrachit Kulshrestha</h2>
            <h3>dfsf dfs df</h3>
            <img class="mx-auto d-block" 
                src="https://media.licdn.com/dms/image/C4D03AQGQMzm2bu903Q/profile-displayphoto-shrink_400_400/0/1651483930029?e=1685577600&v=beta&t=9LrkAQ2lUSVol_WG96Sai_Lqjpex_pbbF7wd046irEk">
        </div>
        <div class="card col-lg-3 col-sm-6 mb-3">
            <h2 class="card-title">Mayank Walia</h2>
            <h3>dfsf dfs df</h3>
            <img class="mx-auto d-block" 
                src="https://media.licdn.com/dms/image/D4D03AQHnW232mBpbBA/profile-displayphoto-shrink_400_400/0/1675358311212?e=1685577600&v=beta&t=GuSeHuXk9yJof9PFdkP8cGzAVz4cApsuQBXE7dmVv-U">
        </div>
        <div class="card col-lg-3 col-sm-6 mb-3">
            <h2 class="card-title">Kamlesh</h2>
            <h3>dfsf dfs df</h3>
            <img class="mx-auto d-block" 
                src="https://media.licdn.com/dms/image/D5603AQGc2zK5zlOBxg/profile-displayphoto-shrink_400_400/0/1673953331915?e=1685577600&v=beta&t=1G1F_JgRnMJKcEzqMcRmP0vy8Yw4EsRFYId6mLDoSBE">
        </div>
    </div>

</div>


</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&display=swap');

.text-white {
    color: black;
    font-family: "Sofia", sans-serif;
}

a {
    color: #CD5C5C;
    font-weight: bold;
    font-size: 30px;
    font-family: "Sofia", sans-serif;
}

h1 {
    text-align: center;
}

h2 {
    font-weight: bolder;
    /* font-size: 35px; */
    color: #1E5162;
}

h3 {
    color: red;
}

img {
    height: 200px;
    width: 200px;
    border-radius: 50%;
    border: 4px solid goldenrod;
}

.about-page {
    background-image: url("https://media.istockphoto.com/id/1367756031/vector/light-blue-watercolor-background-illustration.jpg?s=612x612&w=0&k=20&c=qiJl7j-2terwHd-1YJxiFIo1VJx6l6IsmoqlgeypQ7c=");
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