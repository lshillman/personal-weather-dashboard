var searchHist = $('#searchHist');
var weatherDataEl = $('#weatherData');

var citySearch = $('#citySearch');
var searchBtn = $('#searchBtn');

var cityName;
var cityState;
var cityCountry;

function getUserInput(e) {
    e.preventDefault();
    var requestLocURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + citySearch.val() + '&APPID=4cf13e749504309d50ec21fe5fae86a6';
    //var requestURL = 'http://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&units=imperial&APPID=4cf13e749504309d50ec21fe5fae86a6';
    searchHist.append('<li class="list-group-item">' + citySearch.val() + '</li>');
    citySearch.val("");
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
        getWeatherData(requestWeatherURL);
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
          var conditions = document.createElement('li');
          //Set the text of the list element to the JSON response's name property
          name.textContent = 'Place: ' + data.name;
          temperature.textContent = 'Temperature: ' + data.main.temp;
          humidity.textContent = 'Humidity: ' + data.main.humidity;
          conditions.textContent = 'Conditions: ' + data.weather[0].main;
          //Append the li element to the id associated with the ul element.
          weatherDataEl.append(name);
          weatherDataEl.append(conditions);
          weatherDataEl.append(temperature);
          weatherDataEl.append(humidity);
      })
      .catch(error => {
        console.log(error);
      });
  }

  searchBtn.click(getUserInput);