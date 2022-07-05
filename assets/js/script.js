var searchHist = $('#searchHist');
var weatherDataEl = $('#weatherData');

var citySearch = $('#citySearch');
var searchBtn = $('#searchBtn');

var cityName;
var cityState;
var cityCountry;

var searchHistory = [];

function getUserInput(e) {
    e.preventDefault();
    var requestLocURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + citySearch.val() + '&APPID=4cf13e749504309d50ec21fe5fae86a6';
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
        var requestWeatherURL = 'http://api.openweathermap.org/data/2.5/onecall?lat=' + data[0].lat + '&lon=' + data[0].lon + '&units=imperial&APPID=4cf13e749504309d50ec21fe5fae86a6';
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
          var name = document.createElement('li');
          var temperature = document.createElement('li');
          var humidity = document.createElement('li');
          var wind = document.createElement('li');
          //Set the text of the list element to the JSON response's name property
          if (cityState) {
            name.textContent = 'Place: ' + cityName + ', ' + cityState + ', ' + cityCountry;
            // searchHist.prepend('<li class="list-group-item">' + cityName + ', ' + cityState + ', ' + cityCountry + '</li>');
            searchHistory.push(cityName + ', ' + cityState + ', ' + cityCountry);
            addToSearchHistory();
            citySearch.val("");
          } else {
            name.textContent = 'Place: ' + cityName + ', ' + cityCountry;
            // searchHist.prepend('<li class="list-group-item">' + cityName + ', ' + cityCountry + '</li>');
            searchHistory.push(cityName + ', ' + cityCountry);
            addToSearchHistory();
            citySearch.val("");
          }
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



function addToSearchHistory () {
    searchHist.html("");
    for (i = 0; i < searchHistory.length; i++) {
        searchHist.prepend('<li class="list-group-item">' + searchHistory[i] + '</li>');
    }
}





  searchBtn.click(getUserInput);