<template>
  <div class="homepage bgDark">
    <div class="container">
    <div class="static1">
      <h1>Tasker brings all your tasks, teammates, and tools together</h1>
      <p>
        Keep everything in the same place—even if your team isn't.
      </p>
      <div v-if="!isAuthenticated" >
        <router-link to="/orgregister" class="btn blue">Sign up - it's free!</router-link>
        <br/>
        <small>Register your organization now!</small>
        <hr/>
      </div>
    </div>

    <!-- Carousel -->
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="../assets/images/p1.webp" class="d-block w-50 mx-auto" data-bs-interval="1000" alt="...">
    </div>
    <div class="carousel-item">
      <img src="../assets/images/p2.webp" class="d-block w-50 mx-auto" data-bs-interval="1000" alt="...">
    </div>
    <div class="carousel-item">
      <img src="../assets/images/p3.webp" class="d-block w-50 mx-auto" data-bs-interval="1000" alt="...">
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>

    <!-- Application Features -->
    <div class="row row-cols-1 row-cols-md-2 align-items-md-center g-5 py-5">
      <div class="d-flex flex-column align-items-start gap-2">
        <h3 class="fw-bold">HIT DEADLINES EVERY TIME</h3>
        <p >From weekly sprints to annual planning, Timeline view keeps all tasks on track. Quickly get a glimpse of what's coming down the pipeline and identify any gaps that might impede your team's progress.</p>
      </div>
      <div class="row row-cols-1 row-cols-sm-2 g-4">
        <div class="d-flex flex-column gap-2">
          <div
            class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
            <i class="bi bi-kanban"></i>
          </div>
          <h4 class="fw-semibold mb-0">Project Management</h4>
          <p>Keep tasks in order, deadlines on track, and team members aligned with Trello.</p>
        </div>

        <div class="d-flex flex-column gap-2">
          <div
            class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
            <i class="bi bi-list-task"></i>
          </div>
          <h4 class="fw-semibold mb-0">Manage Tasks</h4>
          <p >Say goodbye to sticky notes and to-do lists: Trello allows teams of any size to easily manage tasks and hit deadlines - all without ever leaving the app.</p>
        </div>

        <div class="d-flex flex-column gap-2">
          <div
            class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
            <i class="bi bi-alarm-fill"></i>
          </div>
          <h4 class="fw-semibold mb-0">Assign tasks and manage deadlines</h4>
          <p >Tasker's advanced checklists give you the power to add more context to your tasks by assigning team members and due dates to checklist items, increasing visibility and keeping your team accountable.</p>
        </div>

        <div class="d-flex flex-column gap-2">
          <div
            class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
            <i class="bi bi-emoji-smile-fill"></i>
          </div>
          <h4 class="fw-semibold mb-0">STAY ON TOP OF TASKS</h4>
          <p >Start each day without any surprises. Whether scheduling an editorial calendar or staying on top of to-dos, Calendar view is like a crystal ball giving you a clear vision of what work lies ahead.</p>
        </div>
      </div>
    </div>
    <!-- Carousel 2 -->
    <div>
    <div id="carouselIndicators" class="carousel slide" data-bs-ride="true">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="0" class="active"
          aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="1"
          aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to="2"
          aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="../assets/images/task1.png" class="d-block w-50 mx-auto" alt="...">
        </div>
        <div class="carousel-item">
          <img src="../assets/images/task2.png" class="d-block w-50 mx-auto" alt="...">
        </div>
      
        <div class="carousel-item">
          <img src="../assets/images/task3.png" class="d-block w-50 mx-auto" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselIndicators"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselIndicators"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>       
  </div>

    <!-- More Features -->
    <div class="row text-dark p-2">
      <div class="card card1 col-lg-2.7 col-sm-5  rounded-5 my-2 p-2 mx-auto">
        <div class="card-body ">
          <h5 class="card-title">Get actionable insights with Dashboard</h5>
          <p class="card-text">Bring a bird's-eye view to projects and processes with Dashboard so that you can manage workloads and prevent bottlenecks before they begin.</p>
        </div>
      </div>
      <div class="card card1 col-lg-2.7 col-sm-5  rounded-5 my-2 p-2 mx-auto">
        <div class="card-body ">
          <h5 class="card-title">See it like a spreadsheet with Table</h5>
          <p class="card-text">View your work in a convenient spreadsheet-styled list that can be sorted and filtered to drill down to exactly the cards you need to see.</p>
        </div>
      </div>
      <div class="card card1 col-lg-2.7 col-sm-5  rounded-5 my-2 p-2 mx-auto">
        <div class="card-body ">
          <h5 class="card-title">Track Progress</h5>
          <p class="card-text">Add visual widgets for team members, tasks, sprints, time tracking, statuses, docs, embeds, and more.</p>
        </div>
      </div>
      <div class="card card1 col-lg-2.7 col-sm-5  rounded-5 my-2 p-2 mx-auto">
        <div class="card-body ">
          <h5 class="card-title">Visualize & Plan</h5>
          <p class="card-text">Manage any project from start to finish with highly customizable views that make project planning a breeze.</p>
        </div>
      </div>
    </div>
  </div>
