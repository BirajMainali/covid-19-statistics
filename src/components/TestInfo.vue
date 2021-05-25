<template>
  <div class="card p-0 mb-3">
    <div class="card-header">
      <strong class="card-title">{{ title }}</strong>
    </div>
    <div class="card-body px-0 pt-0">
      <table class="table table-border table-hover mb-0">
        <tbody>
        <tr>
          <td>Test Per Million</td>
          <td class="text-end">{{ testInfo["1M_pop"] }}</td>
        </tr>
        <tr>
          <td>Total</td>
          <td class="text-end">{{ testInfo.total }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TestInfo.vue",
  props: {
    title: String,
    testInfo: Object
  }
}
</script>
<style scoped>
.card-header {
  background-color: #f2f2f2;
  border-radius: 15px 15px 0 0;
}
</style>