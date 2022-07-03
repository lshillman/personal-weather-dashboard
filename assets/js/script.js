var testList = $('#testList');

var citySearch = $('#citySearch');
var searchBtn = $('#searchBtn');


function getUserInput(e) {
    e.preventDefault();
    var requestURL = 'http://api.openweathermap.org/data/2.5/weather?q=' + citySearch.val() + '&APPID=4cf13e749504309d50ec21fe5fae86a6';
    citySearch.val("");
    getWeatherData(requestURL);
}


function getWeatherData(requestURL) {  
    fetch(requestURL)
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
          testList.append(name);
          testList.append(conditions);
          testList.append(temperature);
          testList.append(humidity);
      });
  }

  searchBtn.click(getUserInput);