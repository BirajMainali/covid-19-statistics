<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid ">
      <router-link class="Navbar-brand  text-white" to="/">Covid-19</router-link>
      <button aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"
              data-bs-target="#navbarNavAltMarkup" data-bs-toggle="collapse" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div id="navbarNavAltMarkup" class="collapse navbar-collapse">
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