<script>
import axios from "axios";

export default {
  name: "SideBarSummary",
  data() {
    return {
      DailyReportTotals: {
        NewConfirmed: "",
        TotalConfirmed: "",
        NewDeaths: "",
        TotalDeaths: "",
        NewRecovered: "",
        TotalRecovered: "",
      },
    };
  },
  methods: {
    async getDailyReportTotals() {
      try {
        return await axios(`https://api.covid19api.com/summary`);
      } catch (e) {
        console.log(e);
      }
    },
    renderDailyReportTotals(data) {
      this.DailyReportTotals.NewConfirmed = data.NewConfirmed;
      this.DailyReportTotals.TotalConfirmed = data.TotalConfirmed;
      this.DailyReportTotals.NewDeaths = data.NewDeaths;
      this.DailyReportTotals.TotalDeaths = data.TotalDeaths;
      this.DailyReportTotals.NewRecovered = data.NewRecovered;
      this.DailyReportTotals.TotalRecovered = data.TotalRecovered;
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
          <li class="list-group-item mt-3">
            <h5 class="text-dark p-0 m-0"> New Confirmed</h5>
            <span class="badge bg-success">{{ DailyReportTotals.NewConfirmed }}</span>
          </li>
          <li class="list-group-item mt-3">
            <h5 class="text-dark p-0 m-0"> Total Confirmed</h5>
            <span class="badge bg-success">{{ DailyReportTotals.TotalConfirmed }}</span>
          </li>
          <li class="list-group-item mt-3">
            <h5 class="text-dark p-0 m-0"> New Deaths</h5>
            <span class="badge bg-success">{{ DailyReportTotals.NewDeaths }}</span>
          </li>
          <li class="list-group-item mt-3">
            <h5 class="text-dark p-0 m-0"> Total Deaths</h5>
            <span class="badge bg-success">{{ DailyReportTotals.TotalDeaths }}</span>
          </li>
          <li class="list-group-item mt-3">
            <h5 class="text-dark p-0 m-0">New Recovered</h5>
            <span class="badge bg-success">{{ DailyReportTotals.NewRecovered }}</span>
          </li>
          <li class="list-group-item mt-3">
            <h5 class="text-dark p-0 m-0">Total Recovered</h5>
            <span class="badge bg-success">{{ DailyReportTotals.TotalRecovered }}</span>
          </li>
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
