$( document ).ready(function() {

  var thermostat = new Thermostat();
  updateTemp()

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
    $('#temperature').text(thermostat._temperature);
    $("#dot").attr('class', thermostat.usage());
  }



});
