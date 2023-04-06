<template>
  <!--  :style="isSidebarExpanded?'width: 8.5rem':'width: 2.5rem' -->
  <div :class="isSidebarExpanded ? 'col-3' : 'col-1'">
    <main>
      <!-- <transition> -->
      <div class="d-flex flex-column flex-shrink-0 p-2 bg-light" v-if="isSidebarExpanded">
        <a href="#" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
          @click="toggleSidebar()">
          <i class="bi bi-speedometer2"></i>
          <span class="fs-4">Task Menu</span>
        </a>
        <hr>
        <ul class="nav nav-pills flex-column mb-auto">
          <slot></slot>
        </ul>
        <hr>
        <div class="dropdown">
          <!-- Profile Picture -->
          <a href="#" class="d-flex align-items-center link-dark text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown" aria-expanded="false">
            <img :src="profile_url" alt="" width="32" height="32" class="rounded-circle me-2">
            <strong>User</strong>
          </a>
          <ul class="dropdown-menu text-small shadow">
            <li><a class="dropdown-item" href="#">New project...</a></li>
            <li><a class="dropdown-item" href="#">Settings</a></li>
            <li><a class="dropdown-item" href="#">Profile</a></li>
            <li>
              <hr class="dropdown-divider">
            </li>
            <li><a class="dropdown-item" href="#">Sign out</a></li>
          </ul>
        </div>
      </div>
      <!-- </transition> -->

      <!-- <transition> -->
      <div class="d-flex flex-column flex-shrink-0 bg-light" style="width: 4.5rem;" v-else>
        <a href="#" class="d-block p-2 link-dark text-decoration-none" title="Icon-only" data-bs-toggle="tooltip"
          data-bs-placement="right" @click="toggleSidebar()">
          <i class="bi bi-speedometer2"></i>
        </a>
        <ul class="nav nav-pills nav-flush flex-column mb-auto text-center">
        <slot name="icons_only"></slot>
        </ul>
        <div class="dropdown border-top">
          <a href="#"
            class="d-flex align-items-center justify-content-center p-2 link-dark text-decoration-none dropdown-toggle"
            data-bs-toggle="dropdown" aria-expanded="false">
            <img
              :src="profile_url"
              alt="mdo" width="24" height="24" class="rounded-circle">
          </a>
          <slot name="additional_links"></slot>
        </div>
      </div>
      <!-- </transition> -->
    </main>

  </div>
</template>


<script>
/* global bootstrap: false */
(() => {
  'use strict'
  const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(tooltipTriggerEl => {
    new bootstrap.Tooltip(tooltipTriggerEl)
  })
})()

export default {
  props:['profile_url'],
  data() {
    return {
      isSidebarExpanded: false
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarExpanded = !this.isSidebarExpanded;
    }
  }
}
</script>

<style scoped>
.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, .1);
  border: solid rgba(0, 0, 0, .15);
  border-width: 1px 0;
  box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
}

.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}

.bi {
  vertical-align: -.125em;
  fill: currentColor;
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}


main {
  height: 100vh;
  height: -webkit-fill-available;
  max-height: 100vh;
  overflow-x: auto;
  overflow-y: hidden;
}

.dropdown-toggle {
  outline: 0;
}

.btn-toggle {
  padding: .25rem .5rem;
  font-weight: 600;
  color: rgba(0, 0, 0, .65);
  background-color: transparent;
}

.btn-toggle:hover,
.btn-toggle:focus {
  color: rgba(0, 0, 0, .85);
  background-color: #d2f4ea;
}

.btn-toggle::before {
  width: 1.25em;
  line-height: 0;
  content: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='rgba%280,0,0,.5%29' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M5 14l6-6-6-6'/%3e%3c/svg%3e");
  transition: transform .35s ease;
  transform-origin: .5em 50%;
}

.btn-toggle[aria-expanded="true"] {
  color: rgba(0, 0, 0, .85);
}

.btn-toggle[aria-expanded="true"]::before {
  transform: rotate(90deg);
}

.btn-toggle-nav a {
  padding: .1875rem .5rem;
  margin-top: .125rem;
  margin-left: 1.25rem;
}

.btn-toggle-nav a:hover,
.btn-toggle-nav a:focus {
  background-color: #d2f4ea;
}

.scrollarea {
  overflow-y: auto;
}
</style>