<script>
// @ts-nocheck

import axios from "axios";

function GetInitialCountryInfo() {
  return {
    Population: "0",
    New: "0",
    Active: "0",
    Critical: "0",
    Recovered: "0",
    CasesPM: "0",
    TotalCases: "0",
    NewDeath: "0",
    DeathPM: "0",
    TotalDeath: "0",
    TestPM: "0",
    Totaltest: "0",
    Day: "0",
  };
}

export default {
  name: "Details",
  data() {
    return {
      SelectedCountry: "NEPAL",
      countries: [],
      CountryInfo: GetInitialCountryInfo(),
    };
  },
  methods: {
    async getCountriesStatistics() {
      try {
        return await axios(
            `https://covid-193.p.rapidapi.com/statistics?country=${this.SelectedCountry}`,
            {
              method: "GET",
              responseType: 'json',
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
      this.CountryInfo.Population = Statistics.population;
      this.CountryInfo.New = Statistics.cases.new;
      this.CountryInfo.Active = Statistics.cases.active;
      this.CountryInfo.Critical = Statistics.cases.critical;
      this.CountryInfo.Recovered = Statistics.cases.recovered;
      this.CountryInfo.CasesPM = Statistics.cases["1M_pop"];
      this.CountryInfo.TotalCases = Statistics.cases.total;
      /*Cases*/
      this.CountryInfo.NewDeath = Statistics.deaths.new;
      this.CountryInfo.DeathPM = Statistics.deaths["1M_pop"];
      this.CountryInfo.TotalDeath = Statistics.deaths.total;
      /*Death*/
      this.CountryInfo.TestPM = Statistics.tests["1M_pop"]
      this.CountryInfo.Totaltest = Statistics.tests.total;
      /*Test*/
      this.CountryInfo.Day = Statistics.tests.day;
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
        this.CountryInfo = GetInitialCountryInfo();
      } else {
        await this.loadCountriesStatistics();
      }
    }
  },
  async mounted() {
    await this.loadCountries();
    await this.loadCountriesStatistics();
  },
};
</script>
<template>
  <div class="col-10">
    <div class="card">
      <div class="card-header bg-white">
        <div class="card-title">
          <h4>Individual Country Details</h4>
          <br/>
          <p>Last updated: {{ CountryInfo.Day }}</p>
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
            <select class="form-select" v-model="SelectedCountry">
              <option v-for="country in countries" :key="country.name" :value="country.name">
                {{ country.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <div class="row">
              <span>Cases</span>
            </div>
            <div class="row">
              <h5>{{ CountryInfo.TotalCases }}</h5>
            </div>
            <div class="row"></div>
          </div>
          <div class="col-3">
            <div class="row">
              <span>Total Test</span>
            </div>
            <div class="row">
              <h5>{{ CountryInfo.Totaltest }}</h5>
            </div>
          </div>
          <div class="col-3">
            <div class="row">
              <span>Deaths</span>
            </div>
            <div class="row">
              <h5>{{ CountryInfo.TotalDeath }}</h5>
            </div>
            <div class="row"></div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="row">
          <div class="col-4">
            <div class="card">
              <div class="card-header">
                <h6 class="card-title mb-0" text-info>Active</h6>
              </div>
              <div class="card-body">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    New <span>{{ CountryInfo.New }}</span>
                  </li>
                  <li class="list-group-item">
                    Active <span>{{ CountryInfo.Active }}</span>
                  </li>
                  <li class="list-group-item">
                    Recovered <span>{{ CountryInfo.Recovered }}</span>
                  </li>
                  <li class="list-group-item">
                    1M Pop <span>{{ CountryInfo.DeathPM }}</span>
                  </li>
                  <li class="list-group-item">
                    Total <span>{{ CountryInfo.TotalCases }}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="card">
              <div class="card-header">
                <h6 class="card-title mb-0" text-info>Test</h6>
              </div>
              <div class="card-body">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    1M Populaion <span>{{ CountryInfo.TestPM }}</span>
                  </li>
                  <li class="list-group-item">
                    Total {{ CountryInfo.Totaltest }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-4">
            <div class="card">
              <div class="card-header">
                <h6 class="card-title mb-0" text-info>Death</h6>
              </div>
              <div class="card-body">
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">
                    New <span>{{ CountryInfo.NewDeath }}</span>
                  </li>
                  <li class="list-group-item">
                    1M Pop {{ CountryInfo.DeathPM }}
                  </li>
                  <li class="list-group-item">
                    Total {{ CountryInfo.TotalDeath }}
                  </li>
                </ul>
              </div>
            </div>
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
