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
        const options = {
          method: 'GET',
          url: 'https://covid-193.p.rapidapi.com/statistics',
          headers: {
            'x-rapidapi-key': '1b2899e21dmsh530f29776d8ce27p121576jsne067b81e370e',
            'x-rapidapi-host': 'covid-193.p.rapidapi.com'
          }
        };
        return await axios.request(options);
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
      return this.renderCountriesStatistics(res.data);
    }
  },
  async mounted() {
    await this.loadCountriesStatistics();
    console.log(this.loadCountriesStatistics());
  }
}

</script>


<template>
  <table class="table table-hover datatable table-hover">
    <thead>
    <tr>
      <td>#</td>
      <td>Country</td>
      <td>Total Cases</td>
      <td>New Deaths</td>
      <td>Total Recovered</td>
      <td>Active Cases</td>
      <td>Serious/Critical</td>
      <td>1M Pop</td>
      <td>Death 1M</td>
      <td>Test 1M</td>
      <td>Population</td>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(statistic, idx) in Statistics">
<!--      <td>{{statistic.country[idx]}}</td>-->
    </tr>
    </tbody>
  </table>
</template>


<style scoped>

</style>