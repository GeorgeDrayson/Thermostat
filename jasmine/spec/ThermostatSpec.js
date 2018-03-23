describe("Thermostat", function() {
  var thermostat;

  beforeEach(function() {
    thermostat = new Thermostat();
  });

  describe('Thermostat starting temperature', function() {

    it('Has a starting temperature of 20 degrees', function() {
      expect(thermostat.getTemperature()).toEqual(20);
    });

  });

  describe('Thermostat up function', function() {

    it('Should increase the temperature by a specified amount', function() {
      thermostat.up(1)
      expect(thermostat.getTemperature()).toEqual(21);
    });

    it('Should throw an error if you go above 32, with power saving off', function() {
      thermostat.switch()
      expect(function(){thermostat.up(13);}).toThrowError('Maximum temperature limit exceeded')
    });

    it('Should not throw an error if you go to 32, with power saving off', function() {
      thermostat.switch()
      expect(function(){thermostat.up(12);}).not.toThrowError('Maximum temperature limit exceeded')
    });

    it('Should throw an error if you go above 25, with power saving on', function() {
      expect(function(){thermostat.up(6);}).toThrowError('Maximum temperature limit exceeded')
    });

    it('Should not throw an error if you go to 25, with power saving on', function() {
      expect(function(){thermostat.up(5);}).not.toThrowError('Maximum temperature limit exceeded')
    });


  });

  describe('Thermostat down function', function() {

    it('Should decrease the temperature by a specified amount', function() {
      thermostat.down(1)
      expect(thermostat.getTemperature()).toEqual(19);
    });

    it('Should throw an error if you go below 10', function() {
      expect(function(){thermostat.down(11);}).toThrowError('Minimum temperature limit exceeded')
    });

    it('Should not throw an error if you go to 10', function() {
      expect(function(){thermostat.down(10);}).not.toThrowError('Minimum temperature limit exceeded')
    });

  });

  describe('Thermostat power saving function', function() {

    it('Should be on automatically', function() {
      expect(thermostat.isPowerSavingOn()).toEqual('on')
    });

    it('Should switch to off when the switch method is called', function() {
      thermostat.switch()
      expect(thermostat.isPowerSavingOn()).toEqual('off')
    });

    it('Should switch back to true when the switch method is called again', function() {
      thermostat.switch()
      thermostat.switch()
      expect(thermostat.isPowerSavingOn()).toEqual('on')
    });

    it('Should switch the temp down to 25 if you are above it', function() {
      thermostat.switch()
      thermostat.up(10)
      thermostat.switch()
      expect(thermostat.getTemperature()).toEqual(25)
    });

  });

  describe('Max temp function', function() {

    it('Should be at 32 when power saving is off', function() {
      thermostat.switch()
      expect(thermostat.maxTemp()).toEqual(32)
    });

    it('Should be at 25 when power saving is off', function() {
      expect(thermostat.maxTemp()).toEqual(25)
    });

  });

  describe('Reset function', function() {

    it('Should reset the temperature to 20', function() {
      thermostat.up(3)
      thermostat.reset()
      expect(thermostat.getTemperature()).toEqual(20)
    });

  });

  describe('Usage function', function() {

    it('Should say low-usage if below 18', function() {
      thermostat.down(3)
      expect(thermostat.usage()).toEqual('low-usage')
    })

    it('Should say medium-usage if below 25', function() {
      thermostat.up(4)
      expect(thermostat.usage()).toEqual('medium-usage')
    })

    it('Should say medium-usage if below 25', function() {
      thermostat.switch()
      thermostat.up(10)
      expect(thermostat.usage()).toEqual('high-usage')
    })

  })


});
