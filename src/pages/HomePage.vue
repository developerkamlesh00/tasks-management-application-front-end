<template>
  <div class="homepage bgDark">
    <div class="container">
    <div class="static1">
      <h1>Tasker: Bring Your Tasks, Teammates, and Tools Together for Seamless Collaboration</h1>
      <p>
        Stay organized and connected with Tasker, no matter where your team is located.
      </p>
      <div v-if="!isAuthenticated" >
        <router-link to="/orgregister" class="btn blue">Sign up - it's free!</router-link>
        <br/>
        <small>Register your organization now!</small>
        <hr/>
      </div>
    </div>

    <!-- Carousel 1 -->
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
        <h3 class="fw-bold">Stay On Track with Timeline View</h3>
        <p >Whether you're working on weekly sprints or annual planning, Timeline View ensures that all your tasks are on track and deadlines are met. With a quick glance, you can see what's coming up and identify any potential obstacles that could slow down your team's progress. Keep your projects moving forward and hit deadlines every time with Timeline View.</p>
      </div>
      <div class="row row-cols-1 row-cols-sm-2 g-4">
        <div class="d-flex flex-column gap-2">
          <div
            class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
            <i class="bi bi-kanban"></i>
          </div>
          <h4 class="fw-semibold mb-0">Project Management</h4>
          <p>Streamline your projects with Tasker – keep your team aligned, tasks in order, and deadlines on track.</p>
        </div>

        <div class="d-flex flex-column gap-2">
          <div
            class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
            <i class="bi bi-list-task"></i>
          </div>
          <h4 class="fw-semibold mb-0">Manage Tasks</h4>
          <p >Easily manage tasks and meet deadlines with Tasker - no more sticky notes or to-do lists needed. All within the app, for teams of any size.</p>
        </div>

        <div class="d-flex flex-column gap-2">
          <div
            class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
            <i class="bi bi-alarm-fill"></i>
          </div>
          <h4 class="fw-semibold mb-0">Assign tasks and manage deadlines</h4>
          <p >Boost task management with Tasker's checklists. Assign deadlines and team members for accountability and visibility.</p>
        </div>

        <div class="d-flex flex-column gap-2">
          <div
            class="feature-icon-small d-inline-flex align-items-center justify-content-center text-bg-primary bg-gradient fs-4 rounded-3">
            <i class="bi bi-emoji-smile-fill"></i>
          </div>
          <h4 class="fw-semibold mb-0">STAY ON TOP OF TASKS</h4>
          <p >Stay on top of your workload with Tasker's Calendar view. Plan your day and schedule tasks ahead of time to avoid surprises and stay productive.</p>
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
          <p class="card-text">Manage your projects and processes effectively with Tasker's Dashboard. Get a bird's-eye view of your team's workload, identify bottlenecks and take action to prevent delays.</p>
        </div>
      </div>
      <div class="card card1 col-lg-2.7 col-sm-5  rounded-5 my-2 p-2 mx-auto">
        <div class="card-body ">
          <h5 class="card-title">Organize your work with Table view</h5>
          <p class="card-text">Tasker's Table view provides a spreadsheet-styled list that helps you visualize and organize your work. With the ability to sort and filter, you can easily drill down to the specific tasks and cards that require your attention.</p>
        </div>
      </div>
      <div class="card card1 col-lg-2.7 col-sm-5  rounded-5 my-2 p-2 mx-auto">
        <div class="card-body ">
          <h5 class="card-title">Visualize Progress</h5>
          <p class="card-text">Visualize your progress with widgets for tasks, team members, sprints, time tracking, statuses, documents, and more..</p>
        </div>
      </div>
      <div class="card card1 col-lg-2.7 col-sm-5  rounded-5 my-2 p-2 mx-auto">
        <div class="card-body ">
          <h5 class="card-title">Project Planning Made Easy</h5>
          <p class="card-text">With highly customizable views, Tasker makes it easy to manage any project from start to finish. Visualize and plan with confidence, knowing that you have the tools to customize your workflow and get the job done efficiently.</p>
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
  font-family: var("Charlie Display",sans-serif);
  color: #ffffff;
}

.card-wrap {
  padding: 40px 30px;
  position: relative;
  overflow: hidden;
  border-radius: 5px;
  box-shadow: 0px 0px 12.75px 2.25px rgba(0, 0, 0, 0.05);
}

.static1 {
  display: flex;
  flex-direction: column;
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
