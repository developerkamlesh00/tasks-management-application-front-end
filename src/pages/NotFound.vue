<template>
    <section class="page_404 p-0 rounded-5">
        <div class="container ">
            <div class="row">
                <div class="col-sm-12">
                    <div class="text-center">
                        <div class="mt-3 four_zero_four_bg">
                            <h1 class="text-center ">404</h1>
                        </div>
                        <div class="contant_box_404">
                            <h3 class="h2">
                                Look like you're lost
                            </h3>
                            <em>The page you are looking for not available!</em>
                            <hr/>
                            <router-link to="/" class="btn link_404">Go to Home</router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.page_404 {
    margin: 0px 100px;
    padding: 40px 0;
    background:#ffffff;
    font-family: 'Arvo', serif;
}

.page_404 img {
    width: 100%;
}

.four_zero_four_bg {
    background-image: url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif);
    height: 500px;
    /* background-position: center; */
}


.four_zero_four_bg h1 {
    font-size: 80px;
}

.four_zero_four_bg h3 {
    font-size: 80px;
}

.link_404 {
    color: #fff;
    padding: 10px 20px;
    background: #39ac31;
    margin: 20px 0;
    display: inline-block;
}

.contant_box_404 {
    /* margin-top: -50px; */
}
</style>