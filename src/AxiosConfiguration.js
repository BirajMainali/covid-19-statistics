import axios from "axios";

const instance = axios.create({
    baseURL: 'https://covid-193.p.rapidapi.com/statistics',
    responseType: "json",
    headers: {
        "x-rapidapi-key": "1b2899e21dmsh530f29776d8ce27p121576jsne067b81e370e",
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
    }
});
export default instance;
