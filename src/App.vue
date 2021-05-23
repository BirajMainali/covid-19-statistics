<script>
import TopNavigation from "./components/TopNavigation";
export default {
  name:"App",
  components:{
  TopNavigation
}
}
</script>
<template>
  <TopNavigation/>
  <router-view/>
</template>

<style>
@import "assets/Custom/style.css";
</style>
