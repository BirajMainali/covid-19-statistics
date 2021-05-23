<script>
import axios from "axios";

export default {
  name: "Details",
  data() {
    return {
      countries: [],
      CountryInfo: {
        ActiveCases: '',
        CountryName: '',
        NewCases: '',
        NewDeath: '',
        TotalCase: '',
        TotalDeath: '',

      },
    }
  },
  methods: {
    async getCountryInfo() {
      try {
        const options = {
          method: 'GET',
          url: 'https://covid-19-data.p.rapidapi.com/report/country/name',
          params: {name: 'Italy', date: '2020-04-01'},
          headers: {
            'x-rapidapi-key': '1b2899e21dmsh530f29776d8ce27p121576jsne067b81e370e',
            'x-rapidapi-host': 'covid-19-data.p.rapidapi.com'
          }
        };
        return await axios.request(options);
      } catch (e) {
        console.log(e);
      }
    },
    renderCountryInfo(county) {
      this.CountryInfo.push({...[county]});
    },

    async LoadCountryInfo() {
      const res = await this.getCountryInfo();
      this.renderCountryInfo(res.data);
    },

    async getCountries() {
      return await axios.get("https://api.printful.com/countries");
    },
    renderCountries(countries) {
      for (let country in countries) {
        this.countries.push({...countries[country]})
      }
    },

    async LoadCountries() {
      const res = await this.getCountries();
      this.renderCountries(res.data);

    },
  },
  mounted() {
    this.LoadCountries();
    this.LoadCountryInfo();
  }
}
</script>
<template>
  <div class="col-10">
    <div class="card">
      <div class="card-header bg-white">
        <div class="card-title">
          <h4>Information of Nepal</h4><br>
          <p>From JHU CSSE COVID-19 Data · Last updated: 2 days ago</p>
        </div>
      </div>
      <div class="card-body">
        <div class="row mb-4">
          <div class="col-2">
            <select class="form-select">
              <option selected disabled>Total</option>
            </select>
          </div>
          <div class="col-2">
            <select class="form-select">
              <option value="">Nepal</option>
              <option value="">India</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col-3">
            <div class="row">
              <span>Cases</span>
            </div>
            <div class="row">
              <h5>497K</h5>
            </div>
            <div class="row">
              <p>+8,407</p>
            </div>
          </div>
          <div class="col-3">
            <div class="row">
              <span>Recovered</span>
            </div>
            <div class="row">
              <h5>497K</h5>
            </div>
            <div class="row">
              <p>+8,407</p>
            </div>
          </div>
          <div class="col-3">
            <div class="row">
              <span>Deaths</span>
            </div>
            <div class="row">
              <h5>497K</h5>
            </div>
            <div class="row">
              <p>+8,407</p>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <table class="table table-hover">
          <thead>
          <tr>
            <td>Location</td>
            <td>Cases</td>
            <td>Recovered</td>
            <td>Deaths</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>Karnali Province</td>
            <td>7,359</td>
            <td>-</td>
            <td>27</td>
          </tr>
          <tr>
            <td>Karnali Province</td>
            <td>7,359</td>
            <td>-</td>
            <td>27</td>
          </tr>
          <tr>
            <td>Karnali Province</td>
            <td>7,359</td>
            <td>-</td>
            <td>27</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<style scoped>

</style>