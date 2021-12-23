<template>
  <h1>{{ blogTitle }}</h1>
</template>

<script>
import { h } from 'vue';

export default {
  name: 'test',
  render() {
    return h(
      'h3', 
      this.blogTitle
    )
  },
  props: {
    blogTitle: {
      type: String,
      required: true
    }
  }
}
</script>