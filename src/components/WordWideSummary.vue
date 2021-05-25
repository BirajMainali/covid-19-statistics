<template>
  <li class="list-group-item mt-3">
    <h5 class="text-dark p-0 m-0">{{ title }}</h5>
    <span class="badge bg-success">{{ count }}</span>
  </li>
</template>

<script>
export default {
  name: "WordWideSummary",
  props: {
    title: String,
    count: Number
  }
}
</script>

<style scoped>

</style>