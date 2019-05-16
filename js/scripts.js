mapboxgl.accessToken = 'pk.eyJ1IjoiemVtMjMyIiwiYSI6ImNqdWQ5NXQxcDAydWw0NHBleGlnbDQ2NWIifQ.xzxdaO_DvGxl4eNCuIZ-Zg';
var map = new mapboxgl.Map({
  container: 'mapContainer',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-73.950348, 40.733210],
  zoom: 11
});

var zoomThreshold = 4;

map.on('load', function() {
  $('#hourly-legend').hide();

  $.getJSON('Data/trump_Elec_DayOf.geojson', function(data) {
    data.features.map(function(feature) {
      //feature.properties.POPULATION = parseInt(feature.properties.POPULATION);
    });

    map.addSource('NTA-311-Complaints', {
      type: 'geojson', // other types of sources include: video, vector tile, & others
      data: data,
    });

    map.addLayer({
      id: '311-complaints-DayOf',
      type: 'fill',
      source: 'NTA-311-Complaints',
      paint: {
        'fill-opacity': 0.7,
        'fill-color': [
          'interpolate',
          ['linear'],
          ['get', 'count'],
          0, '#fff7ec',
          10, '#fee8c8',
          20, '#fdd49e',
          30, '#fdbb84',
          40, '#fc8d59',
          50, '#ef6548',
          60, '#d7301f',
          70, '#990000'],
      }
    });

    // Created a sliding time scale for the user to select a time of day
    // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_rangeslider
    var slider = document.getElementById("myRange");
    var output = document.getElementById("timeOfDay");
    output.innerHTML = slider.value;

    slider.oninput = function() {
      $('#daily-legend').hide();
      $('#hourly-legend').show();
      output.innerHTML = this.value + ':00 (Military Time)';
      var TOD = this.value
      console.log('Time: ', TOD); // Checking to see if time scale values are registering
      console.log(typeof(TOD)); // Checking type of time scale values

      // Changing the layer color for the complaints aggregated by specific time of day
      var hourlyColor = [
        'interpolate',
        ['linear'],
        ['get', TOD],
        0, '#f1eef6',
        2, '#d7b5d8',
        4, '#df65b0',
        6, '#dd1c77',
        8, '#980043'];

      map.setPaintProperty('311-complaints-DayOf', 'fill-color', hourlyColor);

      var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });
    };
  });
});

// Resetting the colors to total complaint counts for the day
$('#resetButton').on('click', function() {
  $('#daily-legend').show();
  $('#hourly-legend').hide();
  var dailyColor = [
    'interpolate',
    ['linear'],
    ['get', 'count'],
    0, '#fff7ec',
    10, '#fee8c8',
    20, '#fdd49e',
    30, '#fdbb84',
    40, '#fc8d59',
    50, '#ef6548',
    60, '#d7301f',
    70, '#990000'];

  map.setPaintProperty('311-complaints-DayOf', 'fill-color', dailyColor);
});


$(document).ready(function() {
  $("#sidebar").mCustomScrollbar({
    theme: "minimal"
  });

  $('#dismiss, .overlay').on('click', function() {
    $('#sidebar').removeClass('active');
    $('.overlay').removeClass('active');
  });

  $('#sidebarCollapse').on('click', function() {
    $('#sidebar').addClass('active');
    $('.overlay').addClass('active');
    $('.collapse.in').toggleClass('in');
    $('a[aria-expanded=true]').attr('aria-expanded', 'false');
  });
});
