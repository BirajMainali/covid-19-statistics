<template>
  <li class="list-group-item mt-3">
    <h7 class="text-dark p-0 m-0">{{ title }}</h7> &nbsp;&nbsp;&nbsp;
    <span class="badge bg-info text-white">{{ count }}</span>
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