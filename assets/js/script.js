var searchHist = $('#searchHist');
var weatherDataEl = $('#weatherData');

var citySearch = $('#citySearch');
var searchBtn = $('#searchBtn');

var cityName;
var cityState;
var cityCountry;

var searchHistory = [];

var currentUVI = $('#currentUVI');

var iconBase = 'https://openweathermap.org/img/wn/';



function getUserInput(e) {
    e.preventDefault();
    var requestLocURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + citySearch.val() + '&APPID=4cf13e749504309d50ec21fe5fae86a6';
    //var requestURL = 'http://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&units=imperial&APPID=4cf13e749504309d50ec21fe5fae86a6';
    // searchHist.append('<li class="list-group-item">' + citySearch.val() + '</li>');
    // citySearch.val("");
    getLocation(requestLocURL);
}


function getLocation(requestLocURL) {  
    fetch(requestLocURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        var requestWeatherURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + data[0].lat + '&lon=' + data[0].lon + '&units=imperial&APPID=4cf13e749504309d50ec21fe5fae86a6';
        console.log(data);
        if (data) {
            cityName = data[0].name;
            cityState = data[0].state;
            cityCountry = data[0].country;
            getWeatherData(requestWeatherURL);
        } else {
            console.log('you here for the weather, or are you just playin around?');
        }
      })
      .catch(error => {
        console.log(error); // TODO handle this nicely
      });
  }













function getWeatherData(requestWeatherURL) {  
    fetch(requestWeatherURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

          if (cityState) {
            $('#currentHeader').html(cityName + ', ' + cityState + ', ' + cityCountry + " (" + moment().format("MM/DD/YYYY") + ") <img id='currentIcon' src='https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png' />");
            // searchHist.prepend('<li class="list-group-item">' + cityName + ', ' + cityState + ', ' + cityCountry + '</li>');
            searchHistory.push(cityName + ', ' + cityState + ', ' + cityCountry);
            localStorage.setItem('searchHist', JSON.stringify(searchHistory));
            renderSearchHistory();
            citySearch.val("");
          } else {
            $('#currentHeader').text(cityName + ', ' + cityCountry + " (" + moment().format("MM/DD/YYYY") + ") <img id='currentIcon' src='https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png' />");
            // searchHist.prepend('<li class="list-group-item">' + cityName + ', ' + cityCountry + '</li>');
            searchHistory.push(cityName + ', ' + cityCountry);
            localStorage.setItem('searchHist', JSON.stringify(searchHistory));
            renderSearchHistory();
            citySearch.val("");
          }


            $('#currentTemp').text(data.current.temp + '°F');
            $('#currentWind').text(data.current.wind_speed + 'MPH');
            $('#currentHum').text(data.current.humidity + '%');
        
            $('#currentUVI').html(data.current.uvi);
            $('#currentUVI').removeClass('favorable moderate severe'); // remove all classes before applying one below
            if (data.current.uvi > 6) {
                $('#currentUVI').addClass('severe');
            } else if (data.current.uvi > 2) {
                $('#currentUVI').addClass('moderate');
            } else {
                $('#currentUVI').addClass('favorable');
            }

            console.log(moment.unix(data.daily[0].dt).format("MM/DD/YYYY"));

            // TODO redo this with a loop instead of doing it all manually >_<

            $('#day1date').html(moment.unix(data.daily[1].dt).format("MM/DD/YYYY"));
            $('#day1icon').attr("src", iconBase + data.daily[1].weather[0].icon + '.png');
            $('#day1temp').html('Temp: ' + data.daily[1].temp.max + '°F');
            $('#day1wind').html('Wind: ' + data.daily[1].wind_speed + ' MPH');
            $('#day1hum').html('Humidity: ' + data.daily[1].humidity + '%');
        
            $('#day2date').html(moment.unix(data.daily[2].dt).format("MM/DD/YYYY"));
            $('#day2icon').attr("src", iconBase + data.daily[2].weather[0].icon + '.png');
            $('#day2temp').html('Temp: ' + data.daily[2].temp.max + '°F');
            $('#day2wind').html('Wind: ' + data.daily[2].wind_speed + ' MPH');
            $('#day2hum').html('Humidity: ' + data.daily[2].humidity + '%');
        
            $('#day3date').html(moment.unix(data.daily[3].dt).format("MM/DD/YYYY"));
            $('#day3icon').attr("src", iconBase + data.daily[3].weather[0].icon + '.png');
            $('#day3temp').html('Temp: ' + data.daily[3].temp.max + '°F');
            $('#day3wind').html('Wind: ' + data.daily[3].wind_speed + ' MPH');
            $('#day3hum').html('Humidity: ' + data.daily[3].humidity + '%');

            $('#day4date').html(moment.unix(data.daily[4].dt).format("MM/DD/YYYY"));
            $('#day4icon').attr("src", iconBase + data.daily[4].weather[0].icon + '.png');
            $('#day4temp').html('Temp: ' + data.daily[4].temp.max + '°F');
            $('#day4wind').html('Wind: ' + data.daily[4].wind_speed + ' MPH');
            $('#day4hum').html('Humidity: ' + data.daily[4].humidity + '%');

            $('#day5date').html(moment.unix(data.daily[5].dt).format("MM/DD/YYYY"));
            $('#day5icon').attr("src", iconBase + data.daily[5].weather[0].icon + '.png');
            $('#day5temp').html('Temp: ' + data.daily[5].temp.max + '°F');
            $('#day5wind').html('Wind: ' + data.daily[5].wind_speed + ' MPH');
            $('#day5hum').html('Humidity: ' + data.daily[5].humidity + '%');



      })
      .catch(error => {
        console.log(error);
      });
  }



function renderSearchHistory () {
    searchHist.html("");
    for (i = 0; i < searchHistory.length; i++) {
        searchHist.prepend('<li class="list-group-item">' + searchHistory[i] + '</li>');
    }
}


function displayBerkeleyWeather() { // if there's no search history on pageload
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=37.8708393&lon=-122.272863&units=imperial&APPID=4cf13e749504309d50ec21fe5fae86a6')
    .then(function (response) {
        return response.json();
      })
    .then(function (data) {
            console.log(data);
          var name = document.createElement('li');
          var temperature = document.createElement('li');
          var humidity = document.createElement('li');
          var wind = document.createElement('li');
          //Set the text of the list element to the JSON response's name property
          name.textContent = 'Place: Berkeley, California, US';
          temperature.textContent = 'Temperature: ' + data.current.temp + '°F';
          humidity.textContent = 'Humidity: ' + data.current.humidity + '%';
          wind.textContent = 'Wind: ' + data.current.wind_speed + ' MPH';
          //Append the li element to the id associated with the ul element.
          weatherDataEl.prepend(name);
          weatherDataEl.prepend(temperature);
          weatherDataEl.prepend(wind);
          weatherDataEl.prepend(humidity);
      })
      .catch(error => {
        console.log(error);
      });
}

function init() {
    if (localStorage.getItem('searchHist')) {
        searchHistory = JSON.parse(localStorage.getItem('searchHist'));
        renderSearchHistory();
    } else {
        displayBerkeleyWeather();
    }
}

init();

  searchBtn.click(getUserInput);
  searchHist.on("click", "li", function(e){
      var url = 'https://api.openweathermap.org/geo/1.0/direct?q=' + e.target.textContent + '&APPID=4cf13e749504309d50ec21fe5fae86a6';
      getLocation(url);
  })