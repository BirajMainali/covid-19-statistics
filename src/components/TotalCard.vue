<template>
  <div class="card p-0 mb-3">
    <div class="card-header">
      <h4 class="card-title">{{ title }}</h4>
    </div>
    <div class="card-body">
      <div class="row">
        <div class="col text-center">
          <h1 :class="info">
            {{ count }}
          </h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TotalCard",
  props: {
    title: String,
    count: Number,
    info: String,
  },
};
</script>

<style scoped>
.card-header {
  background-color: #f2f2f2;
  border-radius: 15px 15px 0 0;
}
</style>
