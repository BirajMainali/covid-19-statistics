<script>
import axios from "axios";
import TotalCard from "../components/TotalCard";
import CasesInfo from "../components/CasesInfo";
import TestInfo from "../components/TestInfo";
import DeathsInfo from "../components/DeathsInfo";
import AxiosConfiguration from "../AxiosConfiguration";

const getInitialCountry = () => {
  this.SelectedCountry = 'Nepal'
}

export default {
  name: "Details",
  components: {
    TotalCard,
    CasesInfo,
    TestInfo,
    DeathsInfo
  },

  data: () => ({
    Loading: true,
    SelectedCountry: 'Nepal',
    countries: [],
    CasesInfo: {},
    testsInfo: {},
    DeathsInfo: {}
  }),

  methods: {
    async getCountriesStatistics() {
      try {
        return AxiosConfiguration.get(`?country=${this.SelectedCountry}`);
      } catch (e) {
        console.warn(e);
      }
    },
    appendCountriesStatistics(Statistics) {

      this.CasesInfo = Statistics.cases;
      this.testsInfo = Statistics.tests;
      this.DeathsInfo = Statistics.deaths;
    },
    async loadCountriesStatistics() {
      const res = await this.getCountriesStatistics();
      this.appendCountriesStatistics(res.data.response[0]);
      this.Loading = false;
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
        this.CountryInfo = getInitialCountry();
      } else {
        await this.loadCountriesStatistics();
      }
    },
  },
  async mounted() {
    await this.loadCountries();
    await this.loadCountriesStatistics();
  },
};
</script>
<template>
  <div class="col">
    <div class="card py-0">
      <div class="card-header bg-white">
        <div class="card-title">
          <h4>Individual Country Details</h4>
        </div>
      </div>
      <div v-if="!Loading">
        <div class="card-body">
          <div class="row mb-4">
            <div class="col-2">
              <selected class="form-select">
                Details
              </selected>
            </div>
            <div class="col-2">
              <select v-model="SelectedCountry" class="form-select">
                <option value="">Select</option>
                <option
                    v-for="country in countries"
                    :key="country.name"
                    :value="country.name">
                  {{ country.name }}
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
      <div class="d-flex justify-content-center mt-5 mb-4" v-else>
        <div class="spinner-border" role="status">
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
