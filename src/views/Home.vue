<template>
  <div>
    <h1 class="home">Home Screen</h1>
  </div>
</template>

<script>
export default {
  name: "Home",
  created() {
    document.title = 'Home'
  },
}
</script>

<style>
.home {
  height: 1000px;
  text-align: center;
  padding-top: 250px;
}
</style>