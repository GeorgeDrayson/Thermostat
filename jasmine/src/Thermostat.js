function Thermostat() {
  this.DEFAULT_TEMPERATURE = 20
  this.MIN_TEMP_LIMIT = 18
  this.MEDIUM_TEMP_LIMIT = 25
  this._temperature = this.DEFAULT_TEMPERATURE
  this._powerSaving = true
  this.MINIMUM_TEMPERATURE = 10
}

Thermostat.prototype.getTemperature = function() {
  return this._temperature
}

Thermostat.prototype.up = function(number) {
  if (this._temperature + number > this.maxTemp()) {
    throw new Error('Maximum temperature limit exceeded');
  }
  this._temperature += number
}

Thermostat.prototype.down = function(number) {
  if (this._temperature - number < this.MINIMUM_TEMPERATURE) {
    throw new Error('Minimum temperature limit exceeded');
  }
  this._temperature -= number
}

Thermostat.prototype.isPowerSavingOn = function() {
  return this._powerSaving === true
}

Thermostat.prototype.switch = function() {
  this._powerSaving = !this._powerSaving
}

Thermostat.prototype.maxTemp = function() {
  if (this._powerSaving) {
    return 25
  }  else {
    return 32
  }
}

Thermostat.prototype.reset = function() {
  this._temperature = this.DEFAULT_TEMPERATURE;
}

Thermostat.prototype.usage = function() {
  if (this._temperature < this.MIN_TEMP_LIMIT) {
    return 'low-usage'
  } else if (this._temperature < this.MEDIUM_TEMP_LIMIT) {
    return 'medium-usage'
  } else {
    return 'high-usage'
  }
}