</div>
    
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
};

</script>


<style scoped>
a{
  width: 400px;
  height: 50px;
  text-align: center;
  font-size: 25px;
}
.homepage {
  /* background: linear-gradient(60deg, rgb(82, 67, 170), rgb(237, 80, 180)) 0% 0% / auto repeat scroll padding-box border-box rgb(82, 67, 170); */
  /* background: linear-gradient(0deg, rgb(159, 242, 253), rgb(129, 196, 255)) 0% 0% / auto repeat scroll padding-box border-box rgb(178, 212, 255); */
  /* font-family: "Proxima Nova", sans-serif; */
  font-family: var("Charlie Display",sans-serif);
  /* font-size: 16.67px; */
  /* line-height: 1.42857; */
  color: #ffffff;
  /* background-color: #f6f1f5; */
  /* width: 100%; */
}

.card-wrap {
  padding: 40px 30px;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  /*-webkit-box-shadow: 0px 0px 12.75px 2.25px rgba(0, 0, 0, 0.05);*/
  box-shadow: 0px 0px 12.75px 2.25px rgba(0, 0, 0, 0.05);
}

.static1 {
  display: flex;
  flex-direction: column;
  /* width: 800px; */
  margin: 0 auto;
  padding-top: 40px;
  text-align: center;
  align-items: center;
  margin-bottom: 20px;
}

.image1 {
  padding-top: 80px;
  display: block;
  margin: 0 auto;
  height: 400px;
  width: 400px;
  margin-bottom: 30px;
}

video {
  padding-top: 40px;
  display: block;
  margin: 0 auto;
  margin-bottom: 30px;
  opacity: 1;
}

.image1>* {
  padding: 15px 0;
}

.properties {
  display: flex;
  margin-top: 50px;
  justify-content: space-around;
}

.properties>div {
  width: 300px;
}


footer {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  background-color: azure;
}

footer>div {
  padding: 10px 40px;
}
.feature-icon {
  width: 4rem;
  height: 4rem;
  border-radius: .75rem;
}

.icon-link > .bi {
  margin-top: .125rem;
  margin-left: .125rem;
  fill: currentcolor;
  transition: transform .25s ease-in-out;
}
.icon-link:hover > .bi {
  transform: translate(.25rem);
}

.icon-square {
  width: 3rem;
  height: 3rem;
  border-radius: .75rem;
}

.text-shadow-1 { text-shadow: 0 .125rem .25rem rgba(0, 0, 0, .25); }
.text-shadow-2 { text-shadow: 0 .25rem .5rem rgba(0, 0, 0, .25); }
.text-shadow-3 { text-shadow: 0 .5rem 1.5rem rgba(0, 0, 0, .25); }

.card-cover {
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}

.feature-icon-small {
  width: 3rem;
  height: 3rem;
}

</style>
