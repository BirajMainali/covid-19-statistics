<template>
  <div class="mt-3 mx-auto">
    <div class="row">
      <SideBarSummary/>
      <Details/>
    </div>
  </div>
</template>

<script>
import SideBarSummary from "../components/SideBarSummary";
import Details from "../components/Details";

export default {
  name: 'Home',
  components: {
    SideBarSummary,
    Details
  }
}
</script>
