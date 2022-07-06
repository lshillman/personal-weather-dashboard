# Personal Weather Dashboard

## Check out the [live dashboard](https://lshillman.github.io/personal-weather-dashboard/)

I like knowing the weather, and I dislike using Google (only half joking about that last part. A company with that much power shouldn't also control the WEATHER!). Anyway, I needed some practice with third-party APIs, so this seemed like a good idea at the time. Search for your city on the page, and your search history is saved in localStorage so you can easily come back to it later.


## Technologies used:

* HTML
* CSS
* JS
* Bootstrap
* OpenWeather geocoding and One Call APIs

## Code snippet

This was maddening: I only wanted a new location to be added to the search history if the user had typed something into the search field and clicked 'search'. Clicking on search history items shouldn't re-add them to the search history! There *must* be a better way of doing this, but in the end I created a global variable called "clickedHistoryItem" and used that to keep track of user actions.

````javascript
$('#currentHeader').html(locDisplayName + " (" + moment().format("MM/DD/YYYY") + ") <img id='currentIcon' src='https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png' />");

// only add stuff to the search history if the user typed something into the search field and clicked 'search'
if (!clickedHistoryItem) {
    searchHistory.push({name: locDisplayName, latitude: lat, longitude: lon});
    localStorage.setItem('searchHist', JSON.stringify(searchHistory));
    renderSearchHistory();
    citySearch.val("");
}

displayWeatherData(data);
````

## In action

Here's a little clip of searching for locations and revisiting places in the search history:



## Credits

As always:
https://www.w3.org/WAI/

And what would I have done without OpenWeather's API documentation:



## License

You are hereby granted no rights. Talk to me if you want to use this for something. And don't use my API key!
