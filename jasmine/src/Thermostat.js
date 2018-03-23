function Thermostat() {
  this.DEFAULT_TEMPERATURE = 20
  this.MIN_TEMP_LIMIT = 18
  this.MEDIUM_TEMP_LIMIT = 25
  this._temperature = this.DEFAULT_TEMPERATURE
  this._powerSaving = true
  this.MINIMUM_TEMPERATURE = 10
  this.MAX_TEMP_PSM_ON = 25
  this.MAX_TEMP_PSM_OFF = 32
  this.LOWEST_TEMP = 1
}

Thermostat.prototype.getTemperature = function() {
  return this._temperature
}

Thermostat.prototype.up = function(number = 1) {
  if (this.getTemperature() + number > this.maxTemp()) {
    throw new Error('Maximum temperature limit exceeded');
  }
  this._temperature += number
}

Thermostat.prototype.down = function(number = 1) {
  if (this.getTemperature() - number < this.MINIMUM_TEMPERATURE) {
    throw new Error('Minimum temperature limit exceeded');
  }
  this._temperature -= number
}

Thermostat.prototype.isPowerSavingOn = function() {
  if (this._powerSaving === true) {
    return 'on'
  } else {
    return 'off'
  }
}

Thermostat.prototype.switch = function() {
  this._powerSaving = !this._powerSaving
  if (this._temperature > this.MAX_TEMP_PSM_ON) {
    this._temperature = this.MAX_TEMP_PSM_ON
  }
}

Thermostat.prototype.maxTemp = function() {
  if (this._powerSaving) {
    return this.MAX_TEMP_PSM_ON
  }  else {
    return this.MAX_TEMP_PSM_OFF
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
