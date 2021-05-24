<script>
import axios from "axios";
import TotalCard from "../components/TotalCard";
import CasesInfo from "../components/CasesInfo";
import TestInfo from "../components/TestInfo";
import DeathsInfo from "../components/DeathsInfo";

export default {
  name: "Details",
  components: {
    TotalCard,
    CasesInfo,
    TestInfo,
    DeathsInfo
  },
  data() {
    return {
      SelectedCountry: null,
      countries: [],
      CasesInfo: {},
      testsInfo: {},
      DeathsInfo: {}
    };
  },
  methods: {
    async getCountriesStatistics() {
      try {
        return await axios(
            `https://covid-193.p.rapidapi.com/statistics?country=${this.SelectedCountry}`,
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

      this.CasesInfo = Statistics.cases;
      this.testsInfo = Statistics.tests;
      this.DeathsInfo = Statistics.deaths;
    },
    async loadCountriesStatistics() {
      const res = await this.getCountriesStatistics();
      return this.renderCountriesStatistics(res.data.response[0]);
    },

    async getCountries() {
      try {
        return await axios.get("https://restcountries.eu/rest/v2/all");
      } catch (e) {
        console.warn(e);
      }
    },
    renderCountries(countries) {
      for (let country in countries) {
        this.countries.push({...countries[country]});
      }
    },
    async loadCountries() {
      const response = await this.getCountries();
      return this.renderCountries(response.data);
    },
  },
  watch: {
    async SelectedCountry() {
      if (!this.SelectedCountry) {
        this.CountryInfo = this.SelectedCountry="Nepal";
      } else {
        await this.loadCountriesStatistics();
      }
    },
  },
  computed: {
    getDefaultCountry() {
      return this.SelectedCountry == null ? this.SelectedCountry : 'Nepal'
    }
  },
  async mounted() {
    await this.loadCountries();
    await this.loadCountriesStatistics();
  },
};
</script>
<template>
  <div class="col">
    <div class="card">
      <div class="card-header bg-white">
        <div class="card-title">
          <h4>Individual Country Details</h4>
        </div>
      </div>
      <div class="card-body">
        <div class="row mb-4">
          <div class="col-2">
            <selected class="form-select">
              Details
            </selected>
          </div>
          <div class="col-2">
            <select v-model="SelectedCountry" class="form-select">
              <option
                  v-for="country in countries"
                  :key="country.name"
                  :value="country.name">
                {{ getDefaultCountry }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <TotalCard :count="CasesInfo.total" info="display-4 text-warning" title="Cases"/>
          </div>
          <div class="col">
            <TotalCard :count="testsInfo.total" info="display-4 text-success" title="Test"/>
          </div>
          <div class="col">
            <TotalCard :count="DeathsInfo.total" info="display-4 text-danger" title="Death"/>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="row">
          <div class="col">
            <CasesInfo :cases-info="CasesInfo" title="Active"/>
          </div>
          <div class="col">
            <TestInfo :test-info="testsInfo" title="Test"/>
          </div>
          <div class="col">
            <DeathsInfo :death-info="DeathsInfo" title="Death"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  margin-right: 8px;
}
</style>
