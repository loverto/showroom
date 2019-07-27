import Event from 'module/Event';
var InputManager = function () {
  this.shouldPoll = true;
  this.buttonPressed = null;
  $(document).on('keypress', function (event) {
    if (32 == event.keyCode) {
      this.trigger('press');
    }
  }.bind(this));
};
InputManager.prototype = {
  poll: function () {
    if (this.shouldPoll) {
      this.gamepads = navigator.getGamepads();
    }
  },
  update: function () {
    this.poll();
    _.each(this.gamepads, function (sectionInfo) {
      if (sectionInfo) {
        var k = 0;
        for (; k < sectionInfo.buttons.length; k++) {
          var input = sectionInfo.buttons[k];
          if (input.pressed) {
            this.buttonPressed = k;
          } else {
            if (null != this.buttonPressed && this.buttonPressed === k) {
              this.trigger('press');
              this.buttonPressed = null;
            }
          }
        }
      }
    }, this);
  }
};
InputManager.mixin(Event);
export default InputManager;
