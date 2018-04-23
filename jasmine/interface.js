$( document ).ready(function() {

  setInterval(function() {
    var date = new Date();
    $('#clock').html(
        date.getHours() + ":" + checkTime(date.getMinutes()) + ":" + checkTime(date.getSeconds())
        );
}, 500);


function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

var thermostat = new Thermostat();
updateTemp()

$('#select-city').submit( function(event) {
  event.preventDefault();
  var city = $('#location').val();
  displayWeather(city);
})


function displayWeather(city) {
  var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + city;
  var token = '&appid=a3d9eb01d4de82b9b8d0849ef604dbed';
  var metric = '&units=metric';
  $.get((url + token + metric), function(data) {
    $('#outside-temp').text(city + ": " + data.main.temp + "°C");
  });
}

$('#temp_up').click(function() {
   thermostat.up(1);
   updateTemp()
 });

 $('#temp_down').click(function() {
    thermostat.down(1);
    updateTemp()
  });

  $('#temp_reset').click(function() {
     thermostat.reset();
     updateTemp()
   });

   $('#temp_switch').click(function() {
      thermostat.switch();
      updateTemp()
      $('#PowerSavingStatus').text(thermostat.isPowerSavingOn());
    });

  function updateTemp() {
    $('#temperature').text(thermostat._temperature + "°C");
    $("#dot").attr('class', thermostat.usage());
  }



});
