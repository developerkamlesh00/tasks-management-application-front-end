<template>
  <div>
    <b-nav vertical class="bg-light">
      <b-nav-item active>Dashboard</b-nav-item>
      <b-nav-item>Users</b-nav-item>
      <b-nav-item>Products</b-nav-item>
      <b-nav-item>Settings</b-nav-item>
    </b-nav>
    <div class="ml-3">
      <h1>Welcome to the Admin Dashboard</h1>
      <p>Here you can manage your site's content and settings.</p>
    </div>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Dashboard',
}
</script>

<style scoped>
/* add your custom dashboard styles here */
.b-nav {
  background-color: #f8f9fa;
  width: 200px;
}

</style>
