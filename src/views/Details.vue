<script>
import axios from "axios";
import TotalCard from "../components/TotalCard";

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
  components: {
    TotalCard,
  },
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
      this.CountryInfo.TestPM = Statistics.tests["1M_pop"];
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
            <select class="form-select" v-model="SelectedCountry">
              <option
                  v-for="country in countries"
                  :key="country.name"
                  :value="country.name"
              >
                {{ country.name }}
              </option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <TotalCard title="Cases" info="display-4 text-warning" :count="CountryInfo.TotalCases"/>
          </div>
          <div class="col">
            <TotalCard title="Test" info="display-4 text-success" :count="CountryInfo.Totaltest"/>
          </div>
          <div class="col">
            <TotalCard title="Death" info="display-4 text-danger" :count="CountryInfo.TotalDeath"/>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <div class="row">
          <div class="col">
            <div class="card p-0 mb-3">
              <div
                  class="card-header"
                  style="background-color: #f2f2f2;border-radius:15px 15px 0 0;"
              >
                <strong class="card-title">Active</strong>
              </div>
              <div class="card-body px-0 pt-0">
                <table class="table table-border table-hover mb-0">
                  <tbody>
                  <tr>
                    <td>New</td>
                    <td class="text-end">{{ CountryInfo.New }}</td>
                  </tr>
                  <tr>
                    <td>Active</td>
                    <td class="text-end">{{ CountryInfo.Active }}</td>
                  </tr>
                  <tr>
                    <td>Per Million</td>
                    <td class="text-end">{{ CountryInfo.CasesPM }}</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td class="text-end">{{ CountryInfo.TotalCases }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card p-0 mb-3">
              <div
                  class="card-header"
                  style="background-color: #f2f2f2;border-radius:15px 15px 0 0;"
              >
                <strong class="card-title">Test</strong>
              </div>
              <div class="card-body px-0 pt-0">
                <table class="table table-border table-hover mb-0">
                  <tbody>
                  <tr>
                    <td>Test Per Million</td>
                    <td class="text-end">{{ CountryInfo.TestPM }}</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td class="text-end">{{ CountryInfo.Totaltest }}</td>
                  </tr>
                  <tr>
                    <td>Recovered</td>
                    <td class="text-end">{{ CountryInfo.Recovered }}</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col">
            <div class="card p-0 mb-3">
              <div
                  class="card-header"
                  style="background-color: #f2f2f2;border-radius:15px 15px 0 0;"
              >
                <strong class="card-title">Death</strong>
              </div>
              <div class="card-body px-0 pt-0">
                <table class="table table-border table-hover mb-0">
                  <tbody>
                  <tr>
                    <td>New</td>
                    <td class="text-end">{{ CountryInfo.NewDeath }}</td>
                  </tr>
                  <tr>
                    <td>Per Million</td>
                    <td class="text-end">{{ CountryInfo.DeathPM }}</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td class="text-end">{{ CountryInfo.TotalDeath }}</td>
                  </tr>
                  </tbody>
                </table>
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
