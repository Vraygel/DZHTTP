const http = require('https');
const config = require('./config');
const city = process.argv[2] || config.city

const getWeatherData = (city) => {
  const myAPIKey = process.env.myAPIKey
 
  const options = {
    method: 'GET',
    hostname: 'api.tomorrow.io',
    port: null,
    path: `/v4/weather/realtime?location=new%20york&apikey=${myAPIKey}`,
    headers: {
      accept: 'application/json'
    }
  };
  
  http.get(options, (res) => {

    let rowData  = '';

    res.on('data', (chunk) => {
      rowData += chunk;
    });


    res.on('end', () => {
      const weatherData = JSON.parse(rowData);
      console.log('Дата: ' + weatherData.data.time)
      console.log('Облачность: ' + weatherData.data.values.cloudCover + '%')
      console.log('Влажность: ' + weatherData.data.values.humidity + '%')
      console.log('Вероятность осадков: ' + weatherData.data.values.precipitationProbability + '%')
      console.log('Давление: ' + weatherData.data.values.pressureSurfaceLevel * 10 + 'ммрс')
      console.log('Температура: ' + weatherData.data.values.temperature)
      console.log('Ощущается как: ' + weatherData.data.values.temperatureApparent)
    });
  }).on('error', (error) => {
    console.error('Ошибка, данные не получены:', error.message);
  });
};


if (!city) {
  console.error('Необходимо указать город');
} else {
  getWeatherData(city);
}



let temp = {
  data: {
    time: '2024-01-23T07:39:00Z',
    values: {
      cloudBase: 0.3,
      cloudCeiling: 0.3,
      cloudCover: 87,
      dewPoint: -2.81,
      freezingRainIntensity: 0,
      humidity: 83,
      precipitationProbability: 0,
      pressureSurfaceLevel: 1018.06,
      rainIntensity: 0,
      sleetIntensity: 0,
      snowIntensity: 0,
      temperature: -1.38,
      temperatureApparent: -4.8,
      uvHealthConcern: 0,
      uvIndex: 0,
      visibility: 15.08,
      weatherCode: 1001,
      windDirection: 273.19,
      windGust: 6,
      windSpeed: 2.63
    }
  },
  location: {
    lat: 43.653480529785156,
    lon: -79.3839340209961,
    name: 'Toronto, Golden Horseshoe, Ontario, Canada',
    type: 'administrative'
  }
}

// console.log(temp.data.time);