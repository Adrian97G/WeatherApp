<template>
  <div id="app" :class="typeof weather.main !== 'undefined' && weather.main.temp > 16 ? 'hot': '' ">
    <main>
      <div class="search-box">
        <input
          name=""
          id=""
          type="text"
          class="search-bar"
          v-model="query"
          @keyup.enter="fetch_weather"
        />
      </div>
      <div class="weather-wrap" v-if="typeof weather.main != 'undefined'">
        <div class="location-box">
          <div class="location"> {{ weather.name }}, {{ weather.sys.country }} </div>
          <div class="date"> {{ dataBuilder() }}</div>
        </div>
        <div class="weather-box">
          <div class="temp"> {{ Math.round(weather.main.temp) }}ºC</div>
          <div class="weather-image"><img id="wicon" alt="weather icon" v-bind:src="`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`"></div>
          <div class="weather"> {{ weather.weather[0].main }} </div>
          <div class="weather-description"> {{ weather.weather[0].description }} </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      api_key: '0baea3f49194aa6e2432a080125f865b',
      url_base: 'https://api.openweathermap.org/data/2.5/',
      query: '',
      weather: {}
    }
  },
  methods: {
    fetch_weather() {
      if (this.query.trim() !== '') {
        fetch(`${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`)
          .then(res => res.json())
          .then(this.setResults);
      }
    },
    setResults(results) {
      this.weather = results;
    },
    dataBuilder() {
      let d = new Date();
      let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];  // Corregido aquí
      let year = d.getFullYear();
      return `${day} ${date} ${month} ${year}`;
    },
  }
}
</script>


<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'montserrat', sans-serif;
  }

  #app {
    background-image: url("/src/assets/img/background1.jpg");
    background-size: cover;
    background-position: bottom;
    transition: 0.4s;
  }

  #app.hot {
    background-image: url("/src/assets/img/backgroundhot.jpg");
  }

  main {
    min-height: 100vh;
    padding: 25px;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, .50), rgba(0, 8, 5, 9.8));
    opacity: initial;
  }

  .search-box {
    width: 100%;
    margin-bottom: 30px;
  }

  .search-box .search-bar {
    display: block;
    width: 100%;
    padding: 15px;
    color: #000000;
    font-size: 20px;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);

    appearance: none;
    border: none;
    background: none;
    outline: none;

    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 10px 10px 10px 10px;
    transition: 0.4s;
  }

  .search-box .search-bar:focus {
    background-color: rgba(255, 255, 255, 0.75);
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
    border-radius: 6px 0px 16px 0px;
  }

  .location-box {
    color: #ffffff;
    font-size: 32px;
    font-weight: 1000;
    text-align: center;
  }

  .location-box .date {
    color: #ffffff;
    font-size: 20px;
    font-weight: 400;
    font-style: italic;
    text-align: center;
  }

  .weather-box .date {
    color: #ffffff;
    font-size: 20px;
    font-weight: 300;
    font-style: italic;
    text-align: center;
  }

  .weather-box {
  text-align: center;
  }

  .weather-box .temp{
    display: inline-block;
    padding: 10px 25px;
    color: #ffffff;
    font-size: 102px;
    font-weight: 900;
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.25);
    border-radius: 16px;
    margin: 30px 0px;
    box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  }

  .weather-box .weather {
    color: #ffffff;
    font-size: 35px;
    font-weight: 300;
    font-style: italic;
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  }

  .weather-box .weather-description {
    color: #ffffff;
    font-size: 10px;
    font-weight: 300;
    font-style: italic;
  }

  .weather-box .weather-image {
    position: center;
  }

</style>
