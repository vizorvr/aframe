var registerSystem = require('../core/system').registerSystem;

/**
 * Tracked controls system.
 * Maintain list with available tracked controllers.
 */
module.exports.System = registerSystem('tracked-controls', {
  init: function () {
    var self = this;

    this.controllers = [];

    this.updateControllerList();
    this._updateTime = 0;
    this._updateThreshold = 500;

    if (!navigator.getVRDisplays) { return; }

    this.sceneEl.addEventListener('enter-vr', function () {
      navigator.getVRDisplays().then(function (displays) {
        if (displays.length) { self.vrDisplay = displays[0]; }
      });
    });
  },

  tick: function (time, timeDelta) {
    if (navigator.getGamepads) {
      if (this._updateTime > this._updateThreshold) {
        this.updateControllerList();
        this._updateTime = 0;
      } else {
        this._updateTime += timeDelta;
      }
    }
  },

  /**
   * Update controller list.
   */
  updateControllerList: function () {
    var gamepads;
    var controllers;
    var gamepad;
    var i;
    var prevCount;

    gamepads = navigator.getGamepads && navigator.getGamepads();
    if (!gamepads) { return; }

    controllers = this.controllers;
    prevCount = controllers.length;
    controllers.length = 0;

    for (i = 0; i < gamepads.length; ++i) {
      gamepad = gamepads[i];
      if (gamepad && gamepad.pose) {
        controllers.push(gamepad);
      }
    }

    if (controllers.length !== prevCount) {
      this.el.emit('controllersupdated', undefined, false);
    }
  }
});
