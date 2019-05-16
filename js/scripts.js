mapboxgl.accessToken = 'pk.eyJ1IjoiemVtMjMyIiwiYSI6ImNqdWQ5NXQxcDAydWw0NHBleGlnbDQ2NWIifQ.xzxdaO_DvGxl4eNCuIZ-Zg';
var map = new mapboxgl.Map({
  container: 'mapContainer',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-73.950348, 40.733210],
  zoom: 11
});

var zoomThreshold = 4;

function filterBy(hour) {
  //filtering our 2 layers by the year chosen by user through the slider
  var filters = ['==', 'hour', hour];
  map.setFilter('311-complaints-DayOf', filters);


}
// Upon initial map load, the choropleth layer will show daily complaint counts
map.on('load', function() {
  $('#hourly-legend').hide();

  // loading the Day Of election data
  $.getJSON('Data/trump_Elec_DayAfter.geojson', function(data) {
    data.features.map(function(feature) {
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

    map.on('mousemove', function (e){
      var features = map.queryRenderedFeatures(e.point, {
        layers: ['311-complaints-DayOf'],
      });
      const lot = features[0]
      if (lot) {
      //console.log(lot.properties.address);
      $('#neighborHood').text(lot.properties.ntaname);
      $('#dailyCount').text(lot.properties.count);
      $('#dailyDescriptor').text(lot.properties.mode);
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
      $('#hourlyCount').show();
      $('#hourlyDescriptor').show();
      $('#dailyCount').hide();
      $('#dailyDescriptor').hide();
      output.innerHTML = this.value + ':00 (Military Time)';
      var TOD = this.value
      console.log('Time: ', TOD); // Checking to see if time scale values are registering
      console.log(typeof(TOD)); // Checking type of time scale values

      // Changing the layer color for the complaints aggregated by specific time of day
      var hourlyColor = [
        'interpolate',
        ['linear'],
        ['get', 'hourly_counts'],
        0, '#f1eef6',
        2, '#d7b5d8',
        4, '#df65b0',
        6, '#dd1c77',
        8, '#980043'];
      map.setPaintProperty('311-complaints-DayOf', 'fill-color', hourlyColor);

      filterBy(TOD);
      var TOD_type = TOD + '_type';
      console.log(TOD_type);
      // e is the event (js knows where cursor is when you move your mouse)
      map.on('mousemove', function (e){
        var features = map.queryRenderedFeatures(e.point, {
          layers: ['311-complaints-DayOf'],
        });
        // get the first feature from the array of returned features
        const lot = features[0]
        if (lot) {
        //console.log(lot.properties.address);
        $('#hourlyCount').text(lot.properties.hourly_counts);
        $('#hourlyDescriptor').text(lot.properties.complaint_type);
        }
      });

      var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
      });
    };
  });
});

// Resetting the choropleth layer to daily complaint counts
$('#resetButton').on('click', function() {
  $('#daily-legend').show();
  $('#hourly-legend').hide();
  $('#dailyCount').show();
  $('#dailyDescriptor').show();
  $('#hourlyCount').hide();
  $('#hourlyDescriptor').hide();
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

// This is the sidebar function to find out more info about this project
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
