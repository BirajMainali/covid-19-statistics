<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid ">
      <a class="navbar-brand  text-white" href="#">Covid-19</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link class="nav-link text-white" to="/">Overview</router-link>
          <router-link class="nav-link text-white" to="/Data">Data</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "TopNavigation"
}
</script>

<style scoped>
.navbar{
}
</style>