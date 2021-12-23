<template>
  <div>
    <ManagementSidebar :slidebarList="getSlidebarList()" />
    <router-view :offworks="offworks"></router-view>
  </div>
</template>

<script>
import ManagementSidebar from '../components/ManagementSidebar.vue';
import OffworkService from '../services/offwork.service';
import { EmployeeSideBar } from '../common/sidebar.type';

export default {
  name: "EmployeeBoard",
  components: {
    ManagementSidebar
  },
  data() {
    return {
      offworks: [],
      errors: null,
    }
  },
  created() {
    document.title = 'Employee Board'
  },
  mounted() {
    OffworkService.getAllOffWork()
      .then(offworks => {
        let offworksFormat = [];
        for (let offwork of offworks.data) {
          if (offwork.end_off_date) {
            offworksFormat.push({
              title: 'Xin nghỉ',
              start: offwork.start_off_date,
              end: offwork.end_off_date,
              id: offwork.id
            });
          }
          else {
            offworksFormat.push({
              title: 'Xin nghỉ',
              date: offwork.start_off_date,
              id: offwork.id
            });
          }
        }
        this.offworks = offworksFormat;
        localStorage.setItem('offworks', JSON.stringify(offworksFormat));
      })
      .catch(errs => {
        this.errors = errs;
      });
  },
  methods: {
    getSlidebarList() {
      return EmployeeSideBar;
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