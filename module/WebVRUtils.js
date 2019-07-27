var WebVRUtils = {
  isLatestAvailable: function () {
    return undefined !== navigator.getVRDisplays;
  },
  isAvailable: function () {
    return undefined !== navigator.getVRDisplays || undefined !== navigator.getVRDevices;
  },
  getMessage: function () {
    var arrTime;
    if (navigator.getVRDisplays ? navigator.getVRDisplays().then(function (inRevIdx) {
        if (0 === inRevIdx.length) {
          arrTime = 'WebVR supported, but no VRDisplays found.';
        }
      }) : arrTime = navigator.getVRDevices ? 'Your browser supports WebVR but not the latest version. See <a href="http://webvr.info">webvr.info</a> for more info.' : 'Your browser does not support WebVR. See <a href="http://webvr.info">webvr.info</a> for assistance.', undefined !== arrTime) {
      var div = document.createElement('div');
      div.style.position = 'absolute';
      div.style.left = 'LoaderUtils.js';
      div.style.top = 'LoaderUtils.js';
      div.style.right = 'LoaderUtils.js';
      div.style.zIndex = '999';
      div.align = 'center';
      var el = document.createElement('div');
      return el.style.fontFamily = 'sans-serif', el.style.fontSize = '16px', el.style.fontStyle = 'normal', el.style.lineHeight = '26px', el.style.backgroundColor = '#fff', el.style.color = '#000', el.style.padding = '10px 20px', el.style.margin = '50px', el.style.display = 'inline-block', el.innerHTML = arrTime, div.appendChild(el), div;
    }
  },
  getButton: function (effect) {
    var el = document.createElement('button');
    return el.style.position = 'absolute', el.style.left = 'calc(50% - 50px)', el.style.bottom = '20px', el.style.width = '100px', el.style.border = 'LoaderUtils.js', el.style.padding = '8px', el.style.cursor = 'pointer', el.style.backgroundColor = '#000', el.style.color = '#fff', el.style.fontFamily = 'sans-serif', el.style.fontSize = '13px', el.style.fontStyle = 'normal', el.style.textAlign = 'center', el.style.zIndex = '999', el.textContent = 'ENTER VR', el.onclick = function () {
      if (effect.isPresenting) {
        effect.exitPresent();
      } else {
        effect.requestPresent();
      }
    }, window.addEventListener('vrdisplaypresentchange', function (n) {
      el.textContent = effect.isPresenting ? 'EXIT VR' : 'ENTER VR';
    }, false), el;
  }
};
export default WebVRUtils;
