<template>
  <div class="row">
    <admin-sidebar></admin-sidebar>
    <div class="col-md-9 h-100" >
      <!-- rest of your code here -->
    </div>
  </div>
</template>

<script>
import AdminSidebar from "@/components/admin/AdminSidebar.vue";

export default {
  components: {
    AdminSidebar,
  },
};
</script>
