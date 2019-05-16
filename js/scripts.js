mapboxgl.accessToken = 'pk.eyJ1IjoiemVtMjMyIiwiYSI6ImNqdWQ5NXQxcDAydWw0NHBleGlnbDQ2NWIifQ.xzxdaO_DvGxl4eNCuIZ-Zg';
var map = new mapboxgl.Map({
  container: 'mapContainer',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-73.950348, 40.733210],
  zoom: 11
});


var zoomThreshold = 4;



map.on('load', function() {

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
              70, '#990000'

          ],
        }
      });

      // Created a sliding time scale for the user to select a time of day
      // https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_rangeslider
      var slider = document.getElementById("myRange");
      var output = document.getElementById("demo");
      output.innerHTML = slider.value;

      slider.oninput = function() {
      output.innerHTML = this.value;
      var TOD = this.value
      console.log('Time: ', TOD);
      if (TOD) {
        console.log(typeof(TOD));
      }
      else {
        console.log('Nope');
      };

      var day_OfEl = document.getElementById('311-complaints-DayOf');
      var color = [
          'interpolate',
          ['linear'],
          ['get', TOD],
          0, '#fff7ec',
          10, '#fee8c8',
          20, '#fdd49e',
          30, '#fdbb84',
          40, '#fc8d59',
          50, '#ef6548',
          60, '#d7301f',
          70, '#990000'
      ];

      map.setPaintProperty(day_OfEl.value, 'fill-color', '#fff7ec');


  var popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });
};
      });
    });



$(document).ready(function () {
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    $('#dismiss, .overlay').on('click', function () {
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
    });

    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
});
