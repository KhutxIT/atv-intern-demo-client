<template>
  <nav class="navbar-default navbar-side" role="navigation">
    <div class="sidebar-collapse">
        <ul class="nav" id="main-menu">
            <li class="text-center"><img src="../assets/admin/img/find_user.png"
                                         class="user-image img-responsive" /></li>
            <li v-for="element in slidebarList" :key="element.name">
              <router-link :class="element.routerLinkClass" :to="element.link">
                <i :class="element.class"></i>
                {{ element.name }}
              </router-link>
            </li>
        </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'ManagementSidebar',
  props: {
    slidebarList: {
      type: Array,
      required: true
    }
  }
}
</script>
