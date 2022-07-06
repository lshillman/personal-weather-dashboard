var searchHist = $('#searchHist');
var weatherDataEl = $('#weatherData');

var citySearch = $('#citySearch');
var searchBtn = $('#searchBtn');

var berkeleyRequestURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=37.8708393&lon=-122.272863&units=imperial&APPID=4cf13e749504309d50ec21fe5fae86a6'

var cityName;
var cityState;
var cityCountry;
var locDisplayName;
var lat = 37.8708393; // default coordinates are for Berkeley, CA
var lon = -122.272863;

var searchHistory = [];
var clickedHistoryItem = false; // keep track of history clicks so we don't re-add them

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

// get the coordinates from the user's input, then build a URL for getting the weather
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
            lat = data[0].lat;
            lon = data[0].lon;
            clickedHistoryItem = false;
            getWeatherData(requestWeatherURL);
            if (cityState) {
                locDisplayName = cityName + ', ' + cityState + ', ' + cityCountry;
            } else {
                locDisplayName = cityName + ', ' + cityCountry;
            }


        } else {
            console.log('you here for the weather, or are you just playin around?');
        }
      })
      .catch(error => {
        console.log(error); // TODO handle this nicely
      });
  }

// get the weather using a URL passed into the function
function getWeatherData(requestWeatherURL) {  
    fetch(requestWeatherURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);

        $('#currentHeader').html(locDisplayName + " (" + moment().format("MM/DD/YYYY") + ") <img id='currentIcon' src='https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png' />");

        // only add stuff to the search history if the user typed something into the search field and clicked 'search'
        if (!clickedHistoryItem) {
            searchHistory.push({name: locDisplayName, latitude: lat, longitude: lon});
            localStorage.setItem('searchHist', JSON.stringify(searchHistory));
            renderSearchHistory();
            citySearch.val("");
        }

        displayWeatherData(data);
      })
      .catch(error => {
        console.log(error);
      });
  }

function displayWeatherData(data) {

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
}


// display the search history on the page. Store coordinates in data-lat and data-lon attributes.
function renderSearchHistory () {
    searchHist.html("");
    for (i = 0; i < searchHistory.length; i++) {
        searchHist.prepend('<li class="list-group-item" data-lat="' + searchHistory[i].latitude + '" data-lon="' + searchHistory[i].longitude + '">' + searchHistory[i].name + '</li>');
    }
}



function init() {
    // if there's a search history in localStorage, get the weather for the most recent search
    if (localStorage.getItem('searchHist')) {
        searchHistory = JSON.parse(localStorage.getItem('searchHist'));
        renderSearchHistory();
        locDisplayName = searchHistory[searchHistory.length-1].name
        clickedHistoryItem = true;
        var url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + searchHistory[searchHistory.length-1].latitude + '&lon=' + searchHistory[searchHistory.length-1].longitude + '&units=imperial&APPID=4cf13e749504309d50ec21fe5fae86a6';
        getWeatherData(url);

    // otherwise, get the weather for Berkeley. TODO: use an IP geocoding API to display weather for the user's approximate location
    } else {
        locDisplayName = 'Berkeley, California, US';
        clickedHistoryItem = true;
        getWeatherData(berkeleyRequestURL);
    }
}

init(); // stuff to run when the page loads

searchBtn.click(getUserInput);

searchHist.on("click", "li", function(e){
    locDisplayName = e.target.textContent;
    var url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + e.target.dataset.lat + '&lon=' + e.target.dataset.lon + '&units=imperial&APPID=4cf13e749504309d50ec21fe5fae86a6';
    console.log(url);
    clickedHistoryItem = true; // groan. there's probably a better way to do this.
    getWeatherData(url);
})