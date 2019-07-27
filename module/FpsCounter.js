var FpsCounter = function () {
  this.frames = 0;
  this.fps = 0;
  this.lastTime = 0;
};
FpsCounter.prototype = {
  update: function (time, transform) {
    time = 1000 * time.elapsed;
    this.frames++;
    if (time > this.lastTime + 1000) {
      this.fps = Math.round(1000 * this.frames / (time - this.lastTime));
      transform(this.fps);
      this.lastTime = time;
      this.frames = 0;
    }
  }
};
export default FpsCounter;
