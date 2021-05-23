<script>
import axios from "axios";

export default {
  name: "Data",
  data() {
    return {
      Statistics: [],
    }
  },
  methods: {
    async getCountriesStatistics() {
      try {
        return await axios(
            `https://covid-193.p.rapidapi.com/statistics`,
            {
              method: "GET",
              responseType: "json",
              headers: {
                "x-rapidapi-key":
                    "1b2899e21dmsh530f29776d8ce27p121576jsne067b81e370e",
                "x-rapidapi-host": "covid-193.p.rapidapi.com",
              },
            }
        );
      } catch (e) {
        console.warn(e);
      }
    },
    renderCountriesStatistics(Statistics) {
      for (let statistic in Statistics) {
        this.Statistics.push({...Statistics[statistic]});
      }
    },
    async loadCountriesStatistics() {
      const res = await this.getCountriesStatistics();
      console.log(res.data.response);
      return this.renderCountriesStatistics(res.data.response);
    }
  },
  async mounted() {
    await this.loadCountriesStatistics();
  }
}

</script>


<template>
  <table class="table table-hover table-bordered table-hover">
    <thead>
    <tr class="my-header">
      <td>#</td>
      <td>Country</td>
      <td>Total Cases</td>
      <td>New Deaths</td>
      <td>Total Recovered</td>
      <td>Active Cases</td>
      <td>Serious/Critical</td>
      <td>Death 1M</td>
      <td>Test 1M</td>
      <td>Population</td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(statistic, idx) in Statistics">
      <td>{{ idx + 1 }}</td>
      <td>{{ statistic.country }}</td>
      <td>{{ statistic.cases.total }}</td>
      <td>{{ statistic.deaths.new }}</td>
      <td>{{ statistic.cases.recovered }}</td>
      <td>{{ statistic.cases.active }}</td>
      <td>{{ statistic.cases.critical }}</td>
      <td>{{ statistic.deaths["1M_pop"] }}</td>
      <td>{{ statistic.tests["1M_pop"] }}</td>
      <td>{{ statistic.population }}</td>

    </tr>
    </tbody>
  </table>
</template>


<style scoped>

</style>