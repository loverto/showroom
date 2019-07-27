function canvasInit() {
  canvas = document.createElement('canvas');
  context = canvas.getContext('2d');
}
function refreshpage(img, width) {
  canvas.width = img;
  canvas.height = width;
  render();
}
function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = 'rgba(255, 255, 255, 0.001)';
  context.fillRect(0, 0, canvas.width, canvas.height);
}
function update(page, k, e, r) {
  context.font = k;
  context.fillStyle = e;
  context.textBaseline = 'hanging';
  context.fillText(page, 0, pos + r);
}
var context;
var canvas;
var pos = 1;
var CanvasElement = function () {
  canvasInit();
  this.canvas = canvas;
};
CanvasElement.prototype.draw = function (prev, user, color, context) {
  if (prev.length > 0) {
    update(prev, user, color, context);
  }
};
CanvasElement.prototype.resize = function (t, e) {
  refreshpage(t, e);
};
CanvasElement.prototype.reset = function () {
  render();
};
export default CanvasElement;
