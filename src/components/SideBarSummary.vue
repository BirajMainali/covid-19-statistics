<script>
import axios from "axios";

export default {
  name: "SideBarSummary",
  data() {
    return {
      DailyReportTotals: {
        NewConfirmed: '',
        TotalConfirmed: '',
        NewDeaths: '',
        TotalDeaths: '',
        NewRecovered: '',
        TotalRecovered: '',
      }
    }
  },
  methods: {
    async getDailyReportTotals() {
      try {
        return await axios(`https://api.covid19api.com/summary`);
      } catch (e) {
        console.log(e)
      }
    },
    renderDailyReportTotals(data) {
      this.DailyReportTotals.NewConfirmed = data.NewConfirmed;
      this.DailyReportTotals.TotalConfirmed = data.TotalConfirmed;
      this.DailyReportTotals.NewDeaths = data.NewDeaths;
      this.DailyReportTotals.TotalDeaths = data.TotalDeaths;
      this.DailyReportTotals.NewRecovered = data.NewRecovered;
      this.DailyReportTotals.TotalRecovered = data.TotalRecovered
    },
    async loadDailyReportTotals() {
      const res = await this.getDailyReportTotals()
      console.log(res.Global);
      return this.renderDailyReportTotals(res.data.Global)
    },
  },
  async mounted() {
    await this.loadDailyReportTotals();
  }
}
</script>
<template>
  <div class="col-2">
    <div class="card">
      <div class="card-header side-header">
        <h5 class="card-title ">WorldWide Summary</h5>
      </div>
      <div class="card-body">
        <div class="card-footer text-center border-none">
          <ul class="list-group list-group-flush text-start side-summary">
            <li class="list-group-item mt-3">NewConfirmed<h4 class="text-end">{{ DailyReportTotals.NewConfirmed }}</h4>
            </li>
            <li class="list-group-item mt-3">TotalConfirmed<h4 class="text-end">{{
                DailyReportTotals.TotalConfirmed
              }}</h4></li>
            <li class="list-group-item mt-3">NewDeaths<h4 class="text-end">{{ DailyReportTotals.NewDeaths }}</h4></li>
            <li class="list-group-item mt-3">TotalDeaths<h4 class="text-end">{{ DailyReportTotals.TotalDeaths }}</h4>
            </li>
            <li class="list-group-item mt-3">NewRecovered<h4 class="text-end">{{ DailyReportTotals.NewRecovered }}</h4>
            </li>
            <li class="list-group-item mt-3">TotalRecovered<h4 class="text-end">{{
                DailyReportTotals.TotalRecovered
              }}</h4></li>
          </ul>
        </div>
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

</style>