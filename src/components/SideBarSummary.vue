<script>
import axios from "axios";
import WordWideSummary from "./WordWideSummary";

export default {
  name: "SideBarSummary",
  components: {
    WordWideSummary
  },
  data: () => ({
    DailyReportTotals: {}
  }),
  methods: {
    async getDailyReportTotals() {
      try {
        return await axios(`https://api.covid19api.com/summary`);
      } catch (e) {
        console.log(e);
      }
    },
    renderDailyReportTotals(infos) {
      this.DailyReportTotals = infos
    },
    async loadDailyReportTotals() {
      const res = await this.getDailyReportTotals();
      return this.renderDailyReportTotals(res.data.Global);
    },
  },
  async mounted() {
    await this.loadDailyReportTotals();
  },
};
</script>
<template>
  <div class="col-3">
    <div class="card">
      <div class="card-header side-header">
        <h5 class="card-title ">WorldWide Summary</h5>
      </div>
      <div class="card-body px-0">
        <ul class="list-group list-group-flush text-start side-summary">
          <WordWideSummary title="New Confirmed" :count="DailyReportTotals.NewConfirmed"/>
          <WordWideSummary title="Total Confirmed" :count="DailyReportTotals.TotalConfirmed"/>
          <WordWideSummary title="New Death's" :count="DailyReportTotals.NewDeaths"/>
          <WordWideSummary title="Total Death's" :count="DailyReportTotals.TotalDeaths"/>
          <WordWideSummary title="New Recovered" :count="DailyReportTotals.NewRecovered"/>
          <WordWideSummary title="Total Recovered" :count="DailyReportTotals.TotalRecovered"/>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  padding: 20px;
  border-radius: 20px;
  margin-left: 5px;
}

.card-header {
  background-color: white;
}

li {
  font-size: 18px;
}

h5 {
  float: left;
  font-size: 16px;
  font-weight: 600;
}

span {
  font-size: 14px;
  float: right;
}
</style>
