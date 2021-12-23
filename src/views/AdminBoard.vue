<template>
  <div>
    <MagagementSidebar :slidebarList="getSlidebarList()" />
    <router-view></router-view>
  </div>
</template>

<script>
import MagagementSidebar from '../components/ManagementSidebar.vue';
import { AdminSideBar } from '../common/sidebar.type';

export default {
  name: "AdminBoard",
  created() {
    document.title = 'Admin Board'
  },
  components: {
    MagagementSidebar
  },
  methods: {
    getSlidebarList() {
      return AdminSideBar;
    }
  }
}
</script>

<style>
@import '../assets/admin/css/bootstrap.css';
@import '../assets/admin/css/font-awesome.css';
@import '../assets/admin/js/morris/morris-0.4.3.min.css';
@import '../assets/admin/css/custom.css';
@import '../assets/admin/css/additions.css';
@import '../assets/admin/js/dataTables/dataTables.bootstrap.css';
</style>